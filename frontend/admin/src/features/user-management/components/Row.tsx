import React from "react";
import { ListItemIcon, Menu, MenuItem, Modal } from "@mui/material";
import { MdDelete, MdOutlinePassword } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TbLock, TbLockOpen } from "react-icons/tb";

import { queryClient } from "@src/api/queryClient";
import { queryKeys } from "@src/api/queryKeys";
import {
  useActivateAccountMutation,
  useChangePassword,
  useDeactivateAccountMutation,
} from "../hooks";
import type { User } from "../types";
import { ChangePassword } from "./ChangePassword";

type RowProps = {
  user: User;
};

export const Row = ({ user }: RowProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { mutateAsync: changePassword } = useChangePassword(user.id);
  const handleChangePassword = async (newPassword: string) => {
    setIsModalOpen(false);
    try {
      const success = await changePassword(
        newPassword.length === 0 ? undefined : newPassword,
      );
      if (success) alert("Success!");
      else alert("Failed");
    } catch (error) {
      console.warn(error);
    }
  };

  // const { mutateAsync: activateAccount } = useActivateAccountMutation(user.id);
  // const { mutateAsync: deactivateAccount } = useDeactivateAccountMutation(
  //   user.id,
  // );
  // const handleAccount = async (action: "activate" | "deactivate") => {
  //   if (action === "activate") {
  //     await activateAccount();
  //   } else if (action === "deactivate") {
  //     await deactivateAccount();
  //   }
  //   queryClient.invalidateQueries({ queryKey: queryKeys.fetchUsers() });
  // };

  return (
    <>
      <div className="flex items-center justify-between gap-6">
        <input
          data-testid="manage-user-checkbox"
          className="flex-1 text-left accent-black"
          type="checkbox"
        />
        <span className="flex-1 text-left">{user.name}</span>
        <div
          data-testid="manage-user-action"
          onClick={handleClick}
          className="flex flex-1 cursor-pointer items-center gap-3 text-left text-gray-700"
        >
          <span>Actions</span>
          <RiArrowDropDownLine className="size-5" />
        </div>

        <Menu
          className="w-full"
          anchorEl={anchorEl}
          id="account-menu"
          open={menuOpen}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              // style: {
              //   width: anchorEl ? anchorEl?.clientWidth : undefined, // set width to anchor width
              // },
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  // right: 14,
                  left: 0,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        >
          {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <TbLockOpen fontSize="small" />
            <TbLock fontSize="small" />
          </ListItemIcon>
          <span>Activate account</span>
        </MenuItem> */}
          <MenuItem
            onClick={() => {
              setIsModalOpen(true);
              handleClose();
            }}
          >
            <ListItemIcon>
              <MdOutlinePassword fontSize="small" />
            </ListItemIcon>
            <span>Change password</span>
          </MenuItem>
          {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <MdDelete fontSize="small" className="text-red-500" />
          </ListItemIcon>
          <span className="text-red-500">Delete account</span>
        </MenuItem> */}
        </Menu>
      </div>
      <Modal
        className="mx-auto mt-52 h-1/2 w-11/12 md:w-2/3 lg:w-1/2"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.2)", // lighter backdrop
          },
        }}
      >
        <ChangePassword
          onSave={handleChangePassword}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
};
