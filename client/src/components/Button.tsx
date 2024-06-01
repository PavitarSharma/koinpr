import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: "button" | "reset" | "submit";
  outline?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  label,
  onClick,
  outline,
  icon: Icon,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        outline ? "border border-[#0A0A0A]" : "bg-[#0A0A0A] text-white"
      } rounded px-6 py-2 flex items-center justify-center gap-2`}
    >
      {Icon && <Icon />}
      {label}
    </button>
  );
};

export default Button;
