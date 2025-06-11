import type {
  AllSkillswapSessionResponse,
  CreateSkillswapSessionPayload,
  SkillswapSessionResponse,
  SkillswapSessionReview,
} from "@/lib/types";
import api from "../api";

const skillswapSessionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createSkillswapSession: builder.mutation<
      any,
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
    fetchSkillswapSession: builder.query<SkillswapSessionResponse, string>({
      query: (sessionId) => ({
        url: `user/ss-session/${sessionId}`,
        method: "GET",
      }),
      transformResponse: (response: { session: SkillswapSessionResponse }) =>
        response.session,
    }),
    rejectSkillswapSession: builder.mutation<any, string>({
      query: (sessionId) => ({
        url: `user/ss-session/${sessionId}/reject`,
        method: "PUT",
      }),
    }),
    updateSkillswapSession: builder.mutation<any, string>({
      query: (sessionId) => ({
        url: `user/ss-session/${sessionId}`,
        method: "PUT",
      }),
    }),
    reviewSkillswapSession: builder.mutation<
      any,
      { sessionId: string; review: SkillswapSessionReview }
    >({
      query: ({ sessionId, review }) => ({
        url: `user/ss-session/${sessionId}/review`,
        method: "POST",
        body: review,
      }),
    }),
  }),
});

export const {
  useCreateSkillswapSessionMutation,
  useFetchAllSkillswapSessionsQuery,
  useFetchSkillswapSessionQuery,
  useRejectSkillswapSessionMutation,
  useUpdateSkillswapSessionMutation,
  useReviewSkillswapSessionMutation,
} = skillswapSessionApi;
