import React from "react";

import { Pagination, PaginationItem } from "@mui/material";
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
      <Pagination
        defaultPage={1}
        page={page}
        onChange={(_, page) => {
          setPage(page);
        }}
        count={total}
        shape="rounded"
      />
    </div>
  );
};
