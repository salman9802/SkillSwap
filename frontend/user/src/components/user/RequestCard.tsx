import React from "react";
import type { RequestCardDataType } from "../../lib/types";
import { Card, CardContent, CardHeader } from "../ui/card";

type RequestCardPropsType = React.HTMLAttributes<HTMLDivElement> & {
  request: RequestCardDataType;
};

const RequestCard = ({ request }: RequestCardPropsType) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="text-xl font-semibold">{request.requesterName}</div>
        <div className="text-sm font-light">{request.createdAt}</div>
      </CardHeader>
      <CardContent>
        <div className="flex h-full items-start gap-6 space-y-2">
          {/* SECTION: Left side */}
          <div className="flex flex-1 flex-col gap-3">
            <p className="text-lg font-medium">Skills offered</p>
            <div className="text-primary flex flex-col gap-1.5 divide-y divide-gray-400 [&>*]:py-1">
              {request.skillsOffered.map((skill, i) => (
                <p key={i}>{skill}</p>
              ))}
            </div>
          </div>
          {/* SECTION: divider */}
          <div className="h-full w-px bg-gray-300"></div>

          {/* SECTION: Right side */}
          <div className="flex flex-1 flex-col gap-3">
            <p className="text-lg font-medium">Skills requested</p>
            <div className="flex flex-col gap-1.5 divide-y divide-gray-400 text-blue-500 [&>*]:py-1">
              {request.skillsRequested.map((skill, i) => (
                <p key={i}>{skill}</p>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RequestCard;
