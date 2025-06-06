import React from "react";
import { FaSort } from "react-icons/fa";

import ToggleGroup from "./ToggleGroup";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  MarketplaceSort,
  type MarketplaceFilter,
  type MarketplaceSortType,
} from "@/lib/types";
import DateTimePicker from "../utils/DateTimePicker";

type SortControl = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
> & {
  onSortChange: (sort: MarketplaceSortType) => void;
};

export const Sort = ({ children, className, onSortChange }: SortControl) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex w-fit cursor-pointer items-center justify-center gap-3 border bg-gray-50 px-4 py-2",
          className,
        )}
      >
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.values(MarketplaceSort).map((v, i) => (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onSortChange(v)}
            key={i}
          >
            {v}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type FilterControl = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
> & {
  onFilterChange: (filter: MarketplaceFilter) => void;
};

export const Filters = ({ onFilterChange, className }: FilterControl) => {
  const [filter, setFilter] = React.useState<MarketplaceFilter>();

  React.useEffect(() => {
    if (filter) onFilterChange(filter);
  }, [filter]);

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <h2 className="text-2xl font-bold">Filters</h2>
      {/* Date & Time */}
      <div className="grid gap-4">
        <div className="font-semibold">Date & Time</div>
        <DateTimePicker
          date={filter?.date}
          onValueChange={(date) =>
            setFilter((prev) => ({
              ...prev,
              date,
            }))
          }
          className="w-fit [&>*]:cursor-pointer"
        />
      </div>
      {/* Skills Offered by you */}
      <div className="grid gap-4">
        <div className="font-semibold">Skills offered by you</div>
        <ToggleGroup
          className="[&>*]:cursor-pointer"
          options={["React", "Node.js", "Tailwind CSS", "Prisma", "Express"]}
          selected={filter && filter.offeredSkills ? filter.offeredSkills : []}
          onChange={(selection) => {
            setFilter((prev) => ({
              ...prev,
              offeredSkills: selection,
            }));
          }}
        />
      </div>
      {/* Skills Requested by you */}
      <div className="grid gap-4">
        <div className="font-semibold">Skills requested by you</div>
        <ToggleGroup
          className="[&>*]:cursor-pointer"
          options={["MongoDB", "MySQL", "Javascript", "Typescript"]}
          selected={
            filter && filter.requestedSkill ? [filter.requestedSkill] : []
          }
          onChange={(selection) => {
            setFilter((prev) => ({
              ...prev,
              requestedSkill: selection[0],
            }));
          }}
        />
      </div>
    </div>
  );
};

type FilterSortControlsPropType = React.HTMLAttributes<HTMLDivElement> &
  FilterControl &
  SortControl;

export const DesktopFilterSortControls = ({
  className,
  sort,
  onSortChange,
  onFilterChange,
}: FilterSortControlsPropType & {
  sort: React.ReactNode;
}) => {
  return (
    <div className={cn("flex flex-col gap-8 bg-gray-100 px-6 py-3", className)}>
      <h2 className="text-2xl font-bold">Sort</h2>
      <div className="grid gap-4">
        <Sort onSortChange={onSortChange}>
          {sort}
          <FaSort />
        </Sort>
      </div>
      <Filters onFilterChange={onFilterChange} />
    </div>
  );
};
