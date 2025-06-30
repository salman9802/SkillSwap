import React from "react";

import { cn } from "@/lib/utils";

const SkeletonLoader = ({
  ref,
  className,
}: React.HTMLAttributes<HTMLDivElement> &
  React.RefAttributes<HTMLDivElement>) => {
  return (
    <div
      ref={ref}
      className={cn("relative size-25 overflow-hidden bg-gray-100", className)}
    >
      {/* Shimmer effect bar */}
      <div className="animate-shimmer absolute inset-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white to-transparent"></div>
    </div>
  );
};

export default SkeletonLoader;
