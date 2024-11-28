// components/form/InputField.tsx

import React from "react";

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  placeholder?: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  name,
  placeholder,
  type = "text",
}) => (
  <div className="flex flex-col w-full gap-2">
    <label htmlFor={id} className="text-sm text-gray-500">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      aria-label={label}
      className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full hover:ring-mBlue focus:ring-mBlue focus:outline-none transition-all duration-200 h-10"
    />
  </div>
);

export default InputField;
