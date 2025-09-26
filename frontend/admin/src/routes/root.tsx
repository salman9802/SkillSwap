import React from "react";

import Input from "@src/components/ui/Input";
import Button from "@src/components/ui/Button";
import LoginForm from "@src/features/auth/components/LoginForm";
import Login from "./login/login";

const Root = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      {/* Root */}
      {/* <Button variant="invert-secondary">button</Button> */}
      {/* <Input
        invalid={true}
        placeholder="Mobile No."
        className="border-x-0 border-t-0 border-b focus:outline-none"
      /> */}
      <Login />
    </div>
  );
};

export default Root;
