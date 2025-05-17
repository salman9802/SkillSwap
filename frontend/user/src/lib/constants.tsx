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
  OPEN: (
    <div className="w-fit rounded-md bg-gray-100 px-3 py-1.5 text-gray-700">
      OPEN
    </div>
  ),
  FIXED: (
    <div className="w-fit rounded-md bg-yellow-100 px-3 py-1.5 text-yellow-700">
      FIXED
    </div>
  ),
  CLOSED: (
    <div className="w-fit rounded-md bg-green-100 px-3 py-1.5 text-green-700">
      CLOSED
    </div>
  ),
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
