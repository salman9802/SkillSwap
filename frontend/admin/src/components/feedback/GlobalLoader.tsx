import React from "react";

type GlobalLoaderProps = {
  size?: string;
};

export const GlobalLoader = ({ size = "100px" }: GlobalLoaderProps) => {
  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className="animate-spin rounded-full border-4 border-b-4 border-gray-300 border-b-blue-500"
    ></div>
  );
};
