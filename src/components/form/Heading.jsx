import React from "react";

const Heading = ({ level, children }) => {
  const Tag = `h${level}`;
  return <Tag className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold text-white text-center">{children}</Tag>
}

export default Heading;
