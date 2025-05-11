import { FaCalendarAlt, FaGlobe } from "react-icons/fa";
import { TbArrowsExchange } from "react-icons/tb";

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
