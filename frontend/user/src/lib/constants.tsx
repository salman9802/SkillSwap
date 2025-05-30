import React from "react";

import {
  FaCalendarAlt,
  FaGithub,
  FaGlobe,
  FaLinkedinIn,
  FaLongArrowAltUp,
  FaTelegramPlane,
} from "react-icons/fa";
import { TbArrowsExchange } from "react-icons/tb";
import { cn } from "./utils";

export const FEATURES = [
  {
    name: "Skill-for-Skill Exchange",
    icon: <TbArrowsExchange className="size-10 sm:size-16" />,
    description:
      "No money needed—just knowledge. Trade your expertise in one area to learn something new from someone else.",
    reverse: false,
  },
  {
    name: "Diverse Community",
    icon: <FaGlobe className="size-10 sm:size-16" />,
    description:
      "Join a global network of learners and teachers from all walks of life, sharing everything from coding and design to music and languages.",
    reverse: true,
  },
  {
    name: "Flexible Scheduling",
    icon: <FaCalendarAlt className="size-10 sm:size-16" />,
    description:
      "Set your availability and connect with others at times that work for you. Learning fits around your life, not the other way around.",
    reverse: false,
  },
];

export const SOCIALS = [
  {
    url: "https://github.com/salman9802/",
    icon: <FaGithub className="size-5" />,
  },
  {
    url: "https://www.linkedin.com/in/salman9802",
    icon: <FaLinkedinIn className="size-5" />,
  },
  {
    url: "https://t.me/Storm_Fortress",
    icon: <FaTelegramPlane className="size-5" />,
  },
];

export const SESSION_STATUS = {
  OPEN: {
    description: "Session created after request acceptance",
    jsx: (
      <div className="w-fit rounded-md bg-blue-100 px-3 py-1.5 text-blue-700">
        OPEN
      </div>
    ),
  },
  ACCEPTED: {
    description: "Session confirmed by accepter",
    jsx: (
      <div className="w-fit rounded-md bg-amber-100 px-3 py-1.5 text-amber-700">
        ACCEPTED
      </div>
    ),
  },
  SCHEDULED: {
    description:
      "Session has been scheduled after confirmation from both parties.",
    jsx: (
      <div className="w-fit rounded-md bg-green-100 px-3 py-1.5 text-green-700">
        SCHEDULED
      </div>
    ),
  },
  FINISHED: {
    description:
      "Session happened. Requester and accepter can rate the session",
    jsx: (
      <div className="w-fit rounded-md bg-gray-100 px-3 py-1.5 text-gray-700">
        FINISHED
      </div>
    ),
  },
  CLOSED: {
    description:
      "Both parties have rated the session and the session is closed",
    jsx: (
      <div className="w-fit rounded-md bg-purple-100 px-3 py-1.5 text-purple-700">
        CLOSED
      </div>
    ),
  },
  CANCELLED: {
    description: "One of the party rejected the session",
    jsx: (
      <div className="w-fit rounded-md bg-red-100 px-3 py-1.5 text-red-700">
        CANCELLED
      </div>
    ),
  },
} as const;

export const SkillGiven = ({
  children,
  className,
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 bg-blue-100 px-3 py-1.5 text-blue-700",
        className,
      )}
    >
      <FaLongArrowAltUp className="size-5" />
      {children}
    </div>
  );
};

export const SkillReceived = ({
  children,
  className,
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 bg-green-100 px-3 py-1.5 text-green-700",
        className,
      )}
    >
      <FaLongArrowAltUp className="size-5 rotate-180" />
      {children}
    </div>
  );
};

export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUEST: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export type StatusCodeType = (typeof STATUS_CODES)[keyof typeof STATUS_CODES];

export const APP_ERR_CODES = {
  REFRESH_TOKEN_EXPIRED: "RefreshTokenExpired",
  ACCESS_TOKEN_EXPIRED: "AccessTokenExpired",
} as const;

export type AppErrorCodeType =
  (typeof APP_ERR_CODES)[keyof typeof APP_ERR_CODES];
