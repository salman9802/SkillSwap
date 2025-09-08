import React from "react";
import { IoClose } from "react-icons/io5";

const DemoAnnouncement = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <div
      className={`${open ? "flex" : "hidden"} w-full items-center justify-center gap-3 bg-orange-100 px-12 py-6 text-orange-800 md:text-xl`}
    >
      <p className="md:ml-auto">
        {/* This is a demo version. The servers would only be available between{" "} */}
        {/* <span className="underline">13:00 - 21:00 IST</span>. */}
        {/* This project is currently hosted on a free-tier server, which may occasionally result in slower response times or brief loading delays because of cold starts, typically 30-90 seconds. */}
        <p className="flex items-center justify-center gap-3">
          <div className="size-3 rounded-full bg-orange-500"></div>
          <span className="font-bold">SERVER NOTICE</span>
          <div className="size-3 rounded-full bg-orange-500"></div>
        </p>
        <p>
          This project is hosted on a free-tier server, which may result in
          initial loading delays, typically between{" "}
          <span className="font-semibold underline">30 to 90 seconds,</span>{" "}
          especially after periods of inactivity (cold starts).
        </p>
        <p>Thank you for your patience and understanding!</p>
      </p>
      <IoClose
        onClick={() => setOpen(false)}
        className="ml-auto inline-block size-16 cursor-pointer md:size-6"
      />
    </div>
  );
};

export default DemoAnnouncement;
