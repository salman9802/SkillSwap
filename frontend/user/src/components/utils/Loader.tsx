import { cn } from "@/lib/utils";
import React from "react";

const Loader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        `border-b-primary loader inline-block size-12 rounded-full border-4`,
        className,
      )}
      {...props}
    ></div>
  );
};

export default Loader;
