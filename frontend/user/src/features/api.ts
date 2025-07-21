import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { StoreState } from "./store";
import {
  APP_ERR_CODES,
  STATUS_CODES,
  type AppErrorCodeType,
} from "@/lib/constants";
import { clearCredentials, updateToken } from "./session/sessionSlice";
import type { SessionRefreshReturnType, SessionSlice, User } from "@/lib/types";
import { sessionApi } from "./session/sessionApi";

export const SERVER_URL = import.meta.env.PROD
  ? import.meta.env.VITE_STANDALONE
    ? "https://skillswap-server-2qwp.onrender.com"
    : ""
  : "http://localhost:80";

/** Inject `accessToken` in header (`Authorization`) */
const baseQuery = fetchBaseQuery({
  baseUrl: `${SERVER_URL}/api`,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as StoreState).session.accessToken;
    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
    return headers;
  },
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Don't attempt refresh if already trying it
  // const isRefreshing = (args.url || args).includes("/auth/refresh");
  // Type-safe check to see if this is a refresh call
  const isRefreshing =
    typeof args === "object" &&
    "url" in args &&
    args.url.includes("user/session/access");

  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    result.error.status === STATUS_CODES.UNAUTHORIZED &&
    !isRefreshing
  ) {
    // const errorCode = result.error.data as AppErrorCodeType;
    // if (errorCode === APP_ERR_CODES.ACCESS_TOKEN_EXPIRED) {

    // fetch new access token
    const refreshResult = await baseQuery(
      "user/session/access",
      api,
      extraOptions,
    );
    if (refreshResult.data) {
      // successful refresh

      const data = refreshResult.data as SessionRefreshReturnType;
      api.dispatch(updateToken(data));

      // retry original query
      result = await baseQuery(args, api, extraOptions);

      // daily login reward
    } else {
      // clear sessionSlice data & make logout request (to remove cookie)
      api.dispatch(clearCredentials());
      api.dispatch(sessionApi.endpoints.logout.initiate());
    }
    // }
  }
  return result;
};

const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});

export default api;
