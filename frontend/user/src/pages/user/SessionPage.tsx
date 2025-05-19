import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ToggleGroup from "@/components/user/ToggleGroup";
import Section from "@/components/utils/Section";
import { SESSION_STATUS, SkillGiven, SkillReceived } from "@/lib/constants";
import type { RequestCardDataType } from "@/lib/types";
import { cn } from "@/lib/utils";
import requestsJSON from "../../../__data/requests.json";
import { Button } from "@/components/ui/button";
import ChatContainer from "@/components/user/ChatContainer";

// NOTE: Mock data
const schedules = [
  new Date("2024-11-18T14:32:10.297Z"),
  new Date("2024-12-29T05:20:44.189Z"),
  new Date("2025-02-08T18:05:37.521Z"),
  new Date("2025-01-14T11:47:59.038Z"),
  new Date("2025-03-22T03:14:22.804Z"),
  new Date("2024-10-05T21:18:00.659Z"),
  new Date("2025-04-10T07:59:13.126Z"),
];
const isAccepter = false;
const requests = requestsJSON as RequestCardDataType[];
const session = {
  skillGiven: requests[0].skillsRequested[0],
  skillReceived: requests[0].skillsOffered[0],
  when: requests[0].createdAt,
};
const accepterAccepted = false;
const sessionStatus: keyof typeof SESSION_STATUS = "SCHEDULED";

const SessionPage = () => {
  return (
    <div className="container mx-auto flex flex-col gap-10 px-6 py-12 lg:w-2/3">
      <h1 className="pb-6 text-xl font-semibold md:text-2xl lg:text-3xl">
        Session
      </h1>
      {/* Requester */}
      <Section>
        <Section.Title className="text-xl font-semibold text-gray-900">
          Requester
        </Section.Title>
        <Section.Content className="flex w-full items-center gap-3 [&>*]:my-3">
          <Avatar className="size-12">
            <AvatarImage src="https://github.com/shadcn.pngf" alt="@shadcn" />
            <AvatarFallback>JM</AvatarFallback>
          </Avatar>
          <div className="font-medium text-gray-700">John Marston</div>
          <div className="[&>*]:hover:text-primary mt-6! ml-3 [&>*]:cursor-pointer">
            <ChatContainer />
          </div>
        </Section.Content>
      </Section>
      {/* Accepter */}
      <Section>
        <Section.Title className="text-xl font-semibold text-gray-900">
          Accepter
        </Section.Title>
        <Section.Content className="flex w-full items-center gap-3 [&>*]:my-3">
          <Avatar className="size-12">
            <AvatarImage src="https://github.com/shadcn.pngf" alt="@shadcn" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div className="font-medium text-gray-700">Arthur Morgan</div>
        </Section.Content>
      </Section>
      {/* Status */}
      <Section>
        <Section.Title className="flex flex-col gap-2">
          <div className="text-xl font-semibold text-gray-900">Status</div>
          <p className="text-base text-gray-600">
            {SESSION_STATUS[sessionStatus].description}
          </p>
        </Section.Title>
        <Section.Content className="w-full [&>*]:my-3">
          {SESSION_STATUS[sessionStatus].jsx}
        </Section.Content>
      </Section>
      {/* Scheduled for */}
      <Section>
        <Section.Title className="flex flex-col gap-2">
          <div className="text-xl font-semibold text-gray-900">
            Scheduled for
          </div>
          <p className="text-base text-gray-600">
            This can be changed by accepter.
          </p>
        </Section.Title>
        <Section.Content className="flex w-full flex-wrap gap-6 [&>*]:my-3">
          <ToggleGroup
            className={cn(
              isAccepter
                ? "[&>*]:cursor-pointer"
                : "[&>*:not(.toggle-group-selected)]:cursor-not-allowed [&>*:not(.toggle-group-selected)]:bg-gray-100 [&>*:not(.toggle-group-selected)]:text-gray-400 [&>*:not(.toggle-group-selected)]:hover:bg-gray-100 [&>*:not(.toggle-group-selected)]:hover:text-gray-400",
            )}
            options={schedules.map((s) => s.toLocaleString())}
            selected={[schedules[3].toLocaleString()]}
            onChange={() => {}}
          />
        </Section.Content>
      </Section>
      {/* Skill Exchange */}
      <Section>
        <Section.Title className="flex flex-col gap-2">
          <div className="text-xl font-semibold text-gray-900">
            Skill Exchange
          </div>
          <p className="text-base text-gray-600">
            This can be changed by accepter.
          </p>
        </Section.Title>
        <Section.Content className="w-full [&>*]:my-3">
          <div className="flex flex-wrap gap-2 [&>*]:w-fit">
            <SkillGiven>{session.skillGiven}</SkillGiven>
            <SkillReceived>{session.skillReceived}</SkillReceived>
          </div>
        </Section.Content>
      </Section>
      {/* Action buttons */}
      <div className="my-12 flex flex-wrap items-center justify-end gap-6">
        <Button
          className="cursor-pointer hover:bg-red-500"
          variant="destructive"
        >
          Reject
        </Button>
        <Button
          className={cn(
            "cursor-pointer",
            accepterAccepted
              ? ""
              : "cursor-not-allowed bg-gray-300 text-gray-600 hover:bg-gray-300 hover:text-gray-600",
          )}
        >
          Accept
          {accepterAccepted
            ? " (Accepter accepted)"
            : " (Waiting for accepter to accept)"}
        </Button>
      </div>
    </div>
  );
};

export default SessionPage;
