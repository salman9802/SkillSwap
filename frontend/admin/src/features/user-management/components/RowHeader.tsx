import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import React from "react";
import { MdDelete } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";

export const RowHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex items-center justify-between gap-6 bg-gray-100 font-semibold">
      <input className="flex-1 text-left accent-black" type="checkbox" />
      <span className="flex-1 text-left">Name</span>
      <div
        onClick={handleClick}
        className="flex flex-1 cursor-pointer items-center gap-3 text-left"
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
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <MdDelete fontSize="small" className="text-red-500" />
          </ListItemIcon>
          <span className="text-red-500">Delete selected account(s)</span>
        </MenuItem>
      </Menu>
    </div>
  );
};
