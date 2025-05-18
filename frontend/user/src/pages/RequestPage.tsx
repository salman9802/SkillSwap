import { GoStarFill } from "react-icons/go";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRelativeTime } from "@/lib/time";
import type { RequestCardDataType } from "@/lib/types";
import requestsJSON from "../../__data/requests.json";
import ToggleGroup from "@/components/user/ToggleGroup";
import { Button } from "@/components/ui/button";

// NOTE: Mock data
const requests = requestsJSON as RequestCardDataType[];
const schedules = [
  new Date("2024-11-18T14:32:10.297Z"),
  new Date("2024-12-29T05:20:44.189Z"),
  new Date("2025-02-08T18:05:37.521Z"),
  new Date("2025-01-14T11:47:59.038Z"),
  new Date("2025-03-22T03:14:22.804Z"),
  new Date("2024-10-05T21:18:00.659Z"),
  new Date("2025-04-10T07:59:13.126Z"),
];

const RequestPage = () => {
  return (
    <div className="container mx-auto flex flex-col gap-14 px-3 py-12">
      <h1 className="text-2xl md:text-3xl lg:text-4xl">Session Request</h1>
      {/* Requester */}
      <div className="flex flex-col gap-7">
        <h2 className="text-xl md:text-2xl lg:text-3xl">Requester</h2>
        <div className="grid grid-cols-1 gap-1.5 text-lg sm:grid-cols-2 md:gap-3 lg:gap-8">
          <Card className="">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Name</CardTitle>
            </CardHeader>
            <CardContent>John Marston</CardContent>
          </Card>
          <Card className="">
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Review score
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-start gap-2">
              <GoStarFill className="text-yellow-500" /> 4.3
            </CardContent>
          </Card>
          <Card className="">
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Requested skill
              </CardTitle>
            </CardHeader>
            <CardContent className="text-blue-500">Piano</CardContent>
          </Card>
          <Card className="">
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Request created
              </CardTitle>
            </CardHeader>
            <CardContent>
              {getRelativeTime(new Date("May 14, 2025"))}
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Skills offered */}
      <div className="flex flex-col gap-7">
        <h2 className="text-xl md:text-2xl lg:text-3xl">Skills offered</h2>
        <div className="flex flex-wrap gap-6">
          <ToggleGroup
            className="[&>*]:cursor-pointer"
            options={requests[0].skillsOffered}
            selected={[]}
            onChange={() => {}}
          />
        </div>
      </div>
      {/* Available schedules */}
      <div className="flex flex-col gap-7">
        <h2 className="text-xl md:text-2xl lg:text-3xl">Available schedules</h2>
        <div className="flex flex-wrap gap-6">
          <ToggleGroup
            className="[&>*]:cursor-pointer"
            options={schedules.map((s) => s.toLocaleString())}
            selected={[]}
            onChange={() => {}}
          />
        </div>
      </div>
      {/* Action buttons */}
      <div className="my-12 flex items-center justify-end gap-6">
        <Button className="cursor-pointer" variant="outline">
          Back
        </Button>
        <Button className="cursor-pointer">Create session</Button>
      </div>
    </div>
  );
};

export default RequestPage;
