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
import type { User } from "@/lib/types";
import { sessionApi } from "./session/sessionApi";

const SERVER_URL = "http://localhost:80";

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
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === STATUS_CODES.UNAUTHORIZED) {
    const errorCode = result.error.data as AppErrorCodeType;
    // if (errorCode === APP_ERR_CODES.ACCESS_TOKEN_EXPIRED) {
    // fetch new access token

    const refreshResult = await baseQuery(
      "user/session/access",
      api,
      extraOptions,
    );
    if (refreshResult.data) {
      // successful refresh

      const data = refreshResult.data as { accessToken: string; user: User };
      api.dispatch(updateToken(data));

      // retry original query
      result = await baseQuery(args, api, extraOptions);
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
