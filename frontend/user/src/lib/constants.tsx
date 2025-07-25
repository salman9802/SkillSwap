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
import { BiSolidCoinStack } from "react-icons/bi";
import * as ct from "countries-and-timezones";

import { cn } from "./utils";

export const FEATURES = [
  {
    name: "Skill-for-Skill Exchange",
    icon: <TbArrowsExchange className="size-10 sm:size-16" />,
    description:
      "No real-world money needed—just knowledge. Trade your expertise in one area to learn something new from someone else.",
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
  {
    name: "Gamify your growth",
    icon: <BiSolidCoinStack className="size-10 sm:size-16" />,
    description:
      "Learning new skills just got a lot more fun. With SkillSwap’s gamification features, users earn points, badges, and rewards for sharing knowledge, completing swaps, and hitting learning milestones. Whether you're teaching, learning, or both — SkillSwap turns skill-sharing into a game where everyone levels up.",
    reverse: true,
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
    description:
      "This session was created after the someone accepted the request",
    jsx: (
      <div className="w-fit rounded-md bg-blue-100 px-3 py-1.5 text-blue-700">
        OPEN
      </div>
    ),
  },
  ACCEPTED: {
    description:
      "Session confirmed by accepter (Requester can now confirm the session)",
    jsx: (
      <div className="w-fit rounded-md bg-amber-100 px-3 py-1.5 text-amber-700">
        ACCEPTED
      </div>
    ),
  },
  SCHEDULED: {
    description:
      "Session has been scheduled after confirmation from both parties",
    jsx: (
      <div className="w-fit rounded-md bg-green-100 px-3 py-1.5 text-green-700">
        SCHEDULED
      </div>
    ),
  },
  FINISHED: {
    description:
      "Session happened. Requester and accepter can rate the session beside the respective person",
    jsx: (
      <div className="w-fit rounded-md bg-gray-100 px-3 py-1.5 text-gray-700">
        FINISHED
      </div>
    ),
  },
  CLOSED: {
    description: "Session is closed",
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

export type SessionStatusKey = keyof typeof SESSION_STATUS;

export const SkillOffered = ({
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

export const SkillRequested = ({
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

// 193 countries
// export const countries = [
//   "Afghanistan",
//   "Albania",
//   "Algeria",
//   "Andorra",
//   "Angola",
//   "Argentina",
//   "Armenia",
//   "Australia",
//   "Austria",
//   "Azerbaijan",
//   "Bahamas",
//   "Bahrain",
//   "Bangladesh",
//   "Barbados",
//   "Belarus",
//   "Belgium",
//   "Belize",
//   "Benin",
//   "Bhutan",
//   "Bolivia",
//   "Bosnia and Herzegovina",
//   "Botswana",
//   "Brazil",
//   "Brunei",
//   "Bulgaria",
//   "Burkina Faso",
//   "Burundi",
//   "Cambodia",
//   "Cameroon",
//   "Canada",
//   "Cape Verde",
//   "Central African Republic",
//   "Chad",
//   "Chile",
//   "China",
//   "Colombia",
//   "Comoros",
//   "Congo (Brazzaville)",
//   "Congo (Kinshasa)",
//   "Costa Rica",
//   "Croatia",
//   "Cuba",
//   "Cyprus",
//   "Czech Republic",
//   "Denmark",
//   "Djibouti",
//   "Dominica",
//   "Dominican Republic",
//   "Ecuador",
//   "Egypt",
//   "El Salvador",
//   "Equatorial Guinea",
//   "Eritrea",
//   "Estonia",
//   "Eswatini",
//   "Ethiopia",
//   "Fiji",
//   "Finland",
//   "France",
//   "Gabon",
//   "Gambia",
//   "Georgia",
//   "Germany",
//   "Ghana",
//   "Greece",
//   "Grenada",
//   "Guatemala",
//   "Guinea",
//   "Guinea-Bissau",
//   "Guyana",
//   "Haiti",
//   "Honduras",
//   "Hungary",
//   "Iceland",
//   "India",
//   "Indonesia",
//   "Iran",
//   "Iraq",
//   "Ireland",
//   "Israel",
//   "Italy",
//   "Ivory Coast",
//   "Jamaica",
//   "Japan",
//   "Jordan",
//   "Kazakhstan",
//   "Kenya",
//   "Kiribati",
//   "Kuwait",
//   "Kyrgyzstan",
//   "Laos",
//   "Latvia",
//   "Lebanon",
//   "Lesotho",
//   "Liberia",
//   "Libya",
//   "Liechtenstein",
//   "Lithuania",
//   "Luxembourg",
//   "Madagascar",
//   "Malawi",
//   "Malaysia",
//   "Maldives",
//   "Mali",
//   "Malta",
//   "Marshall Islands",
//   "Mauritania",
//   "Mauritius",
//   "Mexico",
//   "Micronesia",
//   "Moldova",
//   "Monaco",
//   "Mongolia",
//   "Montenegro",
//   "Morocco",
//   "Mozambique",
//   "Myanmar",
//   "Namibia",
//   "Nauru",
//   "Nepal",
//   "Netherlands",
//   "New Zealand",
//   "Nicaragua",
//   "Niger",
//   "Nigeria",
//   "North Korea",
//   "North Macedonia",
//   "Norway",
//   "Oman",
//   "Pakistan",
//   "Palau",
//   "Panama",
//   "Papua New Guinea",
//   "Paraguay",
//   "Peru",
//   "Philippines",
//   "Poland",
//   "Portugal",
//   "Qatar",
//   "Romania",
//   "Russia",
//   "Rwanda",
//   "Saint Kitts and Nevis",
//   "Saint Lucia",
//   "Saint Vincent and the Grenadines",
//   "Samoa",
//   "San Marino",
//   "Sao Tome and Principe",
//   "Saudi Arabia",
//   "Senegal",
//   "Serbia",
//   "Seychelles",
//   "Sierra Leone",
//   "Singapore",
//   "Slovakia",
//   "Slovenia",
//   "Solomon Islands",
//   "Somalia",
//   "South Africa",
//   "South Korea",
//   "South Sudan",
//   "Spain",
//   "Sri Lanka",
//   "Sudan",
//   "Suriname",
//   "Sweden",
//   "Switzerland",
//   "Syria",
//   "Taiwan",
//   "Tajikistan",
//   "Tanzania",
//   "Thailand",
//   "Timor-Leste",
//   "Togo",
//   "Tonga",
//   "Trinidad and Tobago",
//   "Tunisia",
//   "Turkey",
//   "Turkmenistan",
//   "Tuvalu",
//   "Uganda",
//   "Ukraine",
//   "United Arab Emirates",
//   "United Kingdom",
//   "United States",
//   "Uruguay",
//   "Uzbekistan",
//   "Vanuatu",
//   "Vatican City",
//   "Venezuela",
//   "Vietnam",
//   "Yemen",
//   "Zambia",
//   "Zimbabwe",
// ];

// 193 countries
// export const countries = [
//   { name: "Afghanistan", code: "AF" },
//   { name: "Albania", code: "AL" },
//   { name: "Algeria", code: "DZ" },
//   { name: "Andorra", code: "AD" },
//   { name: "Angola", code: "AO" },
//   { name: "Argentina", code: "AR" },
//   { name: "Armenia", code: "AM" },
//   { name: "Australia", code: "AU" },
//   { name: "Austria", code: "AT" },
//   { name: "Azerbaijan", code: "AZ" },
//   { name: "Bahamas", code: "BS" },
//   { name: "Bahrain", code: "BH" },
//   { name: "Bangladesh", code: "BD" },
//   { name: "Barbados", code: "BB" },
//   { name: "Belarus", code: "BY" },
//   { name: "Belgium", code: "BE" },
//   { name: "Belize", code: "BZ" },
//   { name: "Benin", code: "BJ" },
//   { name: "Bhutan", code: "BT" },
//   { name: "Bolivia", code: "BO" },
//   { name: "Bosnia and Herzegovina", code: "BA" },
//   { name: "Botswana", code: "BW" },
//   { name: "Brazil", code: "BR" },
//   { name: "Brunei", code: "BN" },
//   { name: "Bulgaria", code: "BG" },
//   { name: "Burkina Faso", code: "BF" },
//   { name: "Burundi", code: "BI" },
//   { name: "Cambodia", code: "KH" },
//   { name: "Cameroon", code: "CM" },
//   { name: "Canada", code: "CA" },
//   { name: "Cape Verde", code: "CV" },
//   { name: "Central African Republic", code: "CF" },
//   { name: "Chad", code: "TD" },
//   { name: "Chile", code: "CL" },
//   { name: "China", code: "CN" },
//   { name: "Colombia", code: "CO" },
//   { name: "Comoros", code: "KM" },
//   { name: "Congo (Brazzaville)", code: "CG" },
//   { name: "Congo (Kinshasa)", code: "CD" },
//   { name: "Costa Rica", code: "CR" },
//   { name: "Croatia", code: "HR" },
//   { name: "Cuba", code: "CU" },
//   { name: "Cyprus", code: "CY" },
//   { name: "Czech Republic", code: "CZ" },
//   { name: "Denmark", code: "DK" },
//   { name: "Djibouti", code: "DJ" },
//   { name: "Dominica", code: "DM" },
//   { name: "Dominican Republic", code: "DO" },
//   { name: "Ecuador", code: "EC" },
//   { name: "Egypt", code: "EG" },
//   { name: "El Salvador", code: "SV" },
//   { name: "Equatorial Guinea", code: "GQ" },
//   { name: "Eritrea", code: "ER" },
//   { name: "Estonia", code: "EE" },
//   { name: "Eswatini", code: "SZ" },
//   { name: "Ethiopia", code: "ET" },
//   { name: "Fiji", code: "FJ" },
//   { name: "Finland", code: "FI" },
//   { name: "France", code: "FR" },
//   { name: "Gabon", code: "GA" },
//   { name: "Gambia", code: "GM" },
//   { name: "Georgia", code: "GE" },
//   { name: "Germany", code: "DE" },
//   { name: "Ghana", code: "GH" },
//   { name: "Greece", code: "GR" },
//   { name: "Grenada", code: "GD" },
//   { name: "Guatemala", code: "GT" },
//   { name: "Guinea", code: "GN" },
//   { name: "Guinea-Bissau", code: "GW" },
//   { name: "Guyana", code: "GY" },
//   { name: "Haiti", code: "HT" },
//   { name: "Honduras", code: "HN" },
//   { name: "Hungary", code: "HU" },
//   { name: "Iceland", code: "IS" },
//   { name: "India", code: "IN" },
//   { name: "Indonesia", code: "ID" },
//   { name: "Iran", code: "IR" },
//   { name: "Iraq", code: "IQ" },
//   { name: "Ireland", code: "IE" },
//   { name: "Israel", code: "IL" },
//   { name: "Italy", code: "IT" },
//   { name: "Ivory Coast", code: "CI" },
//   { name: "Jamaica", code: "JM" },
//   { name: "Japan", code: "JP" },
//   { name: "Jordan", code: "JO" },
//   { name: "Kazakhstan", code: "KZ" },
//   { name: "Kenya", code: "KE" },
//   { name: "Kiribati", code: "KI" },
//   { name: "Kuwait", code: "KW" },
//   { name: "Kyrgyzstan", code: "KG" },
//   { name: "Laos", code: "LA" },
//   { name: "Latvia", code: "LV" },
//   { name: "Lebanon", code: "LB" },
//   { name: "Lesotho", code: "LS" },
//   { name: "Liberia", code: "LR" },
//   { name: "Libya", code: "LY" },
//   { name: "Liechtenstein", code: "LI" },
//   { name: "Lithuania", code: "LT" },
//   { name: "Luxembourg", code: "LU" },
//   { name: "Madagascar", code: "MG" },
//   { name: "Malawi", code: "MW" },
//   { name: "Malaysia", code: "MY" },
//   { name: "Maldives", code: "MV" },
//   { name: "Mali", code: "ML" },
//   { name: "Malta", code: "MT" },
//   { name: "Marshall Islands", code: "MH" },
//   { name: "Mauritania", code: "MR" },
//   { name: "Mauritius", code: "MU" },
//   { name: "Mexico", code: "MX" },
//   { name: "Micronesia", code: "FM" },
//   { name: "Moldova", code: "MD" },
//   { name: "Monaco", code: "MC" },
//   { name: "Mongolia", code: "MN" },
//   { name: "Montenegro", code: "ME" },
//   { name: "Morocco", code: "MA" },
//   { name: "Mozambique", code: "MZ" },
//   { name: "Myanmar", code: "MM" },
//   { name: "Namibia", code: "NA" },
//   { name: "Nauru", code: "NR" },
//   { name: "Nepal", code: "NP" },
//   { name: "Netherlands", code: "NL" },
//   { name: "New Zealand", code: "NZ" },
//   { name: "Nicaragua", code: "NI" },
//   { name: "Niger", code: "NE" },
//   { name: "Nigeria", code: "NG" },
//   { name: "North Korea", code: "KP" },
//   { name: "North Macedonia", code: "MK" },
//   { name: "Norway", code: "NO" },
//   { name: "Oman", code: "OM" },
//   { name: "Pakistan", code: "PK" },
//   { name: "Palau", code: "PW" },
//   { name: "Panama", code: "PA" },
//   { name: "Papua New Guinea", code: "PG" },
//   { name: "Paraguay", code: "PY" },
//   { name: "Peru", code: "PE" },
//   { name: "Philippines", code: "PH" },
//   { name: "Poland", code: "PL" },
//   { name: "Portugal", code: "PT" },
//   { name: "Qatar", code: "QA" },
//   { name: "Romania", code: "RO" },
//   { name: "Russia", code: "RU" },
//   { name: "Rwanda", code: "RW" },
//   { name: "Saint Kitts and Nevis", code: "KN" },
//   { name: "Saint Lucia", code: "LC" },
//   { name: "Saint Vincent and the Grenadines", code: "VC" },
//   { name: "Samoa", code: "WS" },
//   { name: "San Marino", code: "SM" },
//   { name: "Sao Tome and Principe", code: "ST" },
//   { name: "Saudi Arabia", code: "SA" },
//   { name: "Senegal", code: "SN" },
//   { name: "Serbia", code: "RS" },
//   { name: "Seychelles", code: "SC" },
//   { name: "Sierra Leone", code: "SL" },
//   { name: "Singapore", code: "SG" },
//   { name: "Slovakia", code: "SK" },
//   { name: "Slovenia", code: "SI" },
//   { name: "Solomon Islands", code: "SB" },
//   { name: "Somalia", code: "SO" },
//   { name: "South Africa", code: "ZA" },
//   { name: "South Korea", code: "KR" },
//   { name: "South Sudan", code: "SS" },
//   { name: "Spain", code: "ES" },
//   { name: "Sri Lanka", code: "LK" },
//   { name: "Sudan", code: "SD" },
//   { name: "Suriname", code: "SR" },
//   { name: "Sweden", code: "SE" },
//   { name: "Switzerland", code: "CH" },
//   { name: "Syria", code: "SY" },
//   { name: "Taiwan", code: "TW" },
//   { name: "Tajikistan", code: "TJ" },
//   { name: "Tanzania", code: "TZ" },
//   { name: "Thailand", code: "TH" },
//   { name: "Timor-Leste", code: "TL" },
//   { name: "Togo", code: "TG" },
//   { name: "Tonga", code: "TO" },
//   { name: "Trinidad and Tobago", code: "TT" },
//   { name: "Tunisia", code: "TN" },
//   { name: "Turkey", code: "TR" },
//   { name: "Turkmenistan", code: "TM" },
//   { name: "Tuvalu", code: "TV" },
//   { name: "Uganda", code: "UG" },
//   { name: "Ukraine", code: "UA" },
//   { name: "United Arab Emirates", code: "AE" },
//   { name: "United Kingdom", code: "GB" },
//   { name: "United States", code: "US" },
//   { name: "Uruguay", code: "UY" },
//   { name: "Uzbekistan", code: "UZ" },
//   { name: "Vanuatu", code: "VU" },
//   { name: "Vatican City", code: "VA" },
//   { name: "Venezuela", code: "VE" },
//   { name: "Vietnam", code: "VN" },
//   { name: "Yemen", code: "YE" },
//   { name: "Zambia", code: "ZM" },
//   { name: "Zimbabwe", code: "ZW" },
// ];

export const countries = ct.getAllCountries();

// export const USERDASHBOARD_TIMEPERIODS = {
//   "Last week": "last_week",
//   "Last month": "last_month",
//   "Last 3 months": "last_3_months",
// };

export const USERDASHBOARD_TIMEPERIODS = {
  last_week: "Last week",
  last_month: "Last month",
  last_3_months: "Last 3 months",
};
