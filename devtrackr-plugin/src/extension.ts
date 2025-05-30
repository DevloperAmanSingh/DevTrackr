import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { getTrackedExtensions } from "./config";
import { syncLogsToServer, validateSessionKey } from "./api";

// ========== Activity Watcher ==========
let lastActivity = Date.now();
const IDLE_THRESHOLD = 60 * 1000; // 60 sec
const SAVE_INTERVAL = 5; // 10 seconds
let saveTimer: NodeJS.Timeout | null = null;
let syncInterval: NodeJS.Timeout;

function resetActivityTimer() {
  lastActivity = Date.now();
}

function isIdle(): boolean {
  return Date.now() - lastActivity > IDLE_THRESHOLD;
}

// ========== Time Tracking ==========
interface TrackedFolder {
  totalTime: number;
  files: Record<string, number>;
  languages: Set<string>;
}

interface FolderStats {
  [folderName: string]: TrackedFolder;
}

interface DailyStats {
  [date: string]: FolderStats;
}

let currentLang: string | null = null;
let currentFile: string | null = null;
let currentFolder: string | null = null;
let startTime: number = 0;
let sessionKey: string | null = null;
let storagePath: string;

function startPeriodicSave() {
  if (saveTimer) {
    clearInterval(saveTimer);
  }

  saveTimer = setInterval(() => {
    if (!isIdle() && currentLang && startTime > 0) {
      const now = Date.now();
      const duration = Math.floor((now - startTime) / 1000);
      if (duration > 0) {
        saveTimeLog(currentLang, currentFile, currentFolder, duration);
        startTime = now; // Reset start time after saving
      }
    }
  }, SAVE_INTERVAL);
}

export function activate(context: vscode.ExtensionContext) {
  storagePath = context.globalStorageUri.fsPath;
  fs.mkdirSync(storagePath, { recursive: true });
  console.log(`[DevTrackr] Storage path: ${storagePath}`);

  sessionKey = context.workspaceState.get<string>("sessionKey") || null;

  // Start periodic save timer
  startPeriodicSave();

  // Command: Connect Session
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.connectSession", async () => {
      const key = await vscode.window.showInputBox({
        prompt: "Enter your session key",
        ignoreFocusOut: true,
      });
      if (key) {
        const result = await validateSessionKey(key);
        console.log(result);
        if (!(await result).valid) {
          vscode.window.showErrorMessage(
            `❌ Invalid session key: ${(await result).error || "Unknown error"}`
          );
          return;
        }
        // Save session key
        if (sessionKey) {
          vscode.window.showInformationMessage(
            `🔄 Session key updated: ${key} `
          );
        }
        sessionKey = key;
        // Store session key in workspace state
        context.workspaceState.update("sessionKey", key);
        // Update global state
        context.globalState.update("sessionKey", key);

        vscode.window.showInformationMessage(
          `✅ Connected with session key: ${key}`
        );
      }
      syncInterval = setInterval(() => {
        if (sessionKey) {
          syncLogsToServer(sessionKey, storagePath);
          console.log(
            `[DevTrackr] Syncing logs to server every ${SAVE_INTERVAL} seconds`
          );
        }
      }, 10000);
    })
  );

  // Typing activity → reset timer + detect changes
  vscode.workspace.onDidChangeTextDocument((event) => {
    resetActivityTimer();
    const doc = event.document;
    const lang = doc.languageId;
    const filePath = doc.uri.fsPath;
    const folderPath = path.dirname(filePath);

    if (
      lang !== currentLang ||
      filePath !== currentFile ||
      folderPath !== currentFolder
    ) {
      trackActivityChange(lang, filePath, folderPath);
    }
  });

  // File switch
  vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (editor) {
      const doc = editor.document;
      trackActivityChange(
        doc.languageId,
        doc.uri.fsPath,
        path.dirname(doc.uri.fsPath)
      );
    }
  });
  vscode.window.onDidChangeWindowState((state) => {
    if (!state.focused) {
      console.log("[DevTrackr] Paused");
      // Save current time before pausing
      if (currentLang && startTime > 0) {
        const duration = Math.floor((Date.now() - startTime) / 1000);
        if (duration > 0) {
          saveTimeLog(currentLang, currentFile, currentFolder, duration);
        }
      }
      // Reset tracking state
      startTime = 0;
    } else {
      // Resume tracking when window regains focus
      if (currentLang) {
        startTime = Date.now();
      }
    }
  });
}

