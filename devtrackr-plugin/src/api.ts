import path from "path";
import fs from "fs";

const API_URL = "http://localhost:3000/api";

export const validateSessionKey = async (
  sessionKey: string
): Promise<{ valid: boolean; error?: string }> => {
  if (!sessionKey) {
    return { valid: false, error: "Session key is required" };
  }
  try {
    const response = await fetch(
      `${API_URL}/session-key/validate-session-key`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionKey: sessionKey }),
      }
    );

    const result = (await response.json()) as { error?: string };

    if (!response.ok) {
      return { valid: false, error: result.error || "Invalid session key" };
    }

    return { valid: true };
  } catch (err: any) {
    return { valid: false, error: err.message };
  }
};

export const syncLogsToServer = async (
  sessionKey: string,
  storagePath: string
) => {
  const jsonFilePath = path.join(storagePath, "time_data.json");
  if (!fs.existsSync(jsonFilePath)) {
    console.error("Log file does not exist:", jsonFilePath);
    return;
  }

  try {
    const fileData = fs.readFileSync(jsonFilePath, "utf-8");
    const json = JSON.parse(fileData);

    const response = await fetch(`${API_URL}/log/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionKey: sessionKey, logs: json }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Failed to sync logs:", error);
    } else {
      console.log("✅ Synced logs successfully");
    }
  } catch (err: any) {
    console.error("Error during log sync:", err.message);
  }
};
