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
  type MarketplaceSortKeyType,
} from "@/lib/types";
import DateTimePicker from "../utils/DateTimePicker";
import { useFetchDetailsQuery } from "@/features/account/accountApi";
import SkeletonLoader from "../utils/SkeletonLoader";

type SortControl = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
> & {
  onSortChange: (sort: MarketplaceSortKeyType) => void;
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
        {Object.entries(MarketplaceSort).map(([k, v], i) => (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onSortChange(k as MarketplaceSortKeyType)}
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
  filters: MarketplaceFilter | undefined;
  onFilterChange: (filter: MarketplaceFilter) => void;
};

export const Filters = ({
  filters,
  onFilterChange,
  className,
}: FilterControl) => {
  const { data, isLoading: isLoadingData } = useFetchDetailsQuery();
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <h2 className="text-2xl font-bold">Filters</h2>
      {/* Availability */}
      <div className="grid gap-4">
        <div className="font-semibold">Availability</div>
        <DateTimePicker
          date={filters?.date}
          onValueChange={(date) => onFilterChange({ ...filters, date })}
          className="w-fit [&>*]:cursor-pointer"
        />
      </div>
      {/* Skills Offered */}
      <div className="grid gap-4">
        <div className="font-semibold">Skills offered</div>
        {!data ? (
          <div className="bg-white p-3">
            <SkeletonLoader className="w-full" />
          </div>
        ) : (
          <ToggleGroup
            className="[&>*]:cursor-pointer"
            options={data.user.requestedSkills}
            selected={
              filters && filters.offeredSkills ? filters.offeredSkills : []
            }
            onChange={(selection) => {
              onFilterChange({
                ...filters,
                offeredSkills: selection,
              });
            }}
          />
        )}
      </div>
      {/* Skills Requested */}
      <div className="grid gap-4">
        <div className="font-semibold">Skills requested</div>
        {!data ? (
          <div className="bg-white p-3">
            <SkeletonLoader className="w-full" />
          </div>
        ) : (
          <ToggleGroup
            className="[&>*]:cursor-pointer"
            options={data.user.offeredSkills}
            selected={
              filters && filters.requestedSkill ? [filters.requestedSkill] : []
            }
            onChange={(selection) => {
              onFilterChange({
                ...filters,
                requestedSkill: selection[0],
              });
            }}
          />
        )}
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
  filters,
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
          {MarketplaceSort[sort as MarketplaceSortKeyType]}
          <FaSort />
        </Sort>
      </div>
      <Filters filters={filters} onFilterChange={onFilterChange} />
    </div>
  );
};
