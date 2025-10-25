import React from "react";

import { Pagination, PaginationItem, Stack } from "@mui/material";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";

type ListPaginationProps = {
  page: number;
  setPage: (page: number) => any;
  total: number;
};

export const ListPagination = ({
  page,
  setPage,
  total,
}: ListPaginationProps) => {
  return (
    <div className="mx-auto">
      {/* <Pagination
        count={10}
        renderItem={(item) => (
          <PaginationItem
            slots={{
              previous: IoArrowBackCircleOutline,
              next: IoArrowForwardCircleOutline,
            }}
            {...item}
          />
        )}
      /> */}
      <Pagination
        defaultPage={1}
        page={page}
        onChange={(e, page) => {
          setPage(page);
        }}
        count={total}
        shape="rounded"
      />
    </div>
  );
};
