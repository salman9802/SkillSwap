import React from "react";

import Input from "@src/components/ui/Input";
import { AccordionList, ListPagination } from "@src/features/user-log";

export const UserLog = () => {
  return (
    <div className="flex flex-col gap-12 p-3 py-12 md:p-6 lg:mx-auto lg:w-3/4">
      <div className="">
        <Input className="w-full" placeholder="Search" />
      </div>

      <AccordionList />
      <ListPagination />
    </div>
  );
};
