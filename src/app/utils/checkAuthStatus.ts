import { apiFetch } from "./apiFetch";

export interface AuthStatus {
  isLoggedIn: boolean;
  committeeName: string | null;
}

export const checkAuthStatus = async (): Promise<AuthStatus> => {
  try {
    const response = await apiFetch("/auth/status");
    if (!response.ok) return { isLoggedIn: false, committeeName: null };

    const data = await response.json();
    return { isLoggedIn: true, committeeName: data.committeeName ?? null };
  } catch (error) {
    console.error("Authentication check failed:", error);
    return { isLoggedIn: false, committeeName: null };
  }
};
