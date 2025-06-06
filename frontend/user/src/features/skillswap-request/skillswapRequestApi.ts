import type {
  CreateSkillswapRequestPayloadType,
  MarketplaceFilter,
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
      MarketplaceFilter | void
    >({
      query: (filter) => ({
        url: "user/marketplace",
        method: "GET",
        body: filter,
      }),
    }),
  }),
});

export const {
  useCreateSkillswapRequestMutation,
  useSkillswapRequestMarketplaceQuery,
} = skillswapRequestApi;
