import axios from "axios";
import { store } from "@/redux/store";
import { authService } from "./modules/auth/auth.service";
import { resetAuth } from "./modules/auth/auth.redux.slice";
import { API } from "@/lib/constants";

/** 401 on these routes means invalid credentials / auth outcome, not an expired access token. */
function isCredentialAuthRequest(url: string | undefined): boolean {
  if (!url) return false;
  return (
    url === API.AUTH.LOGIN ||
    url === API.AUTH.SIGNUP ||
    url.includes("/auth/log-in") ||
    url.includes("/auth/sign-up")
  );
}

const customAxios = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

customAxios.interceptors.request.use(async (config) => {
  // Get the current state from Redux store
  const state = store.getState();
  const token = state.auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//response interceptor for handling 401 errors
customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (
      status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isCredentialAuthRequest(originalRequest.url)
    ) {
      originalRequest._retry = true;

      try {
        // Get the refreshed access token
        const response =
          await authService.getRefreshedAccessToken();
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
      } catch (refreshError) {
        console.error("Get refreshed access token error:", refreshError);
        store.dispatch(resetAuth());
        if (typeof window !== "undefined") {
          window.location.assign("/log-in");
        }
        return Promise.reject(refreshError);
      }

      return customAxios(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default customAxios;
