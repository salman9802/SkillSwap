import type {
  AllSkillswapSessionResponse,
  CreateSkillswapSessionPayload,
  ServerResponse,
  SkillswapSessionChatResponse,
  SkillswapSessionResponse,
  SkillswapSessionReview,
} from "@/lib/types";
import api from "../api";

const skillswapSessionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createSkillswapSession: builder.mutation<
      ServerResponse & { session: { id: string } },
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
    rejectSkillswapSession: builder.mutation<ServerResponse, string>({
      query: (sessionId) => ({
        url: `user/ss-session/${sessionId}/reject`,
        method: "PUT",
      }),
    }),
    updateSkillswapSession: builder.mutation<ServerResponse, string>({
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
    fetchSkillswapSessionChat: builder.query<
      SkillswapSessionChatResponse["messages"],
      string
    >({
      query: (sessionId) => ({
        url: `user/ss-session/${sessionId}/chat`,
        method: "GET",
      }),
      transformResponse: (response: SkillswapSessionChatResponse) =>
        response.messages,
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
  useFetchSkillswapSessionChatQuery,
} = skillswapSessionApi;
