import React from "react";

const TextArea = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative max-h-12">
      {Icon && <Icon className="absolute top-1.5 left-2 text-primary" />}
      <textarea
        className="pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg"
        {...props}
      ></textarea>
    </div>
  );
};

export default TextArea;