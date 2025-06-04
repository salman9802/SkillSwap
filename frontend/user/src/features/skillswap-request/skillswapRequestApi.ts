import type { CreateSkillswapRequestPayloadType } from "@/lib/types";
import api from "../api";

const skillswapRequestApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createSkillswapRequest: builder.mutation<
      void,
      CreateSkillswapRequestPayloadType
    >({
      query: (payload) => ({
        url: "user/new-request",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCreateSkillswapRequestMutation } = skillswapRequestApi;
