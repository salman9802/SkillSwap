import React from "react";

import { FEATURES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import FloatingPiecesBg from "./FloatingPiecesBg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Features = () => {
  const featuresRef = React.useRef<null | HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(featuresRef.current, {
      y: 100,
      opacity: 0,
      scrollTrigger: {
        trigger: featuresRef.current,
        // start: "top 50%",
        start: "top center",
      },

      duration: 1.8,
    });
  }, []);

  return (
    <section className="text-primary">
      <div ref={featuresRef} className="container mx-auto px-5 pt-24">
        {/* Feature */}
        {FEATURES.map((feature, i) => (
          <div
            key={i}
            className={cn(
              "mx-auto mb-10 flex flex-col items-center border-b border-gray-200 pb-10 sm:flex-row lg:w-3/5",
              feature.reverse && "sm:flex-row-reverse",
            )}
          >
            <div className="bg-primary/10 flex size-20 shrink-0 items-center justify-center rounded-full sm:mr-10 sm:size-32">
              {feature.icon}
              {/* <TbArrowsExchange className="size-10 sm:size-16" /> */}
            </div>
            <div className="mt-6 flex-grow text-center sm:mt-0 sm:text-left">
              <h2 className="title-font mb-2 text-lg font-medium text-gray-900">
                {feature.name}
              </h2>
              <p className="text-base leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
