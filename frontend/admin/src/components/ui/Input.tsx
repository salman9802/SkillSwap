import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

const Input = ({
  invalid = false,
  className,
  placeholder,
  ...rest
}: InputProps) => {
  return (
    <div className="relative">
      <input
        className={`peer border p-3 ${
          invalid ? "border-red-400 focus:outline-red-400" : "border-gray-400"
        } ${className}`}
        placeholder=""
        {...rest}
      />
      <div
        className={`absolute top-0 left-3 -translate-y-1/2 bg-white p-1 text-sm transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:block peer-focus:text-sm ${
          invalid ? "text-red-500" : "text-black not-peer-focus:text-gray-400"
        }`}
      >
        {placeholder || "Input"}
      </div>
    </div>
  );
};

export default Input;
