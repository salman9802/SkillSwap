import type { RegisterFormFields } from "@/lib/schemas";
import api from "../api";
import type {
  FetchDetailsResponse,
  RegisterResponse,
  UserDashboardResponse,
  UserDashboardQueryParams,
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
    uploadPicture: builder.mutation<void, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("picture", file);

        return {
          url: "user/upload-picture",
          method: "PUT",
          body: formData,
        };
      },
    }),
    dashboard: builder.query<UserDashboardResponse, UserDashboardQueryParams>({
      query: (params) => ({
        url: "user/dashboard",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useUpdateMutation,
  useFetchDetailsQuery,
  useUploadPictureMutation,
  useDashboardQuery,
} = accountApi;
