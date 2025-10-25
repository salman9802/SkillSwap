import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import Button from "@src/components/ui/Button";
import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TbFileTypeCsv, TbFileTypePdf } from "react-icons/tb";
import type { ReportData, ReportType } from "../types";
import { downloadCSVData } from "@src/utils/download";

type DownloadProps = {
  reportType: ReportType;
  reportData: ReportData;
};

export const Download = ({ reportType, reportData }: DownloadProps) => {
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
        variant="invert-secondary"
        onClick={handleClick}
        className="flex items-center gap-3 text-gray-600"
      >
        <span>Download</span>
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
            // downloadAsPDF(
            //   document.getElementById("report-table")?.outerHTML as string,
            // );

            const style = document.createElement("style");
            style.id = "print-style";
            style.textContent = `
        @media print {
          body * {
            visiblity: hidden !important;
          }
          #report-table, #report-table * {
            visibility: visible !important;
          }
          button {
            display: none !important;
          }
            }
            `;
            // #report-table {
            //   position: absolute;
            //   top: 0;
            //   left: 0;
            //   }
            // display: table !important;
            document.head.appendChild(style);

            // Wait a tick to let the browser apply styles, then print
            setTimeout(() => {
              window.print();

              // After print, remove the style
              window.onafterprint = () => {
                const styleToRemove = document.getElementById("print-style");
                if (styleToRemove) {
                  styleToRemove.remove();
                  console.log("style removed");
                }
              };
            }, 1000);

            handleClose();
          }}
        >
          <ListItemIcon>
            <TbFileTypePdf className="size-5" />
          </ListItemIcon>
          <span>as PDF</span>
        </MenuItem>
        <MenuItem
          onClick={() => {
            let csv =
              (reportType === "by_route" ? "Route" : "Type") + ",Count\r\n";
            Object.keys(reportData).forEach((k) => {
              csv += `${k},${reportData[k]}\r\n`;
            });

            downloadCSVData(csv);
            handleClose();
          }}
        >
          <ListItemIcon>
            <TbFileTypeCsv className="size-5" />
          </ListItemIcon>
          <span>as CSV</span>
        </MenuItem>
      </Menu>
    </div>
  );
};
