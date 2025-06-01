import type { RegisterFormFields } from "@/lib/schemas";
import api from "../api";
import type { FetchDetailsResponse, RegisterResponse } from "@/lib/types";

export const accountApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterFormFields>({
      query: (payload) => ({
        url: "user/account",
        method: "POST",
        body: payload,
      }),
    }),
    update: builder.mutation<{}, void>({
      query: (payload) => ({
        url: "user/account",
        method: "POST",
        body: payload,
      }),
    }),
    fetchDetails: builder.query<FetchDetailsResponse, void>({
      query: () => ({
        url: `user/account`,
        method: "GET",
      }),
    }),
  }),
});

export const { useRegisterMutation, useUpdateMutation, useFetchDetailsQuery } =
  accountApi;
