import React from "react";

const FormButton = ({ text, type = "button", className, onClick }) => {
  return (
    <button
      type={type}
      className={`font-bold text-sm w-full py-3 px-4 rounded-lg ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default FormButton;