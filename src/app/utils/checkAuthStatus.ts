import { apiFetch } from "./apiFetch";

export const checkAuthStatus = async (): Promise<boolean> => {
  try {
    const response = await apiFetch("/auth/status");
    return response.ok;
  } catch (error) {
    console.error("Authentication check failed:", error);
    return false;
  }
};
