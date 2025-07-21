import React from "react";
import { IoClose } from "react-icons/io5";

const DemoAnnouncement = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <div
      className={`${open ? "flex" : "hidden"} w-full items-center justify-center bg-blue-500 px-12 py-6 text-xl text-white`}
    >
      <p className="ml-auto">
        This is a demo version. The servers would only be available between{" "}
        <span className="underline">13:00 - 21:00 IST</span>.
      </p>
      <IoClose
        onClick={() => setOpen(false)}
        className="ml-auto size-6 cursor-pointer"
      />
    </div>
  );
};

export default DemoAnnouncement;
