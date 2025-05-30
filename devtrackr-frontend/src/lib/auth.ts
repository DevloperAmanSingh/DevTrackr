import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface AuthResponse {
  user: {
    id: string;
    email: string;
    createdAt: string;
  };
  token: string;
}

interface AuthCredentials {
  email: string;
  password: string;
}

export const signUp = async (
  credentials: AuthCredentials
): Promise<AuthResponse> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/signup`,
      credentials
    );
    const { user, token } = response.data;

    // Store auth data in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (
  credentials: AuthCredentials
): Promise<AuthResponse> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/login`,
      credentials
    );
    const { user, token } = response.data;

    // Store auth data in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};
