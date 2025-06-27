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
  type MarketplaceFilter,
  type MarketplaceSortKeyType,
  type SkillswapRequestCardDataType,
} from "@/lib/types";
import { useSkillswapRequestMarketplaceQuery } from "@/features/skillswap-request/skillswapRequestApi";
import SkeletonLoader from "@/components/utils/SkeletonLoader";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/lib/hooks";
import { Link, useSearchParams } from "react-router-dom";

const MarketplacePage = () => {
  setPageTitle("Skills Marketplace - SkillSwap");

  const [sort, setSort] =
    React.useState<MarketplaceSortKeyType>("NEWEST_FIRST");
  // const [requests, setRequests] = React.useState<
  //   SkillswapRequestCardDataType[]
  // >([]);
  const [showFilters, setShowFilters] = React.useState(false); // For mobile

  const [searchParams, setSearchParams] = useSearchParams();

  // Filter query params
  const date = searchParams.get("date")
    ? new Date(searchParams.get("date") as string)
    : undefined;
  const offeredSkills = searchParams.get("offered-skills")
    ? searchParams.get("offered-skills")?.split(",")
    : undefined;
  const requestedSkill = searchParams.get(
    "requested-skill",
  ) as MarketplaceFilter["requestedSkill"];
  const offeredSkillQuery = searchParams.get("offered-skill-query");

  const [localOfferedSkillQuery, setLocalOfferedSkillQuery] = React.useState(
    offeredSkillQuery ? offeredSkillQuery : "",
  );

  const debouncedOfferedSkillQuery = useDebounce<string>(
    localOfferedSkillQuery,
    1000,
  );

  let {
    data: skillswapRequests,
    isLoading: isRequestsLoading,
    // isFetching: isRequestsFetching,
  } = useSkillswapRequestMarketplaceQuery({
    // ...filters,
    // date: filters?.date?.toISOString(),
    offeredSkills,
    requestedSkill,
    date: date?.toISOString(),
    offeredSkillQuery: debouncedOfferedSkillQuery,
  });

  const displayRequests = React.useMemo<
    SkillswapRequestCardDataType[] | undefined
  >(() => {
    if (skillswapRequests === undefined) return [];
    else {
      let requests = [...skillswapRequests.requests];
      if (sort === "OLDEST_FIRST") {
        requests.sort(
          (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
        );
      } else {
        requests.sort(
          (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
        );
      }
      return requests;
    }
  }, [sort, skillswapRequests]);

  /** useEffect to sync debounced value with state */
  React.useEffect(() => {
    setSearchParams((params) => {
      if (
        debouncedOfferedSkillQuery !== undefined &&
        debouncedOfferedSkillQuery.length > 0
      )
        params.set("offered-skill-query", debouncedOfferedSkillQuery);
      else params.delete("offered-skill-query");
      return params;
    });
  }, [debouncedOfferedSkillQuery]);

  return (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas">
        <SidebarContent className="bg-gray-100">
          <DesktopFilterSortControls
            // filters={filters}
            filters={{ offeredSkills, requestedSkill, date }}
            onFilterChange={(filter) => {
              // setFilters(filter);
              setSearchParams((params) => {
                if (filter.date) params.set("date", filter.date.toISOString());
                else params.delete("date");

                if (filter.offeredSkills && filter.offeredSkills.length > 0)
                  params.set("offered-skills", filter.offeredSkills.join(","));
                else params.delete("offered-skills");

                if (filter.requestedSkill && filter.requestedSkill.length > 0)
                  params.set("requested-skill", filter.requestedSkill);
                else params.delete("requested-skill");

                return params;
              });
            }}
            sort={sort}
            onSortChange={(sort) => {
              setSort(sort);
            }}
          />
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button
              onClick={() => {
                setSearchParams((params) => {
                  params.delete("date");
                  params.delete("offered-skills");
                  params.delete("requested-skill");
                  return params;
                });
              }}
              variant="primary-outline"
              className="cursor-pointer"
            >
              Reset
            </Button>
            {/* <Button onClick={handleFilter} className="cursor-pointer">
              Apply
            </Button> */}
          </div>
        </SidebarContent>
      </Sidebar>
      <div className="@container/sidebar-right flex grow flex-col gap-8">
        <div className="flex flex-col justify-center gap-3 px-6 py-3">
          {/* Search by offered skill */}
          <div className="relative mr-auto ml-24 flex w-2/3 items-center gap-1.5 [--pad:8px]">
            <Link
              to="/"
              className="text-primary mr-48 underline hover:no-underline"
            >
              Home
            </Link>
            <Input
              className="pr-[calc(var(--pad)+12px+1px+20px)]"
              placeholder="Search by offered skill..."
              // value={offeredSkillQuery}
              value={localOfferedSkillQuery}
              onChange={(e) => setLocalOfferedSkillQuery(e.target.value)}
            />
            <FaSearch className="absolute right-[var(--pad)] size-5 text-gray-600" />
          </div>

          {/* FilterSortControls (Mobile) */}
          <div className="md:hidden">
            <div className="mx-auto flex w-2/3 gap-3">
              <Sort
                onSortChange={(sort) => {
                  setSort(sort);
                }}
                className="border-none p-2"
              >
                <CgSortAz className="size-6" />
              </Sort>
              <div className="p-2 md:hidden">
                <Button onClick={() => setShowFilters((prev) => !prev)}>
                  <FaFilter className="size-5" />
                </Button>
              </div>
            </div>

            <div className="mt-6 flex w-2/3 items-center justify-center gap-3">
              <Button
                onClick={() => {
                  setSearchParams((params) => {
                    params.delete("date");
                    params.delete("offered-skills");
                    params.delete("requested-skill");
                    return params;
                  });
                }}
                variant="primary-outline"
                className="cursor-pointer"
              >
                Reset
              </Button>
              {/* <Button onClick={handleFilter} className="cursor-pointer">
                Apply
              </Button> */}
            </div>
          </div>

          {showFilters && (
            <Filters
              // filters={filters}
              filters={{ offeredSkills, requestedSkill, date }}
              className="border-b py-6"
              onFilterChange={(filter) => {
                // setFilters(filter);
                setSearchParams((params) => {
                  if (filter.date)
                    params.set("date", filter.date.toISOString());
                  else params.delete("date");

                  if (filter.offeredSkills && filter.offeredSkills.length > 0)
                    params.set(
                      "offered-skills",
                      filter.offeredSkills.join(","),
                    );
                  else params.delete("offered-skills");

                  if (filter.requestedSkill && filter.requestedSkill.length > 0)
                    params.set("requested-skill", filter.requestedSkill);
                  else params.delete("requested-skill");

                  return params;
                });
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

            {displayRequests !== undefined && displayRequests.length > 0 ? (
              displayRequests.map((skillswapRequest, i) => (
                <SkillswapRequestCard
                  key={i}
                  skillswapRequest={skillswapRequest}
                />
              ))
            ) : (
              <div className="text-lg font-light text-gray-800 md:text-xl lg:text-2xl">
                No requests found
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MarketplacePage;
