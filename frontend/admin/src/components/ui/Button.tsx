import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "invert-secondary";
};

const Button = ({
  variant = "primary",
  children,
  className,
  ...rest
}: ButtonProps) => {
  switch (variant) {
    case "secondary":
      return (
        <button
          className={`group relative cursor-pointer overflow-hidden border border-gray-400 px-3 py-1.5 text-black transition-colors duration-100 hover:bg-gray-100 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.05)] focus:bg-gray-100 focus:outline-none lg:px-6 lg:py-3 ${className}`}
          {...rest}
        >
          {children}
        </button>
      );
    case "invert-secondary":
      return (
        <button
          className={`group relative cursor-pointer overflow-hidden border border-gray-400 bg-black px-3 py-1.5 text-white transition-colors duration-100 hover:bg-gray-800 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.05)] focus:bg-gray-800 focus:outline-none lg:px-6 lg:py-3 ${className}`}
          {...rest}
        >
          {children}
        </button>
      );
    default:
      return (
        <button
          className={`group relative cursor-pointer overflow-hidden border border-gray-400 px-3 py-1.5 hover:text-white focus:text-white focus:outline-none lg:px-6 lg:py-3 ${className}`}
          {...rest}
        >
          {children}
          <div className="absolute inset-0 -z-50 -translate-x-[110%] bg-black transition-transform duration-200 group-hover:translate-x-0 group-focus:translate-x-0"></div>
        </button>
      );
  }
};

export default Button;
