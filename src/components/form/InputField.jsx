import React, { forwardRef } from "react";

const InputField = forwardRef(({ icon: Icon, type, ...props }, ref) => {
  const handleClick = (event) => {
    if (type === "time" || type === "date") {
      event.target.showPicker();
    }
  };

  return (
    <div className="relative">
      {Icon && <Icon className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />}
      <input
        type={type}
        className={`py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg accent-primary ${type === 'time' || type === 'date' ? 'hover:cursor-pointer' : ''}`}
        ref={ref}
        onClick={handleClick}
        style={{
          WebkitAppearance: "none",
          colorScheme: "dark",
          accentColor: "#00aa4d",
        }}
        {...props}
      />
    </div>
  );
});

export default InputField;
