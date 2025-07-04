import React from "react";
import { Link } from "react-router-dom";

import { Button } from "./ui/button";
import FloatingPiecesBg from "./FloatingPiecesBg";

const PuzzlePieceImage: React.FC<
  React.ImgHTMLAttributes<HTMLImageElement> & {
    text: string;
  }
> = ({ text, className, ...rest }) => {
  return (
    <div style={rest.style} className="">
      <div className={`relative ${className}`}>
        <img className="size-50 object-contain" {...rest} style={{}} />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {text}
        </span>
      </div>
    </div>
  );
};

const HeroImage: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 p-2">
        {/* <img
          className="size-40 -rotate-6 object-contain"
          src="TL-piece.png"
          alt=""
        />
        <img
          className="size-40 rotate-6 object-contain"
          src="TR-piece.png"
          alt=""
        /> */}
        <PuzzlePieceImage
          text="Yoga"
          style={
            {
              // animation: "bounce 2s ease-in-out infinite",
            }
          }
          className="animate-bounce [--rotation:-6deg]"
          src="TL-piece.png"
        />
        <PuzzlePieceImage
          text="Cooking"
          style={
            {
              // animation: "bounce 2s ease-in-out infinite",
            }
          }
          className="animate-bounce delay-100 [--rotation:6deg]"
          src="TR-piece.png"
        />
      </div>

      <div className="flex gap-2 p-2">
        {/* <img
          className="size-40 -rotate-3 object-contain"
          src="BL-piece.png"
          alt=""
        />
        <img
          className="size-40 rotate-3 object-contain"
          src="BR-piece.png"
          alt=""
        /> */}
        <PuzzlePieceImage
          text="Guitar"
          style={
            {
              // animation: "bounce 2s ease-in-out infinite",
            }
          }
          className="animate-bounce delay-200 [--rotation:-3deg]"
          src="BL-piece.png"
        />
        <PuzzlePieceImage
          text="Programming"
          style={
            {
              // animation: "bounce 2s ease-in-out infinite",
            }
          }
          className="animate-bounce delay-300 [--rotation:3deg]"
          src="BR-piece.png"
        />
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="text-gray-600">
      <div className="container mx-auto flex flex-col items-center px-5 py-24 md:flex-row">
        <div className="mb-16 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-16 md:text-left lg:flex-grow lg:pr-24">
          <h1 className="title-font mb-4 text-3xl font-medium text-gray-900 sm:text-4xl">
            Trade Skills, Build Futures.
          </h1>
          <p className="mb-8 leading-relaxed">
            SkillSwap connects people who want to learn with those who love to
            teach. Whether you're swapping photography tips for coding lessons
            or trading language skills for guitar chords, SkillSwap makes
            learning personal, affordable, and community-driven. Start
            exchanging knowledge today—no money required, just passion.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/user/login">
              <Button className="cursor-pointer px-12 py-6 text-lg">
                Join now
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button
                className="cursor-pointer px-12 py-6 text-lg"
                variant="primary-outline"
              >
                Visit marketplace
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-5/6 md:w-1/2 lg:w-full lg:max-w-lg">
          {/* <img
            className="scale-150 rounded-full object-center mix-blend-multiply"
            alt="hero"
            src="hero2.avif"
            //   style="mask-image: radial-gradient(circle, white 50%, transparent 100%);
            //  -webkit-mask-image: radial-gradient(circle, white 50%, transparent 100%);"
            style={{
              maskImage: "radial-gradient(circle, white 10%, transparent 60%)",
              WebkitMaskImage:
                "radial-gradient(circle, white 50%, transparent 100%)",
            }}
          /> */}
          <HeroImage />
        </div>
      </div>
    </section>
  );
};

export default Hero;
