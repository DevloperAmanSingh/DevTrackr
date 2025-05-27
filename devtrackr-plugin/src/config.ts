import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export function getTrackedExtensions(): string[] {
  try {
    const configPath = path.join(
      vscode.workspace.workspaceFolders?.[0].uri.fsPath || "",
      "tracked-extensions.json"
    );

    if (fs.existsSync(configPath)) {
      const raw = fs.readFileSync(configPath, "utf-8");
      const config = JSON.parse(raw);
      return config.trackExtensions || [".ts", ".js", ".py", ".go"];
    }
  } catch (e) {
    console.warn(
      "[DevTrackr] Failed to load tracked-extensions.json, using defaults",
      e
    );
  }

  // Default extensions if config file is not found or invalid
  return [".ts", ".js", ".py", ".go"];
}
