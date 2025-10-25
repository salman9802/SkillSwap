import { STATUS_CODES } from "@src/constants/http";
import { useStore } from "@src/store/appStore";
import type { AxiosError, AxiosInstance } from "axios";
import { privateApi } from "./client";

export function attahTokenInterceptors(api: AxiosInstance) {
  // Request Interceptor: add token in header (if present)
  api.interceptors.request.use(
    (config) => {
      const accessToken = useStore.getState().accessToken;
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

      return config;
    },
    (error) => Promise.reject(error),
  );

  // Response Interceptor: Retry request once or logout
  api.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const originalRequestConfig = error.config as any;

      const { unsetCredentials, refreshTokens } = useStore.getState();

      if (
        error.response?.status === STATUS_CODES.UNAUTHORIZED &&
        !originalRequestConfig?._alreadyRefreshed
      ) {
        originalRequestConfig._alreadyRefreshed = true;

        const newAccessToken = await refreshTokens();
        originalRequestConfig.headers["Authorization"] =
          `Bearer ${newAccessToken}`;

        return privateApi(originalRequestConfig);
      }
      await unsetCredentials();
      return Promise.reject(error);
    },
  );
}
