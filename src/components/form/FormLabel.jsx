import React from "react";

const FormLabel = ({ children, label, ...props }) => {
  return (
    <div className="relative mb-4">
      <label className="block mb-2 text-gray-300" {...props}>{label}</label>
      {children}
    </div>
  );
};  

export default FormLabel;