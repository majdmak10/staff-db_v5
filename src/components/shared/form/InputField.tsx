import React from "react";

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
  type?: string;
  error?: string;
  description?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  name,
  placeholder,
  value,
  readOnly,
  type = "text",
  error,
  description,
}) => (
  <div className="flex flex-col w-full gap-2">
    <label htmlFor={id} className="text-sm text-gray-500 font-semibold">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      readOnly={readOnly}
      aria-label={label}
      className={`ring-[1.5px] p-2 rounded-md text-sm w-full hover:ring-mBlue focus:ring-mBlue focus:outline-none transition-all duration-200 h-10 ${
        error ? "ring-red-500 text-red-600" : "ring-gray-300"
      }`}
    />
    {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default InputField;
