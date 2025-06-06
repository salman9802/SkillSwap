import React from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import { CgSortAz } from "react-icons/cg";

import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  DesktopFilterSortControls,
  Filters,
  Sort,
} from "@/components/user/FilterSortControls";
import { Input } from "@/components/ui/input";
import { setPageTitle } from "@/lib/utils";

import SkillswapRequestCard from "@/components/user/SkillswapRequestCard";
import {
  MarketplaceSort,
  type MarketplaceFilter,
  type MarketplaceSortType,
} from "@/lib/types";
import { useSkillswapRequestMarketplaceQuery } from "@/features/skillswap-request/skillswapRequestApi";
import SkeletonLoader from "@/components/utils/SkeletonLoader";
import { Button } from "@/components/ui/button";

const MarketplacePage = () => {
  setPageTitle("Skills Marketplace - SkillSwap");

  const [filters, setFilters] = React.useState<MarketplaceFilter | undefined>();
  const [sort, setSort] = React.useState<MarketplaceSortType>(
    MarketplaceSort.NEWEST_FIRST,
  );

  // For mobile
  const [showFilters, setShowFilters] = React.useState(false);

  const { data: skillswapRequests, isLoading: isRequestsLoading } =
    useSkillswapRequestMarketplaceQuery();

  const handleSortFilter = () => {
    // TODO: request to server
    console.log(`sort: ${sort}`);
    console.dir(filters);
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas">
        <SidebarContent className="bg-gray-100">
          <DesktopFilterSortControls
            onFilterChange={(filter) => {
              setFilters(filter);
            }}
            sort={sort}
            onSortChange={(sort) => {
              setSort(sort);
            }}
          />
          <div className="mx-auto mt-6 flex items-center gap-3">
            <Button
              onClick={() => {
                setSort(MarketplaceSort.NEWEST_FIRST);
                setFilters(undefined);
              }}
              variant="ghost"
              className="cursor-pointer"
            >
              Reset
            </Button>
            <Button onClick={handleSortFilter} className="cursor-pointer">
              Apply
            </Button>
          </div>
        </SidebarContent>
      </Sidebar>
      <div className="@container/sidebar-right flex grow flex-col gap-8">
        <div className="flex flex-col justify-center gap-3 px-6 py-3">
          {/* Search by offered skill */}
          <div className="relative mx-auto flex w-2/3 items-center gap-1.5 [--pad:8px]">
            <Input
              className="pr-[calc(var(--pad)+12px+1px+20px)]"
              placeholder="Search by offered skill..."
            />
            <FaSearch className="absolute right-[var(--pad)] size-5 text-gray-600" />
          </div>

          {/* FilterSortControls (Mobile) */}
          <div className="mx-auto flex w-2/3 gap-3">
            <Sort
              onSortChange={(sort) => {
                setSort(sort);
              }}
              className="border-none p-2 md:hidden"
            >
              <CgSortAz className="size-6" />
            </Sort>
            <div className="p-2 md:hidden">
              <Button onClick={() => setShowFilters((prev) => !prev)}>
                <FaFilter className="size-5" />
              </Button>
            </div>
          </div>
          <div className="mx-auto mt-6 flex w-2/3 items-center gap-3">
            <Button
              onClick={() => {
                setSort(MarketplaceSort.NEWEST_FIRST);
                setFilters(undefined);
              }}
              variant="ghost"
              className="cursor-pointer"
            >
              Reset
            </Button>
            <Button onClick={handleSortFilter} className="cursor-pointer">
              Apply
            </Button>
          </div>

          {showFilters && (
            <Filters
              className="border-b py-6"
              onFilterChange={(filter) => {
                setFilters(filter);
              }}
            />
          )}
        </div>
        <div className="mx-auto flex w-full flex-col gap-6 px-6 py-3 2xl:w-11/12">
          <h2 className="text-xl font-medium md:text-2xl lg:text-4xl">
            Skill Requests{" "}
            <span className="text-lg font-light md:text-xl lg:text-2xl">
              {isRequestsLoading ? (
                <SkeletonLoader className="inline-block h-lh rounded-full" />
              ) : (
                <span>({skillswapRequests?.totalCount} results)</span>
              )}
            </span>
          </h2>
          <div className="grid grid-cols-1 gap-3 @xl/sidebar-right:grid-cols-2 @4xl/sidebar-right:grid-cols-3 @5xl/sidebar-right:grid-cols-4">
            {/* :@max-md/sidebar-right */}

            {isRequestsLoading &&
              Array.from({ length: 12 }, (_, i) => (
                <SkeletonLoader className="h-[25vh] w-full" key={i} />
              ))}

            {skillswapRequests?.requests &&
              skillswapRequests.requests.map((skillswapRequest, i) => (
                <SkillswapRequestCard
                  key={i}
                  skillswapRequest={skillswapRequest}
                />
              ))}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MarketplacePage;
