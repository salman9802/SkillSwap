import type {
  SessionLoginReturnType,
  SessionRefreshReturnType,
} from "@/lib/types";

import api from "../api";
import type { LoginFormFields } from "@/lib/schemas";

export const sessionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<SessionLoginReturnType, LoginFormFields>({
      query: (payload) => ({
        url: "user/session",
        method: "POST",
        body: payload,
      }),
    }),
    refresh: builder.query<SessionRefreshReturnType, void>({
      query: () => ({
        url: "user/session/access",
        method: "GET",
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "user/session",
        method: "DELETE",
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshQuery, useLogoutMutation } =
  sessionApi;
