interface TextAreaProps {
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    label: string;
    error?: string;
  }
  
  const TextArea: React.FC<TextAreaProps> = ({
    value,
    onChange,
    placeholder,
    label,
    id,
    error,
  }) => {
    return (
      <div className="space-y-1">
        <label htmlFor={id} className="text-sm text-[#474747]/80 font-medium">
          {label}
        </label>
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={5}
          className="w-full rounded-lg border border-gray-300 p-2 outline-0 text-gray-700 resize-none placeholder:text-gray-700"
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  };
  
  export default TextArea;
  