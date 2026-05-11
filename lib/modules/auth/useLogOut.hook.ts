import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/redux";
import { authService } from "./auth.service";
import { resetAuth } from "./auth.redux.slice";
import { toast } from "sonner";

export interface UseLogoutReturn {
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useLogout = (): UseLogoutReturn => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Call the logout API to invalidate server-side session
      await authService.logout();
      dispatch(resetAuth());
      toast.success("Logged out successfully");
    } catch (error) {
      // Even if the API call fails, we should still clear local state
      const errorMessage = error instanceof Error ? error.message : "Logout failed";
      console.error("Logout API error:", error);
      setError(errorMessage);
    } finally {
      // Always clear the local auth state regardless of API call success
      setIsLoading(false);
      
      // Redirect to login page
      router.push("/log-in");
    }
  }, [dispatch, router]);

  return {
    logout,
    isLoading,
    error,
    clearError,
  };
};
