import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
} from "@/components/ui/sidebar";
import FilterSortControls from "@/components/user/FilterSortControls";
import { Input } from "@/components/ui/input";
import { FaFilter, FaSearch } from "react-icons/fa";
import { CgSortAz } from "react-icons/cg";
import { setPageTitle } from "@/lib/utils";

import requestsJSON from "../../__data/requests.json";
import RequestCard from "@/components/user/RequestCard";
import type { RequestCardDataType } from "@/lib/types";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// NOTE: Mock data
const requests = requestsJSON as RequestCardDataType[];

const MarketplacePage = () => {
  setPageTitle("Skills Marketplace - SkillSwap");
  return (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas">
        <SidebarContent>
          <FilterSortControls className="grow" />
        </SidebarContent>
      </Sidebar>
      <div className="@container/sidebar-right flex grow flex-col gap-8">
        <div className="flex justify-center gap-3 px-6 py-3">
          {/* Search */}
          <div className="relative mx-auto flex w-2/3 items-center gap-1.5 [--pad:8px]">
            <Input
              className="pr-[calc(var(--pad)+12px+1px+20px)]"
              placeholder="Search"
            />
            <FaSearch className="absolute right-[var(--pad)] size-5 text-gray-600" />
          </div>
          {/* Filters + Sort (Mobile) */}
          <FilterSortControls.Sort className="ml-auto p-2 md:hidden">
            <CgSortAz className="size-5" />
          </FilterSortControls.Sort>
          <div className="ml-auto border p-2 md:hidden">
            <Dialog>
              <DialogTrigger>
                <FaFilter className="size-5" />
              </DialogTrigger>
              <DialogContent>
                <FilterSortControls.Filters />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex flex-col gap-6 px-6 py-3">
          <h2 className="text-xl font-medium md:text-2xl lg:text-4xl">
            Skill Requests{" "}
            <span className="text-lg font-light md:text-xl lg:text-2xl">
              (500 results)
            </span>
          </h2>
          <div className="grid grid-cols-1 gap-3 @xl/sidebar-right:grid-cols-2 @4xl/sidebar-right:grid-cols-3 @5xl/sidebar-right:grid-cols-4">
            {/* :@max-md/sidebar-right */}
            {/* FIXME - Refactor RequestCard */}
            {requests.map((request, i) => (
              <RequestCard key={i} request={request} />
            ))}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MarketplacePage;
