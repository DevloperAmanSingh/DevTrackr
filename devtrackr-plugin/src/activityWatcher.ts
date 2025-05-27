let lastActivity = Date.now();
const IDLE_THRESHOLD = 60 * 1000; // 60 sec

export function resetActivityTimer() {
  lastActivity = Date.now();
}

export function isIdle(): boolean {
  return Date.now() - lastActivity > IDLE_THRESHOLD;
}
