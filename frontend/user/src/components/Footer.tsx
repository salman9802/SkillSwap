import React from "react";

import { SOCIALS } from "@/lib/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Footer = () => {
  const footerRef = React.useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.from(footerRef.current, {
      // y: 100,
      opacity: 0,
      scrollTrigger: {
        trigger: footerRef.current,
        start: "center bottom",
      },

      duration: 1.8,
      // delay: 0.2,
    });
  }, []);

  return (
    <footer ref={footerRef} className="text-gray-600">
      <div className="container mx-auto flex flex-col items-center px-5 py-8 sm:flex-row">
        {/* <a className="title-font flex items-center justify-center font-medium text-gray-900 md:justify-start"> */}
        <span className="custom-gradient ml-3 text-2xl font-semibold">
          SkillSwap
        </span>
        {/* </a> */}
        <p className="mt-4 text-sm text-gray-500 sm:mt-0 sm:ml-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:pl-4">
          © {new Date().getFullYear()} SkillSwap —
          <a
            href="https://github.com/salman9802/"
            className="ml-1 text-gray-900"
            rel="noopener noreferrer"
            target="_blank"
          >
            @salman
          </a>
        </p>

        <span className="mt-4 inline-flex justify-center sm:mt-0 sm:ml-auto sm:justify-start">
          {SOCIALS.map((social, i) => (
            <a
              key={i}
              href={social.url}
              rel="noopener noreferrer"
              target="_blank"
              className="ml-3 text-gray-500 hover:text-gray-800"
            >
              {social.icon}
            </a>
          ))}
        </span>
        {/* <span className="mt-4 inline-flex justify-center sm:mt-0 sm:ml-auto sm:justify-start">
          <a
            href=""
            rel="noopener noreferrer"
            target="_blank"
            className="ml-3 text-gray-500"
          >
            <svg
              fill="currentColor"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="0"
              className="h-5 w-5"
              viewBox="0 0 24 24"
            >
              <path
                stroke="none"
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              ></path>
              <circle cx="4" cy="4" r="2" stroke="none"></circle>
            </svg>
          </a>
        </span> */}
      </div>
    </footer>
  );
};

export default Footer;
