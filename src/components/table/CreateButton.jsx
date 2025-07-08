import React from "react";

const CreateButton = ({ type, text, onClick }) => {
  return (
    <button type={type} onClick={onClick} className="bg-primary text-white font-bold text-sm w-full md:w-full lg:w-44 py-3 px-4 rounded-lg mb-5">
      {text}
    </button>
  );
};

export default CreateButton;