import React, { useState } from 'react';
import H5Table from './H5Table';
import classNames from 'classnames';

const truncateText = (text, maxLength) => {
  if (!text) return ''; // Verifica si `text` es `undefined` o `null`
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

export function TableCell({ children, truncate, label, className, maxLength = 15 }) {
  const [isHovered, setIsHovered] = useState(false);
  const shouldTruncate = truncate && !isHovered;
  const content = shouldTruncate ? truncateText(children, maxLength) : children;

  const backgroundClass = truncate && isHovered ? 'bg-secondary-100 p-2 rounded-lg' : '';
  const combinedClassName = classNames(
    "flex flex-col md:flex-row items-center",
    className,
    backgroundClass
  );

  return (
    <div
      className={combinedClassName}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label && <H5Table>{label}</H5Table>}
      <div>{content}</div>
    </div>
  );
}

export default TableCell;