import type {
  CreateSkillswapRequestPayloadType,
  MarketplacePayloadType,
  ServerResponse,
  SkillswapRequestCardDataType,
  SkillswapRequestResponse,
} from "@/lib/types";
import api from "../api";

const skillswapRequestApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createSkillswapRequest: builder.mutation<
      ServerResponse,
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
    fetchSkillswapRequestDetails: builder.query<
      SkillswapRequestResponse,
      string
    >({
      query: (requestId) => ({
        url: `user/request/${requestId}`,
        method: "GET",
      }),
      // transformResponse: (response: SkillswapRequestResponse) =>
      //   {request: response.request },

      // transformResponse: (response: SkillswapRequestResponse) => {
      // response.request.createdAt = new Date(response.request.createdAt);
      // response.request.availability = response.request.availability.map(
      //   (a) => ({ ...a, date: new Date(a.date) }),
      // );

      // return {
      //   ...response.request,
      //   availability: response.request.availability.map((avail) => ({
      //     ...avail,
      //     date: new Date(avail.date),
      //   })),
      //   createdAt: new Date(response.request.createdAt),
      // };
      // },
    }),
  }),
});

export const {
  useCreateSkillswapRequestMutation,
  useSkillswapRequestMarketplaceQuery,
  useFetchSkillswapRequestDetailsQuery,
} = skillswapRequestApi;