function trackActivityChange(
  newLang: string,
  newFile: string,
  newFolder: string
) {
  const now = Date.now();
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const ext = path.extname(editor.document.fileName);
    const allowed = getTrackedExtensions();
    if (!allowed.includes(ext)) {
      console.log(`[DevTrackr] Ignored: ${ext} not in tracked list`);
      return;
    }
  }

  // Idle check
  if (isIdle()) {
    console.log("[DevTrackr] Skipped tracking due to inactivity");
    currentLang = newLang;
    currentFile = newFile;
    currentFolder = newFolder;
    startTime = now;
    return;
  }

  // Update current tracking info
  currentLang = newLang;
  currentFile = newFile;
  currentFolder = newFolder;
  startTime = now;
}

function saveTimeLog(
  language: string,
  file: string | null,
  folder: string | null,
  duration: number
) {
  const date = new Date().toISOString().split("T")[0];
  const logPath = path.join(storagePath, "time_data.json");

  let data: DailyStats = {};
  if (fs.existsSync(logPath)) {
    const rawData = JSON.parse(fs.readFileSync(logPath, "utf-8"));
    // Convert string arrays back to Sets for languages
    Object.keys(rawData).forEach((date) => {
      Object.keys(rawData[date]).forEach((folderName) => {
        rawData[date][folderName].languages = new Set(
          rawData[date][folderName].languages
        );
      });
    });
    data = rawData;
  }

  if (!data[date]) {
    data[date] = {};
  }

  if (folder) {
    const folderName = path.basename(folder);

    if (!data[date][folderName]) {
      data[date][folderName] = {
        totalTime: 0,
        files: {},
        languages: new Set(),
      };
    }

    // Update folder stats
    data[date][folderName].totalTime += duration;

    if (file) {
      const filename = path.basename(file);
      data[date][folderName].files[filename] =
        (data[date][folderName].files[filename] || 0) + duration;
    }

    data[date][folderName].languages.add(language);
  }

  // Convert Sets to arrays before saving to JSON
  const dataToSave = JSON.parse(
    JSON.stringify(data, (key, value) => {
      if (value instanceof Set) {
        return Array.from(value);
      }
      return value;
    })
  );

  fs.writeFileSync(logPath, JSON.stringify(dataToSave, null, 2));
  console.log(
    `[DevTrackr] ⏱️ ${duration}s in ${language}${
      file ? ` (${path.basename(file)})` : ""
    } on ${date}`
  );

  if (sessionKey) {
    syncToBackend(sessionKey, {
      language,
      file: file || "",
      folder: folder || "",
      duration,
      date,
    });
  }
}

function syncToBackend(
  sessionKey: string,
  data: {
    language: string;
    file: string;
    folder: string;
    duration: number;
    date: string;
  }
) {
  console.log(
    `[DevTrackr] 📡 Sending to backend → key: ${sessionKey}, data:`,
    JSON.stringify(data, null, 2)
  );
}

export function deactivate() {
  if (saveTimer) {
    clearInterval(saveTimer);
  }
  // Save any remaining time before deactivating
  if (currentLang && startTime > 0) {
    const duration = Math.floor((Date.now() - startTime) / 1000);
    if (duration > 0) {
      saveTimeLog(currentLang, currentFile, currentFolder, duration);
    }
  }
}
