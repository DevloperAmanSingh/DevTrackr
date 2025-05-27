// tracker.ts
import * as vscode from 'vscode';
import { getTrackedExtensions } from './config';

const timers: Record<string, number> = {};
const activeStart: Record<string, number> = {};

export function onFileOpen(doc: vscode.TextDocument) {
  const ext = doc.fileName.split('.').pop();
  // eslint-disable-next-line curly
  if (!getTrackedExtensions().includes(`.${ext}`)) return;

  const filePath = doc.uri.fsPath;
  activeStart[filePath] = Date.now();
}

export function onFileClose(doc: vscode.TextDocument) {
  const filePath = doc.uri.fsPath;
  const start = activeStart[filePath];
  if (!start) {return;}

  const timeSpent = Date.now() - start;
  timers[filePath] = (timers[filePath] || 0) + timeSpent;

  delete activeStart[filePath];
}

export function getStats() {
  return timers;
}
