import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "./auth.service";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setAuth } from "./auth.redux.slice";


export const useAttemptLogIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  //dispatch get refreshed access token
  const attemptLogIn = useCallback(async () => {
    try {
      const response = await authService.getRefreshedAccessToken();
      dispatch(setAuth({ user: response.data.user, accessToken: response.data.accessToken, isAuthenticated: true }));
      toast.success("You are now logged in!");
      // router.push("/");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
      toast.error("Failed to log in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, router]);

  return {
    attemptLogIn,
    isLoading,
    error,
  };
};

