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
import { useDebounce, useThrottleFn } from "@/lib/hooks";
import { Link, useSearchParams } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import type { StoreState } from "@/features/store";
import { useSelector } from "react-redux";
import { TiHome } from "react-icons/ti";

const MarketplacePage = () => {
  setPageTitle("Skills Marketplace - SkillSwap");

  const user = useSelector((state: StoreState) => state.session.user);

  const [sort, setSort] =
    React.useState<MarketplaceSortKeyType>("NEWEST_FIRST");
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
  const [offset, setOffset] = React.useState(0);
  const [requests, setRequests] = React.useState<
    SkillswapRequestCardDataType[]
  >([]);

  const debouncedOfferedSkillQuery = useDebounce<string>(
    localOfferedSkillQuery,
    1000,
  );

  let {
    data: skillswapRequests,
    isLoading: isRequestsLoading,
    isSuccess: isSkillswapMarketplaceSuccess,
    // isFetching: isRequestsFetching,
  } = useSkillswapRequestMarketplaceQuery({
    // ...filters,
    // date: filters?.date?.toISOString(),
    offeredSkills,
    requestedSkill,
    date: date?.toISOString(),
    offeredSkillQuery: debouncedOfferedSkillQuery,
    offset,
  });

  /** useEffect to sync `skillswapRequests.requests` with `requests` state */
  React.useEffect(() => {
    if (skillswapRequests !== undefined) {
      setRequests((r) => [...r, ...skillswapRequests.requests]);
    }
  }, [isSkillswapMarketplaceSuccess, offset]);

  /** useEffect for sorting requests */
  React.useEffect(() => {
    const sortedRequests = [...requests];
    if (sort === "OLDEST_FIRST") {
      sortedRequests.sort(
        (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
      );
    } else {
      sortedRequests.sort(
        (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
      );
    }
    setRequests(sortedRequests);
  }, [sort]);

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

  const isMobile = useIsMobile();

  const handleInfiniteScroll = React.useCallback(() => {
    const INF_SCROLL_OFFSET_PX = 300;
    const isNearPageEnd =
      window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - INF_SCROLL_OFFSET_PX;

    // console.log(
    //   "window.innerHeight + window.pageYOffset",
    //   window.innerHeight + window.pageYOffset,
    // );
    // console.log(
    //   "document.body.offsetHeight",
    //   document.body.offsetHeight - INF_SCROLL_OFFSET_PX,
    // );
    // console.log("isNearPageEnd", isNearPageEnd);
    if (isNearPageEnd) setOffset((o) => o + 1);
  }, []);

  const throttledHandleInfiniteScroll = useThrottleFn(handleInfiniteScroll);

  /** useEffect to add event listener for window's `scroll` event for infinite scroll pagination */
  React.useEffect(() => {
    if (skillswapRequests && requests.length < skillswapRequests?.totalCount)
      window.addEventListener("scroll", throttledHandleInfiniteScroll);
    return () => {
      if (skillswapRequests && requests.length < skillswapRequests?.totalCount)
        window.removeEventListener("scroll", throttledHandleInfiniteScroll);
    };
  }, []);

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
            <div className="mr-48 flex items-center gap-4">
              <Link
                to="/"
                className="text-primary flex items-center gap-3 underline hover:no-underline"
              >
                <TiHome className="size-5" /> Home
              </Link>
              {user?.coins && (
                <div className="flex items-center justify-start">
                  <img src="/coin.png" className="size-5" alt="" />
                  <span className="font-bold">{user?.coins}</span>
                </div>
              )}
            </div>
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
                <SkeletonLoader className="h-[50vh] w-full" key={i} />
              ))}

            {requests.length > 0 ? (
              <>
                {requests.map((skillswapRequest, i) => (
                  <SkillswapRequestCard
                    key={i}
                    skillswapRequest={skillswapRequest}
                  />
                ))}
                {/* Trailing loaders */}
                {skillswapRequests &&
                  requests.length < skillswapRequests?.totalCount &&
                  Array.from({ length: isMobile ? 1 : 4 }, (_, i) => (
                    <SkeletonLoader className="h-[50vh] w-full" key={i} />
                  ))}
              </>
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
