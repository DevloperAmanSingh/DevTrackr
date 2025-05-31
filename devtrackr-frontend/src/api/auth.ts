import axios from "axios";
import { getAuthToken } from "@/lib/auth";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface UserProfile {
  id: string;
  email: string;
  sessionKey: string | null;
  createdAt: string;
}

interface SessionKeyResponse {
  sessionKey: string;
}

const getAuthHeaders = () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await axios.get<UserProfile>(
    `${BASE_URL}/api/user/profile`,
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data;
};

export const generateSessionKey = async (): Promise<SessionKeyResponse> => {
  const response = await axios.post<SessionKeyResponse>(
    `${BASE_URL}/api/session-key/generate-session-key`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data;
};
