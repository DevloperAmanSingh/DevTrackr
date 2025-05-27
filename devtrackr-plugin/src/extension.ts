import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { getTrackedExtensions } from "./config";

// ========== Activity Watcher ==========
let lastActivity = Date.now();
const IDLE_THRESHOLD = 60 * 1000; // 60 sec
const SAVE_INTERVAL = 30 * 1000; // 30 seconds
let saveTimer: NodeJS.Timeout | null = null;

function resetActivityTimer() {
  lastActivity = Date.now();
}

function isIdle(): boolean {
  return Date.now() - lastActivity > IDLE_THRESHOLD;
}

// ========== Time Tracking ==========
interface TimeData {
  files: Record<string, number>;
  folders: Record<string, number>;
  languages: Record<string, number>;
}

interface DailyStats {
  [date: string]: TimeData;
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

  sessionKey = context.globalState.get<string>("sessionKey") || null;

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
        sessionKey = key;
        await context.globalState.update("sessionKey", key);
        vscode.window.showInformationMessage(
          `✅ Connected with session key: ${key}`
        );
      }
    })
  );

  // Command: Show Stats
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.showStats", () => {
      const logPath = path.join(storagePath, "time_data.json");

      if (!fs.existsSync(logPath)) {
        vscode.window.showInformationMessage("No time tracked yet.");
        return;
      }

      const data: DailyStats = JSON.parse(fs.readFileSync(logPath, "utf-8"));
      const today = new Date().toISOString().split("T")[0];
      const stats = data[today] || { files: {}, folders: {}, languages: {} };

      const msg = [
        "⏱️ Time Tracked Today:",
        "\nLanguages:",
        ...Object.entries(stats.languages).map(
          ([lang, time]) => `${lang}: ${Math.round(time / 60)} min`
        ),
        "\nTop Folders:",
        ...Object.entries(stats.folders)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([folder, time]) => `${folder}: ${Math.round(time / 60)} min`),
        "\nTop Files:",
        ...Object.entries(stats.files)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(
            ([file, time]) =>
              `${path.basename(file)}: ${Math.round(time / 60)} min`
          ),
      ].join("\n");

      vscode.window.showInformationMessage(msg);
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
    data = JSON.parse(fs.readFileSync(logPath, "utf-8"));
  }

  if (!data[date]) {
    data[date] = { files: {}, folders: {}, languages: {} };
  }

  // Update language stats
  data[date].languages[language] =
    (data[date].languages[language] || 0) + duration;

  // Update file stats if file path exists
  if (file) {
    data[date].files[file] = (data[date].files[file] || 0) + duration;
  }

  // Update folder stats if folder path exists
  if (folder) {
    data[date].folders[folder] = (data[date].folders[folder] || 0) + duration;
  }

  fs.writeFileSync(logPath, JSON.stringify(data, null, 2));
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
