import type { CreateSkillswapSessionPayload } from "@/lib/types";
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
  }),
});

export const { useCreateSkillswapSessionMutation } = skillswapSessionApi;
