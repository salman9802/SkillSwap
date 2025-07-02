import { FEATURES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import FloatingPiecesBg from "./FloatingPiecesBg";

const Features = () => {
  return (
    <section className="text-primary">
      {/* <FloatingPiecesBg
        puzzlePieces={[
          { top: "12%", left: "60%", delay: "1.5s", size: "3.2rem" },
          { top: "65%", left: "10%", delay: "2.8s", size: "4rem" },
          { top: "80%", left: "50%", delay: "0.5s", size: "2.8rem" },
          { top: "45%", left: "75%", delay: "3.2s", size: "3.6rem" },
          { top: "25%", left: "5%", delay: "4.5s", size: "3rem" },
          { top: "55%", left: "88%", delay: "2.3s", size: "3.3rem" },
          { top: "38%", left: "30%", delay: "1.8s", size: "2.7rem" },
          { top: "68%", left: "65%", delay: "0s", size: "3.9rem" },
          { top: "15%", left: "45%", delay: "1.2s", size: "3.1rem" },
          { top: "90%", left: "80%", delay: "3.8s", size: "2.6rem" },
        ]}
      /> */}
      <div className="container mx-auto px-5 pt-24">
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
