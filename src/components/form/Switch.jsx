import React from "react";

const Switch = ({ name, checked, onChange, ...props }) => {
  return (
    <label className="relative inline-block w-10 h-6">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="opacity-0 w-0 h-0"
        {...props}
      />
      <span
        className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition rounded-full ${checked ? 'bg-primary' : 'bg-red-500'}`}
      >
        <span
          className={`absolute h-4 w-4 left-1 bottom-1 bg-white transition rounded-full ${checked ? 'transform translate-x-4' : ''}`}
        ></span>
      </span>
    </label>
  );
};

export default Switch;






