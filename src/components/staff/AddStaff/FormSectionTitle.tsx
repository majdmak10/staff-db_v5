// components/form/FormSectionTitle.tsx

import React from "react";

interface FormSectionTitleProps {
  title: string;
}

const FormSectionTitle: React.FC<FormSectionTitleProps> = ({ title }) => (
  <h2 className="text-gray-500 font-medium">{title}</h2>
);

export default FormSectionTitle;
