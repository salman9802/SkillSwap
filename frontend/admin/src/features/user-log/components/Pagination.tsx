import React from "react";

import { Pagination, PaginationItem } from "@mui/material";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";

export const ListPagination = () => {
  return (
    <div className="mx-auto">
      <Pagination
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
      />
    </div>
  );
};
