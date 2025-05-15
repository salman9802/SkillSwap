import { cn } from "@/lib/utils";
import type React from "react";

type ComponentProps = React.PropsWithChildren & {
  className?: string;
};

const Title = ({ children, className }: ComponentProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

const Content = ({ children, className }: ComponentProps) => {
  return <div className={cn("border-t", className)}>{children}</div>;
};

const Section = ({ children, className }: ComponentProps) => {
  return <div className={cn("flex flex-col gap-6", className)}>{children}</div>;
};

Section.Title = Title;
Section.Content = Content;

export default Section;
