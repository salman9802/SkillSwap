import React from "react";
import { Link } from "react-router-dom";

import type {
  RequestCardDataType,
  SkillswapRequestCardDataType,
} from "../../lib/types";
import { Card, CardContent, CardHeader } from "../ui/card";

type RequestCardPropsType = React.HTMLAttributes<HTMLDivElement> & {
  skillswapRequest: SkillswapRequestCardDataType;
};

const SkillswapRequestCard = ({ skillswapRequest }: RequestCardPropsType) => {
  return (
    <Link target="_blank" to={`/request/${skillswapRequest.id}`}>
      <Card className="h-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-95 hover:shadow-lg">
        <CardHeader className="flex items-center justify-between">
          <div className="text-xl font-semibold">
            {skillswapRequest.requester.name}
          </div>
          <div className="text-sm font-light">
            {new Date(skillswapRequest.createdAt).toDateString()}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex h-full flex-col items-start gap-3">
            {/* SECTION: Skills offered */}
            <div className="flex flex-1 flex-col gap-1.5">
              <p className="font-medium">Skills offered</p>
              <div className="text-primary flex flex-wrap gap-3">
                {skillswapRequest.requester.offeredSkills.map((skill, i) => (
                  <p
                    className="rounded-sm bg-green-100 px-3 py-1.5 text-green-700"
                    key={i}
                  >
                    {skill}
                  </p>
                ))}
              </div>
            </div>
            {/* SECTION: divider */}
            {/* <div className="h-full w-px bg-gray-300"></div> */}
            {/* SECTION: Skills requested */}
            <div className="flex flex-1 flex-col gap-1.5">
              <p className="font-medium">Skills requested</p>
              <div className="flex flex-col gap-1.5 divide-y divide-gray-400 text-blue-500 [&>*]:py-1">
                <p className="rounded-sm bg-blue-100 px-3 py-1.5 text-blue-700">
                  {skillswapRequest.requestedSkill}
                </p>
                {/* {skillswapRequest.requestedSkill.map((skill, i) => (
                  <p key={i}>{skill}</p>
                ))} */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SkillswapRequestCard;
