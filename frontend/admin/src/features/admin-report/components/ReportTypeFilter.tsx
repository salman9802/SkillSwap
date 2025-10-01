import React from "react";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { BsSlash } from "react-icons/bs";
import { FaHashtag } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";

import Button from "@src/components/ui/Button";
import type { ReportType } from "../types";

type ReportTypeFilterProps = {
  reportType: ReportType;
  onChange: (reportType: ReportType) => any;
};

export const ReportTypeFilter = ({
  reportType,
  onChange,
}: ReportTypeFilterProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="secondary"
        onClick={handleClick}
        className="flex items-center gap-3 text-gray-600"
      >
        <span>{reportType === "by_route" ? "By routes" : "By type"}</span>
        <RiArrowDropDownLine className="size-5" />
      </Button>
      <Menu
        className="w-full"
        anchorEl={anchorEl}
        id="account-menu"
        open={isMenuOpen}
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
        <MenuItem
          onClick={() => {
            onChange("by_route");
            handleClose();
          }}
        >
          <ListItemIcon>
            <BsSlash fontSize="small" />
          </ListItemIcon>
          <span>By routes</span>
        </MenuItem>
        <MenuItem
          onClick={() => {
            onChange("by_type");
            handleClose();
          }}
        >
          <ListItemIcon>
            <FaHashtag fontSize="small" />
          </ListItemIcon>
          <span>By type</span>
        </MenuItem>
      </Menu>
    </div>
  );
};
