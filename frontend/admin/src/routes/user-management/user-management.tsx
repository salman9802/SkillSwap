import React from "react";

import Input from "@src/components/ui/Input";
import {
  Row,
  RowHeader,
  useFetchUsersQuery,
} from "@src/features/user-management";
import { GlobalLoader } from "@src/components/feedback/GlobalLoader";

const UserManagement = () => {
  const { data: users, isError, isLoading } = useFetchUsersQuery();

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <GlobalLoader />
      </div>
    );
  if (isError || !users) throw new Error("Couldn't load users");

  return (
    <div className="flex flex-col gap-12 p-6 py-12 lg:mx-auto lg:w-3/4">
      <div className="">
        <Input className="w-full" placeholder="Search" />
      </div>

      <div className="flex flex-col divide-y divide-gray-300 border border-gray-300 text-gray-600 [&>*]:py-3">
        <RowHeader />
        {users.map((user, k) => (
          <Row key={k} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
