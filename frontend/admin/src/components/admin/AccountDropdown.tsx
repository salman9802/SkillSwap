import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import React from "react";
import { BiLogOut } from "react-icons/bi";
import { BsPersonAdd } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import Button from "../ui/Button";
import { RiArrowDropDownLine } from "react-icons/ri";
import { logout } from "@src/features/auth/services";
import { useStore } from "@src/store/appStore";

const AccountDropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const name = useStore((s) => s.name);

  return (
    <>
      <button
        className="flex min-w-1/2 cursor-pointer items-center justify-center gap-3 p-3 text-lg font-semibold md:text-xl"
        onClick={handleClick}
      >
        <span>{name}</span>
        <RiArrowDropDownLine
          className={`size-5 transition-transform duration-150 ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      <Menu
        className="w-full"
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            style: {
              width: anchorEl ? anchorEl?.clientWidth : undefined, // set width to anchor width
            },
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
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <BiLogOut fontSize="small" className="text-red-500" />
          </ListItemIcon>
          <div onClick={logout} className="text-red-500">
            Logout
          </div>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountDropdown;
