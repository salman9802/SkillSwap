import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

import Input from "@src/components/ui/Input";
import { Row, RowHeader } from "@src/features/admin-management";

const AdminManagement = () => {
  return (
    <div className="flex flex-col gap-12 p-6 py-12 lg:mx-auto lg:w-3/4">
      <div className="">
        <Input className="w-full" placeholder="Search" />
      </div>
      {/* <table className="table-auto border-collapse border border-gray-400 text-gray-600">
        <thead className="font-semibold">
          <tr>
            <th className="p-2 text-left">
              <input type="checkbox" />
            </th>
            <th className="w-full grow p-2">Email</th>
            <th className="p-2 text-left">Actions 🔻</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            <td className="p-2 text-left">
              <input type="checkbox" />
            </td>
            <td className="p-2 text-left">gubpoi</td>
            <td className="p-2 text-left">Actions 🔻</td>
          </tr>
        </tbody>
      </table> */}

      <div className="flex flex-col divide-y divide-gray-300 border border-gray-300 text-gray-600 [&>*]:py-3">
        {/* <div className="flex items-center justify-between gap-6 bg-gray-100 font-semibold">
          <input className="flex-1 text-left accent-black" type="checkbox" />
          <span className="flex-1 text-left">Name</span>
          <span className="flex flex-1 cursor-pointer items-center gap-3 text-left">
            <span>Actions</span>
            <RiArrowDropDownLine className="size-5" />
          </span>
        </div> */}
        <RowHeader />
        {Array.from({ length: 10 }, (_, k) => (
          <Row key={k} />
        ))}
      </div>
    </div>
  );
};

export default AdminManagement;
