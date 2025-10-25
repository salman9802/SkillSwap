import React from "react";

import Button from "@src/components/ui/Button";
import Input from "@src/components/ui/Input";

type ChangePasswordProps = {
  onSave: (newPassword: string) => any;
  onClose: () => any;
};

export const ChangePassword = ({ onSave, onClose }: ChangePasswordProps) => {
  const [newPassword, setNewPassword] = React.useState("");

  return (
    <div className="mx-auto grid grid-cols-1 gap-6 bg-white p-6 lg:p-24">
      <Input
        className="w-full focus:outline-black"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Button onClick={() => onSave(newPassword)} variant="invert-secondary">
        Save
      </Button>
      <Button onClick={onClose} variant="secondary">
        Cancel
      </Button>
    </div>
  );
};
