import React from "react";
import { useParams } from "react-router-dom";
import { MdOutlineStarRate, MdRateReview, MdStarRate } from "react-icons/md";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Section from "@/components/utils/Section";
import {
  SESSION_STATUS,
  SkillOffered,
  SkillRequested,
  type SessionStatusKey,
} from "@/lib/constants";
import type { SkillswapSessionResponse } from "@/lib/types";
import { cn, getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ChatContainer from "@/components/user/ChatContainer";
import {
  useFetchSkillswapSessionQuery,
  useRejectSkillswapSessionMutation,
  useReviewSkillswapSessionMutation,
  useUpdateSkillswapSessionMutation,
} from "@/features/skillswap-session/skillswapSessionApi";
import { SERVER_URL } from "@/features/api";
import SkeletonLoader from "@/components/utils/SkeletonLoader";
import Countdown from "@/components/utils/Countdown";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Loader from "@/components/utils/Loader";

const ReviewDialog: React.FC<{
  skillswapSession: SkillswapSessionResponse;
  sessionId: string;
}> = ({ skillswapSession, sessionId }) => {
  const [open, setOpen] = React.useState(false);

  const [review, setReview] = React.useState({
    rating: 4,
    comment: "",
  });

  const [createReview, { isLoading }] = useReviewSkillswapSessionMutation();

  const handleReviewSubmit = async () => {
    try {
      const res = await createReview({
        sessionId,
        review: {
          ...review,
          revieweeId: skillswapSession.isRequester
            ? skillswapSession.skillswapRequest.accepterId
            : skillswapSession.skillswapRequest.requesterId,
        },
      }).unwrap();
      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button
          disabled={skillswapSession.hasReviewed}
          className="disabled:text-gray-600"
        >
          <MdRateReview className="size-6" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            How was your experience with{" "}
            {skillswapSession.isRequester
              ? skillswapSession.skillswapRequest.accepter.name
              : skillswapSession.skillswapRequest.requester.name}
            ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. You can only review once every
            session.
          </AlertDialogDescription>

          {/* form */}
          <div className="my-6 flex flex-col gap-12">
            {/* rating */}
            <div className="flex items-center gap-3 [&>*]:size-8 [&>*]:cursor-pointer [&>*]:text-yellow-500">
              {Array.from({ length: review.rating }, (_, i) => (
                <MdStarRate
                  onClick={() =>
                    setReview((prev) => ({ ...prev, rating: i + 1 }))
                  }
                  key={i}
                />
              ))}

              {Array.from({ length: 5 - review.rating }, (_, i) => (
                <MdOutlineStarRate
                  onClick={() =>
                    setReview((prev) => ({
                      ...prev,
                      rating: prev.rating + i + 1,
                    }))
                  }
                  key={i}
                />
              ))}
            </div>

            {/* comment */}
            {/* <div className="" contentEditable={true} /> */}
            <textarea
              className="resize-none border border-gray-300 p-3"
              rows={5}
              placeholder="Describe your experience..."
              onChange={(e) => {
                setReview((prev) => ({ ...prev, comment: e.target.value }));
              }}
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading} className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <Button
            disabled={isLoading}
            className="cursor-pointer"
            onClick={handleReviewSubmit}
          >
            {isLoading ? <Loader className="size-5" /> : "Review"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const SessionPageSkeletonLoader: React.FC = () => {
  return (
    <div className="container mx-auto flex flex-col gap-10 px-6 py-12 lg:w-2/3">
      <h1 className="pb-6 text-xl font-semibold md:text-2xl lg:text-4xl">
        Skillswap session
      </h1>
      {/* Requester + Accepter */}
      {Array.from({ length: 2 }, (_, i) => (
        <Section key={i}>
          <Section.Title className="text-xl font-semibold text-gray-900">
            <SkeletonLoader className="h-lh w-48" />
          </Section.Title>
          <Section.Content className="flex w-full items-center gap-3 [&>*]:my-3">
            <SkeletonLoader className="size-12 rounded-full" />
            <div className="font-medium text-gray-700">
              <SkeletonLoader className="h-lh w-24" />
            </div>
            <div className="[&>*]:hover:text-primary mt-6! ml-3 [&>*]:cursor-pointer">
              <SkeletonLoader className="size-5 rounded-full" />
            </div>
          </Section.Content>
        </Section>
      ))}

      {/* Status */}
      <Section>
        <Section.Title className="flex flex-col gap-2">
          <div className="text-xl font-semibold text-gray-900">Status</div>
          <div className="text-base text-gray-600">
            <SkeletonLoader className="h-lh w-24" />
          </div>
        </Section.Title>
        <Section.Content className="w-full [&>*]:my-3">
          <SkeletonLoader className="h-lh w-48" />
        </Section.Content>
      </Section>
      {/* Scheduled for */}
      <Section>
        <Section.Title className="flex flex-col gap-2">
          <div className="text-xl font-semibold text-gray-900">
            Session scheduled for
          </div>
          <div className="text-base text-gray-600">
            Timing based on your selected country and timezone.
          </div>
        </Section.Title>
        <Section.Content className="flex w-full flex-wrap gap-6 [&>*]:my-3">
          <div className="flex-gap-3 rounded-sm bg-gray-100 px-3 py-1.5 text-gray-700">
            <SkeletonLoader className="h-lh w-24" />
          </div>
        </Section.Content>
      </Section>
      {/* Skill Exchange */}
      <Section>
        <Section.Title className="flex flex-col gap-2">
          <div className="text-xl font-semibold text-gray-900">
            Skill Exchange
          </div>
        </Section.Title>
        <Section.Content className="w-full [&>*]:my-3">
          <SkeletonLoader className="h-6 w-48" />
        </Section.Content>
      </Section>
    </div>
  );
};

const SessionPage = () => {
  const { sessionId } = useParams() as { sessionId: string };

  const {
    data: skillswapSession,
    isLoading,
    refetch: refetchSession,
  } = useFetchSkillswapSessionQuery(sessionId);
  const [rejectSession, { isLoading: isRejectLoading }] =
    useRejectSkillswapSessionMutation();
  const [updateSession, { isLoading: isUpdatingSession }] =
    useUpdateSkillswapSessionMutation();

  const scheduledDate = React.useMemo(
    () => skillswapSession && new Date(skillswapSession?.schedule.date),
    [skillswapSession],
  );

  if (isLoading) {
    return <SessionPageSkeletonLoader />;
  }

  if (!isLoading && skillswapSession === undefined) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center text-2xl font-light lg:text-4xl">
        Session does not exists
      </div>
    );
  }

  /** Reject session when countdown finished and session not scheduled yet, or any party rejects session */
  const handleSessionRejection = async () => {
    try {
      const res = await rejectSession(sessionId);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSessionUpdate = async () => {
    try {
      const res = await updateSession(sessionId);
      console.log(res);
      refetchSession();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto flex flex-col gap-10 px-6 py-12 lg:w-2/3">
      <h1 className="pb-6 text-xl font-semibold md:text-2xl lg:text-4xl">
        Skillswap session
      </h1>
      {/* Requester */}
      <Section>
        <Section.Title className="text-xl font-semibold text-gray-900">
          Requester
        </Section.Title>
        <Section.Content className="flex w-full items-center gap-3 [&>*]:my-3">
          <Avatar className="size-12">
            <AvatarImage
              src={`${SERVER_URL}${skillswapSession?.skillswapRequest.requester.picture}`}
              alt={`@${skillswapSession?.skillswapRequest.requester.name}`}
            />
            <AvatarFallback>
              {getInitials(skillswapSession?.skillswapRequest.requester.name)}
            </AvatarFallback>
          </Avatar>
          <div className="font-medium text-gray-700">
            {skillswapSession?.skillswapRequest.requester.name}
          </div>
          {skillswapSession && !skillswapSession.isRequester && (
            <>
              <div className="[&>*]:hover:text-primary mt-6! ml-3 [&>*]:cursor-pointer">
                <ChatContainer sessionId={sessionId} />
              </div>
              {skillswapSession.status === "FINISHED" && (
                <div className="mt-6! ml-3 [&>*]:cursor-pointer">
                  <ReviewDialog
                    sessionId={sessionId}
                    skillswapSession={skillswapSession}
                  />
                </div>
              )}
            </>
          )}
        </Section.Content>
      </Section>
      {/* Accepter */}
      <Section>
        <Section.Title className="text-xl font-semibold text-gray-900">
          Accepter
        </Section.Title>
        <Section.Content className="flex w-full items-center gap-3 [&>*]:my-3">
          <Avatar className="size-12">
            <AvatarImage
              src={`${SERVER_URL}${skillswapSession?.skillswapRequest.accepter.picture}`}
              alt="@shadcn"
            />
            <AvatarFallback>
              {getInitials(skillswapSession?.skillswapRequest.accepter.name)}
            </AvatarFallback>
          </Avatar>
          <div className="font-medium text-gray-700">
            {skillswapSession?.skillswapRequest.accepter.name}
          </div>
          {skillswapSession && skillswapSession.isRequester && (
            <>
              <div className="[&>*]:hover:text-primary mt-6! ml-3 [&>*]:cursor-pointer">
                <ChatContainer sessionId={sessionId} />
              </div>
              {skillswapSession.status === "FINISHED" && (
                <div className="mt-6! ml-3 [&>*]:cursor-pointer">
                  <ReviewDialog
                    sessionId={sessionId}
                    skillswapSession={skillswapSession}
                  />
                </div>
              )}
            </>
          )}
        </Section.Content>
      </Section>
      {/* Status */}
      <Section>
        <Section.Title className="flex flex-col gap-2">
          <div className="text-xl font-semibold text-gray-900">Status</div>
          <p
            className={cn(
              "text-base text-gray-600",
              skillswapSession?.status === "CLOSED" && "text-purple-500",
              skillswapSession?.status === "CANCELLED" && "text-red-500",
            )}
          >
            {
              SESSION_STATUS[skillswapSession?.status as SessionStatusKey]
                ?.description
            }
          </p>
        </Section.Title>
        <Section.Content className="w-full [&>*]:my-3">
          {SESSION_STATUS[skillswapSession?.status as SessionStatusKey]?.jsx}
        </Section.Content>
      </Section>
      {/* Scheduled for */}
      <Section>
        <Section.Title className="flex flex-col gap-2">
          <div className="text-xl font-semibold text-gray-900">
            Session scheduled for
          </div>
          <p className="text-base text-gray-600">
            Timing based on your selected country and timezone.
          </p>
        </Section.Title>
        <Section.Content className="flex w-full flex-col flex-wrap items-start gap-3 py-3">
          <div className="flex w-fit gap-3 rounded-sm bg-gray-100 px-3 py-1.5 text-gray-700">
            {scheduledDate?.toDateString()}{" "}
            {scheduledDate?.toLocaleTimeString()}
          </div>
          {scheduledDate && skillswapSession?.status !== "CANCELLED" && (
            <Countdown
              date={scheduledDate}
              onComplete={async () => {
                if (
                  skillswapSession?.status === "OPEN" ||
                  skillswapSession?.status === "ACCEPTED"
                )
                  handleSessionRejection();

                if (skillswapSession?.status === "SCHEDULED")
                  handleSessionUpdate();
              }}
            />
          )}
        </Section.Content>
      </Section>
      {/* Skill Exchange */}
      <Section>
        <Section.Title className="flex flex-col gap-2">
          <div className="text-xl font-semibold text-gray-900">
            Skill Exchange
          </div>
          {/* <p className="text-base text-gray-600">
            This can be changed by accepter.
          </p> */}
        </Section.Title>
        <Section.Content className="w-full [&>*]:my-3">
          <div className="flex flex-wrap gap-2 [&>*]:w-fit">
            {/* <SkillOffered>{session.skillGiven}</SkillOffered>
            <SkillRequested>{session.skillReceived}</SkillRequested> */}
            {skillswapSession?.isRequester ? (
              <>
                <SkillOffered>{skillswapSession.offeredSkill}</SkillOffered>
                <SkillRequested>
                  {skillswapSession.skillswapRequest.requestedSkill}
                </SkillRequested>
              </>
            ) : (
              <>
                <SkillOffered>
                  {skillswapSession?.skillswapRequest.requestedSkill}
                </SkillOffered>
                <SkillRequested>
                  {skillswapSession?.offeredSkill}
                </SkillRequested>
              </>
            )}
          </div>
        </Section.Content>
      </Section>
      {/* Action buttons */}
      {/* <div className="my-12 flex flex-wrap items-center justify-end gap-6">
        <Button
          className="cursor-pointer hover:bg-red-500"
          variant="destructive"
        >
          Reject
        </Button> */}
      {/* <Button
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
        </Button> */}

      {/* Action buttons */}
      <div className="my-12 flex flex-wrap items-center justify-end gap-6">
        {skillswapSession?.isRequester ? (
          // requester
          <>
            <Button
              onClick={handleSessionRejection}
              disabled={
                skillswapSession.status === "CANCELLED" ||
                isRejectLoading ||
                skillswapSession.status === "CANCELLED"
              }
              className="cursor-pointer hover:bg-red-500"
              variant="destructive"
            >
              {isRejectLoading ? (
                <Loader className="size-5 border-b-gray-400" />
              ) : (
                "Reject"
              )}
            </Button>
            {isUpdatingSession ? (
              <Loader className="size-5" />
            ) : (
              <Button
                onClick={handleSessionUpdate}
                disabled={skillswapSession.status !== "ACCEPTED"}
                className={cn("cursor-pointer")}
              >
                {skillswapSession.status === "OPEN"
                  ? "Accept (Waiting for accepter to accept)"
                  : "Accept"}
              </Button>
            )}
          </>
        ) : (
          // accepter
          <>
            <Button
              onClick={handleSessionRejection}
              disabled={
                skillswapSession?.status === "CANCELLED" ||
                isRejectLoading ||
                skillswapSession?.status === "SCHEDULED"
              }
              className="cursor-pointer hover:bg-red-500"
              variant="destructive"
            >
              {isRejectLoading ? (
                <Loader className="size-5 border-b-gray-400" />
              ) : (
                "Reject"
              )}
            </Button>
            {isUpdatingSession ? (
              <Loader className="size-5" />
            ) : (
              <Button
                onClick={handleSessionUpdate}
                disabled={skillswapSession?.status !== "OPEN"}
                className={cn("cursor-pointer")}
              >
                {skillswapSession?.status === "ACCEPTED"
                  ? "Accept (Waiting for requester to accept)"
                  : "Accept"}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SessionPage;
