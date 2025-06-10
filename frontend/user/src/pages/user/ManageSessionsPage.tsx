import React from "react";
import { Link } from "react-router-dom";

import { Input } from "@/components/ui/input";
import {
  SESSION_STATUS,
  SkillOffered,
  SkillRequested,
  type SessionStatusKey,
} from "@/lib/constants";
import { Button } from "@/components/ui/button";
import type { RequestCardDataType, SkillswapSessionPreview } from "@/lib/types";
import requestsJSON from "../../../__data/requests.json";
import { getRelativeTime } from "@/lib/time";
import { useFetchAllSkillswapSessionsQuery } from "@/features/skillswap-session/skillswapSessionApi";
import SkeletonLoader from "@/components/utils/SkeletonLoader";

// NOTE - Mock data
// const requests = requestsJSON as RequestCardDataType[];
// const requests = [] as RequestCardDataType[];
// const sessions = requests.slice(0, 5).map((r) => ({
//   skillGiven: r.skillsRequested[0],
//   skillReceived: r.skillsOffered[0],
//   when: r.createdAt,
// }));

const ManageSessionsPage = () => {
  const [offset, setOffset] = React.useState(0);

  const { data, isLoading, isError } = useFetchAllSkillswapSessionsQuery({
    offset,
    limit: 10,
  });

  const sessions: SkillswapSessionPreview[] | undefined = React.useMemo(() => {
    if (data !== undefined) {
      return data.sessions.map((session) => ({
        ...session,
        createdAt: new Date(session.createdAt),
        schedule: new Date(session.schedule),
      }));
    }
    return undefined;
  }, [data]);

  return (
    <div className="container mx-auto flex flex-col gap-12 lg:w-2/3">
      <h1 className="text-xl md:text-2xl lg:text-3xl">Manage sessions</h1>
      {/* Filters */}
      <Input placeholder="Filter session by username..." />
      {/* Table */}
      <div className="flex flex-col divide-y border p-3 [&>*]:py-3">
        {/* Header */}
        <div className="hidden items-center gap-4 md:flex [&>*]:font-medium">
          <div className="flex flex-2 flex-col gap-4 md:flex-row [&>*]:flex-1">
            <div>Status</div>
            <div>Skill Exchanged</div>
          </div>
          {/* <div>Skill Received</div> */}
          <div className="flex-1">Scheduled for</div>
        </div>
        {/* Row(s) */}
        {isLoading ? (
          Array.from({ length: 10 }, (_, i) => (
            <SkeletonLoader key={i} className="mt-3 h-12 w-full" />
          ))
        ) : isError ? (
          <span className="text-2xl text-red-500">Something went wrong</span>
        ) : sessions !== undefined && sessions.length > 0 ? (
          sessions?.map((s, i) => (
            <Link
              to={`/user/account/sessions/${s.id}`}
              key={i}
              className="hover:bg-accent flex cursor-pointer items-center gap-4 text-sm md:[&>*]:text-base"
            >
              <div className="flex flex-2 flex-col gap-4 md:flex-row [&>*]:flex-1">
                <div className="flex flex-col gap-3">
                  <div className="mr-2 text-lg font-medium md:hidden">
                    Status
                  </div>
                  {SESSION_STATUS[s.status as SessionStatusKey].jsx}
                </div>
                <div className="flex flex-col gap-3">
                  <div className="mr-2 text-lg font-medium md:hidden">
                    Skill Exchanged
                  </div>
                  <div className="flex flex-wrap gap-2 [&>*]:w-fit">
                    {s.isRequester ? (
                      <>
                        <SkillOffered>{s.offeredSkill}</SkillOffered>
                        <SkillRequested>
                          {s.skillswapRequest.requestedSkill}
                        </SkillRequested>
                      </>
                    ) : (
                      <>
                        <SkillOffered>
                          {s.skillswapRequest.requestedSkill}
                        </SkillOffered>
                        <SkillRequested>{s.offeredSkill}</SkillRequested>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-1 self-start text-nowrap">
                {getRelativeTime(s.schedule)}
              </div>
            </Link>
          ))
        ) : (
          <span className="my-12 text-center text-2xl text-gray-600">
            No sessions found
          </span>
        )}
        {/* {sessions?.map((s, i) => (
          <Link
            to={`/user/account/sessions/${s.id}`}
            key={i}
            className="hover:bg-accent flex cursor-pointer items-center gap-4 text-sm md:[&>*]:text-base"
          >
            <div className="flex flex-2 flex-col gap-4 md:flex-row [&>*]:flex-1">
              <div className="flex flex-col gap-3">
                <div className="mr-2 text-lg font-medium md:hidden">Status</div>
                {i % 2 === 0
                  ? SESSION_STATUS.CLOSED.jsx
                  : SESSION_STATUS.SCHEDULED.jsx}
              </div>
              <div className="flex flex-col gap-3">
                <div className="mr-2 text-lg font-medium md:hidden">
                  Skill Exchanged
                </div>
                <div className="flex flex-wrap gap-2 [&>*]:w-fit">
                  <SkillGiven>{s.offeredSkill}</SkillGiven>
                  <SkillReceived>
                    {s.skillswapRequest.requestedSkill}
                  </SkillReceived>
                </div>
              </div>
            </div>
            <div className="flex-1 self-start text-nowrap">
              {getRelativeTime(s.createdAt)}
            </div>
          </Link>
        ))} */}
      </div>
      {/* Pagination */}
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-gray-500">
          Showing 1-{sessions?.length} of {data?.totalCount} - Page{" "}
          {Math.floor(offset / 10) + 1}
        </div>
        <div className="flex items-center gap-4">
          <Button
            className="cursor-pointer"
            variant="primary-outline"
            onClick={() => setOffset((prev) => (prev === 0 ? 0 : prev - 10))}
          >
            Previous
          </Button>
          <Button
            className="cursor-pointer"
            variant="primary-outline"
            onClick={() => setOffset((prev) => prev + 10)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManageSessionsPage;
