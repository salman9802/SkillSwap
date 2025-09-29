import React from "react";

import Input from "@src/components/ui/Input";
import { Row, RowHeader } from "@src/features/user-management";

const UserManagement = () => {
  return (
    <div className="flex flex-col gap-12 p-6 py-12 lg:mx-auto lg:w-3/4">
      <div className="">
        <Input className="w-full" placeholder="Search" />
      </div>

      <div className="flex flex-col divide-y divide-gray-300 border border-gray-300 text-gray-600 [&>*]:py-3">
        <RowHeader />
        {Array.from({ length: 10 }, (_, k) => (
          <Row key={k} />
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
