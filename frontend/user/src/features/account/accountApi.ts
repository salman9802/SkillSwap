import type { RegisterFormFields } from "@/lib/schemas";
import api from "../api";
import type {
  FetchDetailsResponse,
  RegisterResponse,
  UserUpdatePayload,
} from "@/lib/types";

export const accountApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterFormFields>({
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
    update: builder.mutation<{}, UserUpdatePayload>({
      query: (payload) => ({
        url: "user/account",
        method: "PUT",
        body: payload,
      }),
      // async onQueryStarted(queryArgument, mutationLifeCycleApi) {
      //   try {
      //     const {data} = await mutationLifeCycleApi.queryFulfilled;

      //     mutationLifeCycleApi.dispatch(
      //       api.util.updateQueryData("fetchDetails", void, (draft) => {
      //         Object.assign(draft, data); // update cached user data
      //       })
      //     )
      //   } catch (error) {

      //   }
      // },
    }),
  }),
});

export const { useRegisterMutation, useUpdateMutation, useFetchDetailsQuery } =
  accountApi;
