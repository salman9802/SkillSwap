import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { GoStarFill } from "react-icons/go";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRelativeTime } from "@/lib/time";
import type {
  CreateSkillswapSessionPayload,
  NewSkillswapSession,
  RequestCardDataType,
  ServerResponse,
  SkillswapRequest,
} from "@/lib/types";
import requestsJSON from "../../__data/requests.json";
import ToggleGroup from "@/components/user/ToggleGroup";
import { Button } from "@/components/ui/button";
import { useFetchSkillswapRequestDetailsQuery } from "@/features/skillswap-request/skillswapRequestApi";
import SkeletonLoader from "@/components/utils/SkeletonLoader";
import Section from "@/components/utils/Section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SERVER_URL } from "@/features/api";
import { getInitials } from "@/lib/utils";
import { BsExclamationCircleFill } from "react-icons/bs";
import { IoIosWarning } from "react-icons/io";
import { useCreateSkillswapSessionMutation } from "@/features/skillswap-session/skillswapSessionApi";
import Loader from "@/components/utils/Loader";
import type { StoreState } from "@/features/store";
import { useToast } from "@/components/utils/toast";

// NOTE: Mock data
// const requests = requestsJSON as RequestCardDataType[];
const requests = [
  {
    id: 1,
    requesterName: "Me",
    skillsOffered: ["Some skill", "Another skill"],
    skillsRequested: ["a"],
  },
] as RequestCardDataType[];
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
  const { pushToastMessage } = useToast();
  const userId = useSelector((store: StoreState) => store.session.user?.id);

  const { requestId } = useParams() as { requestId: string };
  const { data, isLoading, isError, error } =
    useFetchSkillswapRequestDetailsQuery(requestId);

  const [session, setSession] = React.useState<NewSkillswapSession>({
    offeredSkill: "",
    scheduleId: "",
  });
  const [createSkillswapSession, { isLoading: isSubmitting }] =
    useCreateSkillswapSessionMutation();

  /** Memoized value of `data` with `data.request.availability.date`'s & `data.request.createdAt` as `Date` */
  const request: SkillswapRequest | undefined = React.useMemo(() => {
    if (data !== undefined) {
      return {
        ...data.request,
        availability: data.request.availability.map((avail) => ({
          ...avail,
          date: new Date(avail.date),
        })),
        createdAt: new Date(data.request.createdAt),
      };
    }
    return undefined;
  }, [data]);

  /** Memoized value of schedule belonging to `scheduleId` */
  const schedule: { id: string; date: Date } | undefined = React.useMemo(() => {
    if (request && session.scheduleId && session.scheduleId.length > 0) {
      return request.availability.filter((a) => a.id === session.scheduleId)[0];
    }
    return undefined;
  }, [request, session.scheduleId]);

  const navigate = useNavigate();

  if (isError) {
    if ("status" in error && error.status === 409) {
      return (
        <div className="flex min-h-screen w-full items-center justify-center text-xl md:text-2xl lg:text-4xl">
          Request closed.
        </div>
      );
    }
  }

  // handle event of session creation
  const handleCreateSession = async () => {
    if (
      session !== undefined &&
      session.scheduleId.length > 0 &&
      session.offeredSkill.length > 0
    ) {
      try {
        // const res = await createSkillswapSession(
        //   session as CreateSkillswapSessionPayload,
        // ).unwrap();

        const res = await createSkillswapSession({
          requestId,
          offeredSkill: session.offeredSkill,
          scheduleId: session.scheduleId,
        }).unwrap();

        // const payload = res as unknown as { session: { id: string } };
        // console.log(payload.session);
        navigate(`/user/account/sessions/${res.session.id}`);
        pushToastMessage({
          type: "success",
          message: res.message,
        });
      } catch (error) {
        console.error(error);
        const res = (error as { data: ServerResponse }).data;
        pushToastMessage({
          type: "error",
          message: res.message || "Service unavailable",
        });
      }
    }
  };

  return (
    <div className="container mx-auto flex flex-col gap-20 px-6 py-12">
      {/* Requester */}
      <Section>
        <Section.Title className="text-lg md:text-xl lg:text-3xl">
          <h2>Requester</h2>
        </Section.Title>
        <Section.Content>
          {isLoading ? (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 5 }, (_, i) => (
                <SkeletonLoader key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : isError ? (
            <span className="text-red-500">Coudn't fetch data</span>
          ) : (
            <div className="flex flex-col gap-6 py-6">
              {/* > name + pic */}
              <div className="flex w-full items-center gap-3">
                <Avatar className="size-12">
                  <AvatarImage
                    src={`${SERVER_URL}${request?.requester.picture}`}
                    alt={`@${request?.requester.name}`}
                  />
                  <AvatarFallback>
                    {getInitials(request?.requester.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="font-medium text-gray-700">
                  {request?.requester.name}
                </div>
              </div>
              {/* > request created on */}
              <div className="flex flex-col gap-3">
                <span className="text-xl font-semibold">
                  Request created on
                </span>
                {/* <span>{request?.createdAt.toString()}</span> */}
                <span className="w-fit rounded-sm bg-gray-100 px-3 py-1.5 text-gray-700">
                  {request?.createdAt.toDateString()}{" "}
                  {request?.createdAt.toLocaleTimeString()}
                </span>
              </div>
              {/* > review score (optional) */}

              {/* > requested skill (indicator if user's offered matches) */}
              <div className="flex flex-col gap-3">
                <span className="text-xl font-semibold">Requested skill</span>
                <div className="flex gap-1.5 [&>*]:px-3 [&>*]:py-1.5">
                  <span className="w-fit rounded-sm bg-blue-100 text-blue-700">
                    {request?.requestedSkill}
                  </span>
                  {data?.canProvideSkill ? (
                    <span className="flex items-center gap-1.5 rounded-full text-green-500">
                      <BsExclamationCircleFill className="size-5" />
                      You can offer this skill
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 rounded-full text-orange-500">
                      <IoIosWarning className="size-5" />
                      You cannot offer this skill
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </Section.Content>
      </Section>

      {/* Skills offered */}
      <Section>
        <Section.Title>
          <h3 className="text-lg md:text-xl lg:text-2xl">
            Offered Skills <sup className="text-red-500">*</sup>
          </h3>
          <p className="text-gray-600">Select one skill you want in return.</p>
        </Section.Title>
        <Section.Content className="flex flex-col gap-3 py-6">
          {isLoading ? (
            <SkeletonLoader className="h-lh rounded-full" />
          ) : isError ? (
            <span className="text-red-500">Coudn't fetch data</span>
          ) : (
            <ToggleGroup
              className="[&>*]:cursor-pointer"
              options={request!.requester.offeredSkills}
              selected={[session?.offeredSkill]}
              onChange={(selection) => {
                setSession((prev) => ({ ...prev, offeredSkill: selection[0] }));
              }}
            />
          )}
        </Section.Content>
      </Section>

      {/* Available schedules */}
      <Section>
        <Section.Title>
          <h3 className="text-lg md:text-xl lg:text-2xl">
            Available schedules <sup className="text-red-500">*</sup>
          </h3>
          <p className="text-gray-600">Select when you want the session.</p>
        </Section.Title>
        <Section.Content className="flex flex-col gap-3 py-6">
          {isLoading ? (
            <SkeletonLoader className="h-lh rounded-full" />
          ) : isError ? (
            <span className="text-red-500">Coudn't fetch data</span>
          ) : (
            <ToggleGroup
              className="[&>*]:cursor-pointer"
              options={request!.availability.map(
                (a) =>
                  `${a.date.toDateString()} ${a.date.toLocaleTimeString()}`,
              )}
              selected={[
                `${schedule?.date?.toDateString()} ${schedule?.date?.toLocaleTimeString()}`,
              ]}
              onChange={(selection) => {
                setSession((prev) => ({
                  ...prev,
                  scheduleId: request?.availability
                    ? request.availability.filter(
                        (a) =>
                          `${a.date.toDateString()} ${a.date.toLocaleTimeString()}` ===
                          selection[0],
                      )[0]?.id
                    : "",
                }));
              }}
            />
          )}
        </Section.Content>
      </Section>
      {/* Action buttons */}
      <div className="my-12 flex items-center justify-end gap-6">
        <Button
          disabled={
            session?.scheduleId === undefined ||
            session?.offeredSkill === undefined ||
            session?.offeredSkill?.length === 0 ||
            session?.scheduleId?.length === 0 ||
            !data?.canProvideSkill ||
            request?.requester.id === userId
          }
          onClick={handleCreateSession}
          className="cursor-pointer"
        >
          {isSubmitting ? <Loader className="size-5" /> : "Create session"}
        </Button>
      </div>
    </div>
  );

  // return (
  //   <div className="container mx-auto flex flex-col gap-14 px-3 py-12">
  //     <h1 className="text-2xl md:text-3xl lg:text-4xl">Session Request</h1>
  //     {/* Requester */}
  //     <div className="flex flex-col gap-7">
  //       <h2 className="text-xl md:text-2xl lg:text-3xl">Requester</h2>
  //       <div className="grid grid-cols-1 gap-1.5 text-lg sm:grid-cols-2 md:gap-3 lg:gap-8">
  //         <Card className="">
  //           <CardHeader>
  //             <CardTitle className="text-lg font-medium">Name</CardTitle>
  //           </CardHeader>
  //           <CardContent>
  //             {/* {isLoading && <SkeletonLoader className="h-lh rounded-full" />} */}
  //             {/* // {isError && ("status" in error ?  : error.message)} */}
  //             {/* {isError && !isSuccess
  //               ? "Something went wrong"
  //               : data?.request.requester.name} */}

  //             {isLoading ? (
  //               <SkeletonLoader className="h-lh rounded-full" />
  //             ) : isError ? (
  //               <span className="text-red-500">"Coudn't fetch data"</span>
  //             ) : (
  //               data?.request.requester.name
  //             )}
  //           </CardContent>
  //         </Card>
  //         <Card className="">
  //           <CardHeader>
  //             <CardTitle className="text-lg font-medium">
  //               Review score
  //             </CardTitle>
  //           </CardHeader>
  //           <CardContent className="flex items-center justify-start gap-2">
  //             <GoStarFill className="text-yellow-500" /> 4.3
  //           </CardContent>
  //         </Card>
  //         <Card className="">
  //           <CardHeader>
  //             <CardTitle className="text-lg font-medium">
  //               Requested skill
  //             </CardTitle>
  //           </CardHeader>
  //           <CardContent className="text-blue-500">Piano</CardContent>
  //         </Card>
  //         <Card className="">
  //           <CardHeader>
  //             <CardTitle className="text-lg font-medium">
  //               Request created
  //             </CardTitle>
  //           </CardHeader>
  //           <CardContent>
  //             {getRelativeTime(new Date("May 14, 2025"))}
  //           </CardContent>
  //         </Card>
  //       </div>
  //     </div>
  //     {/* Skills offered */}
  //     <div className="flex flex-col gap-7">
  //       <h2 className="text-xl md:text-2xl lg:text-3xl">Skills offered</h2>
  //       <div className="flex flex-wrap gap-6">
  //         <ToggleGroup
  //           className="[&>*]:cursor-pointer"
  //           options={requests[0].skillsOffered}
  //           selected={[]}
  //           onChange={() => {}}
  //         />
  //       </div>
  //     </div>
  //     {/* Available schedules */}
  //     <div className="flex flex-col gap-7">
  //       <h2 className="text-xl md:text-2xl lg:text-3xl">Available schedules</h2>
  //       <div className="flex flex-wrap gap-6">
  //         <ToggleGroup
  //           className="[&>*]:cursor-pointer"
  //           options={schedules.map((s) => s.toLocaleString())}
  //           selected={[]}
  //           onChange={() => {}}
  //         />
  //       </div>
  //     </div>
  //     {/* Action buttons */}
  //     <div className="my-12 flex items-center justify-end gap-6">
  //       <Button className="cursor-pointer" variant="outline">
  //         Back
  //       </Button>
  //       <Button className="cursor-pointer">Create session</Button>
  //     </div>
  //   </div>
  // );
};

export default RequestPage;
