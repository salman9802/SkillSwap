import type {
  AllSkillswapSessionResponse,
  CreateSkillswapSessionPayload,
} from "@/lib/types";
import api from "../api";

const skillswapSessionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createSkillswapSession: builder.mutation<
      void,
      CreateSkillswapSessionPayload
    >({
      query: (payload) => ({
        url: "user/ss-session",
        method: "POST",
        body: payload,
      }),
    }),
    fetchAllSkillswapSessions: builder.query<
      AllSkillswapSessionResponse,
      { offset: number; limit: number }
    >({
      query: (params) => ({
        url: "user/ss-session",
        method: "GET",
        params,
      }),
    }),
    // fetchSkillswapSession: builder.query<void, string>({
    //   query: (sessionId) => ({
    //     url: "",
    //     method: "GET",
    //   }),
    // }),
  }),
});

export const {
  useCreateSkillswapSessionMutation,
  useFetchAllSkillswapSessionsQuery,
} = skillswapSessionApi;
