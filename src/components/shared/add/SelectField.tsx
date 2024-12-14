import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  id: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean; // Add required prop
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  id,
  name,
  options,
  placeholder = "Select an option",
}) => (
  <div className="flex flex-col w-full gap-2">
    <label htmlFor={id} className="text-sm text-gray-500">
      {label}
    </label>
    <select
      id={id}
      name={name}
      aria-label={label}
      defaultValue="" // Set default value to an empty string
      className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full hover:ring-mBlue focus:ring-mBlue focus:outline-none transition-all duration-200 h-10"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
