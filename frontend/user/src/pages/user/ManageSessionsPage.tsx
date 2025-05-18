import { Input } from "@/components/ui/input";
import { SESSION_STATUS, SkillGiven, SkillReceived } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import type { RequestCardDataType } from "@/lib/types";
import requestsJSON from "../../../__data/requests.json";
import { getRelativeTime } from "@/lib/time";
import { Link } from "react-router-dom";

// NOTE - Mock data
const requests = requestsJSON as RequestCardDataType[];
const sessions = requests.slice(0, 5).map((r) => ({
  skillGiven: r.skillsRequested[0],
  skillReceived: r.skillsOffered[0],
  when: r.createdAt,
}));

const ManageSessionsPage = () => {
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
          <div className="flex-1">When</div>
        </div>
        {/* Row(s) */}
        {sessions.map((s, i) => (
          <Link
            to={`/user/account/sessions/${i + 1}`}
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
                  <SkillGiven>{s.skillGiven}</SkillGiven>
                  <SkillReceived>{s.skillReceived}</SkillReceived>
                </div>
              </div>
            </div>
            {/* <div>Hunting</div> */}
            <div className="flex-1 self-start text-nowrap">
              {getRelativeTime(new Date(s.when))}
            </div>
          </Link>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-gray-500">
          Showing 1-{sessions.length} of 100 - Page 1
        </div>
        <div className="flex items-center gap-4">
          <Button variant="primary-outline">Previous</Button>
          <Button variant="primary-outline">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default ManageSessionsPage;
