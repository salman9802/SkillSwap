import React from "react";

import { Button } from "@/components/ui/button";
import { FaCalendarAlt } from "react-icons/fa";
import ToggleGroup from "./ToggleGroup";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type SortPropsType = React.PropsWithChildren & {
  className?: string;
};

const Sort = ({ children, className }: SortPropsType) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn("cursor-pointer border bg-gray-50 px-4 py-2", className)}
      >
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Sort by: Most recent</DropdownMenuItem>
        <DropdownMenuItem>Sort by: Oldest - Newest</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Filters = () => {
  const [offerSkills, setOfferSkills] = React.useState<string[]>([]);
  const [requestSkills, setRequestSkills] = React.useState<string[]>([]);
  return (
    <>
      <h2 className="text-2xl font-bold">Filters</h2>
      {/* Date & Time */}
      {/* TODO: add `Calendar` component in `Modal` or `Popover` */}
      <div className="grid gap-4">
        <div className="font-semibold">Date & Time</div>
        <Button variant="primary-outline" className="cursor-pointer">
          <FaCalendarAlt className="size-5" />
        </Button>
      </div>
      {/* Skills Offered by you */}
      <div className="grid gap-4">
        <div className="font-semibold">Skills offered by you</div>
        <ToggleGroup
          options={["React", "Node.js", "Tailwind CSS", "Prisma", "Express"]}
          selected={offerSkills}
          onChange={setOfferSkills}
        />
      </div>
      {/* Skills Requested by you */}
      <div className="grid gap-4">
        <div className="font-semibold">Skills requested by you</div>
        <ToggleGroup
          options={["MongoDB", "MySQL", "Javascript", "Typescript"]}
          selected={requestSkills}
          onChange={setRequestSkills}
        />
      </div>
    </>
  );
};

type FiltersPropsType = React.HTMLAttributes<HTMLDivElement>;

const FilterSortControls = ({ className }: FiltersPropsType) => {
  return (
    <div className={cn("flex flex-col gap-8 bg-gray-100 px-6 py-3", className)}>
      <h2 className="text-2xl font-bold">Sort</h2>
      <div className="grid gap-4">
        <Sort>Sort by: Most recent</Sort>
        {/* <div className="font-semibold">Date & Time</div>
        <Button variant="primary-outline" className="cursor-pointer">
          <FaCalendarAlt className="size-5" />
        </Button> */}
      </div>
      <Filters />
    </div>
  );
};

FilterSortControls.Sort = Sort;
FilterSortControls.Filters = Filters;

export default FilterSortControls;
