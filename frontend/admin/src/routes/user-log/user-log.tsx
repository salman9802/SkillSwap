import React from "react";

import Input from "@src/components/ui/Input";
import { AccordionList, ListPagination, useLogs } from "@src/features/user-log";
import { GlobalLoader } from "@src/components/feedback/GlobalLoader";

export const UserLog = () => {
  const [page, setPage] = React.useState(1);

  const { data, isError, isLoading } = useLogs(page);

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <GlobalLoader />
      </div>
    );
  if (isError || !data) throw new Error("Couldn't load logs");

  return (
    <div className="flex flex-col gap-12 p-3 py-12 md:p-6 lg:mx-auto lg:w-3/4">
      <div className="">
        <Input className="w-full" placeholder="Search" />
      </div>

      <AccordionList logs={data.logs} />
      <ListPagination page={page} setPage={setPage} total={data.total} />
    </div>
  );
};
