import ReactSelect, { ActionMeta, MultiValue, SingleValue } from "react-select";

// Define a type for options
interface Option<T> {
  label: string;
  value: T;
}

// Define the component props
interface SelectProps<T> {
  id: string;
  value: MultiValue<Option<T>> | SingleValue<Option<T>> | null;
  onChange: (
    newValue: MultiValue<Option<T>> | SingleValue<Option<T>> | null,
    actionMeta: ActionMeta<Option<T>>
  ) => void;
  placeholder?: string;
  label: string;
  isMulti?: boolean;
  options: Option<T>[];
  width?: string;
  error?: string;
}

// Generic Select component
const Select = <T,>({
  value,
  onChange,
  placeholder,
  label,
  id,
  isMulti = false,
  options,
  width,
  error,
}: SelectProps<T>) => {
  return (
    <div style={{ width }} className="space-y-1">
      <label htmlFor={id} className="text-sm text-[#474747]/80 font-medium">
        {label}
      </label>
      <ReactSelect
        id={id}
        placeholder={placeholder}
        isMulti={isMulti}
        options={options}
        value={value}
        onChange={onChange}
        styles={{
          container: (provided) => ({
            ...provided,
            width: "100%",
          }),
        }}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Select;
