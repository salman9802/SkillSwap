import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import { MdExpandMore } from "react-icons/md";
import { ListHeader } from "./ListHeader";
import type { LogData } from "../types";

type AccordionListProps = {
  logs: LogData["logs"];
};

export const AccordionList = ({ logs }: AccordionListProps) => {
  return (
    <div className="flex flex-col gap-3 border border-gray-300 p-6 text-gray-600 lg:gap-6">
      <ListHeader />

      {/* {Array.from({ length: 10 }, (_, k) => ( */}
      {logs.map((log, k) => (
        <Accordion key={k} className="border border-gray-300 !shadow-none">
          <AccordionSummary
            className="!bg-gray-100"
            expandIcon={<MdExpandMore className="size-5" />}
          >
            <div className="flex w-full items-center justify-between font-medium">
              <div>{log.id}</div>
              <div>{log.type}</div>
              <div>{log.route}</div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="border-t border-gray-300">
            <div className="flex flex-col items-center gap-6 px-6 md:flex-row">
              <div className="grid grid-cols-2 gap-3">
                <span className="font-semibold">Admin ID:</span>
                <span>{log.adminId}</span>
                <span className="font-semibold">Admin Name:</span>
                <span>{log.admin ? log.admin.name : "NA"}</span>
                <span className="font-semibold">Timestamp:</span>
                <span>{log.timestamp.toLocaleString()}</span>
              </div>
              <div className="w-full flex-1">
                <span className="font-semibold">Metadata:</span>
                <pre className="mt-1 overflow-x-scroll rounded-lg bg-gray-900 p-1 text-white md:p-4">
                  {JSON.stringify(log.metadata, null, 2)}
                </pre>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
