import type {
  CreateSkillswapRequestPayloadType,
  MarketplacePayloadType,
  SkillswapRequestCardDataType,
} from "@/lib/types";
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
    skillswapRequestMarketplace: builder.query<
      { requests: SkillswapRequestCardDataType[]; totalCount: number },
      MarketplacePayloadType
    >({
      query: (params) => ({
        url: "user/marketplace",
        method: "GET",
        params:
          params !== undefined
            ? {
                ...params,
                offeredSkills: params.offeredSkills?.join(","),
                offeredSkillQuery:
                  params.offeredSkillQuery !== undefined &&
                  params.offeredSkillQuery.length > 0
                    ? params.offeredSkillQuery
                    : undefined,
                requestedSkill: params.requestedSkill
                  ? params.requestedSkill
                  : undefined,
              }
            : undefined,
      }),
    }),
  }),
});

export const {
  useCreateSkillswapRequestMutation,
  useSkillswapRequestMarketplaceQuery,
} = skillswapRequestApi;
