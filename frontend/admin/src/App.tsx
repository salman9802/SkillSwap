import React from "react";
import { RouterProvider } from "react-router";

import { router } from "./routes/routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient";

const App = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
