import React from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "./ui/button";

const Gamification = () => {
  const gamificationSectionRef = React.useRef<null | HTMLElement>(null);

  useGSAP(() => {
    gsap.from(gamificationSectionRef.current, {
      y: 50,
      opacity: 0,
      scrollTrigger: {
        trigger: gamificationSectionRef.current,
        start: "top center",
      },
      duration: 1.8,
    });
  }, []);

  return (
    <section
      ref={gamificationSectionRef}
      className="container mx-auto flex w-full flex-col justify-center gap-12 px-5 pt-24 lg:flex-row"
    >
      {/* desc */}
      <div className="flex flex-col gap-6 text-lg">
        <h1 className="flex items-center gap-3 text-2xl font-semibold">
          <img src="/coin.png" alt="coin" className="size-10" /> Swap coins —
          Power your learning
        </h1>
        <p className="md:w-[40ch]">
          Swap Coins are at the heart of how you create and join sessions on the
          platform.
        </p>
        <div className="flex flex-col gap-3 pl-12">
          <p className="md:w-[50ch]">
            <span className="font-semibold">📅 Earn Daily: </span>Log in each
            day to collect free coins.
          </p>
          <p className="md:w-[50ch]">
            <span className="font-semibold">🔄 Join sessions</span>
            Gain coins by participating in sessions.
          </p>
          <p className="md:w-[50ch]">
            <span className="font-semibold">💡 Create sessions: </span>
            Can't find appropriate session? Create your own session based on
            your preference.
          </p>
        </div>
        <Button className="mx-auto w-fit cursor-pointer px-12 py-6">
          Start Swapping Today!
        </Button>
      </div>
      {/* image */}
      {/* <img src="/gamification.png" alt="gamification" className="" /> */}
      <div className="perspective-1000">
        <div className="overflow-hidden rounded-xl shadow-2xl">
          <img
            src="/gamification.png"
            alt="SkillSwap Dashboard"
            className="inline-block h-auto w-full -rotate-x-6 rotate-y-12 rotate-z-6 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Gamification;
