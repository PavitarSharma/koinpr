import { IconType } from "react-icons";

interface InputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  label: string;
  error?: string;
  startIcon?: IconType;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  value,
  onChange,
  placeholder,
  label,
  id,
  error,
  startIcon: StartIcon,
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm text-[#474747]/80 font-medium">
        {label}
      </label>
      <div className="w-full relative">
        {StartIcon && (
          <StartIcon className="absolute top-1/2 left-2 -translate-y-1/2 text-light-gray" />
        )}
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-lg border border-gray-300 p-2  outline-0 text-gray-700 ${StartIcon && "pl-6"}`}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
