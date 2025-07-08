import React from 'react';
import Select, { components } from 'react-select';
import { RiDropdownList } from 'react-icons/ri';

const SelectForm = ({ options, placeholder, bgColor, ...props }) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: bgColor ? `${bgColor} / 0.1)` : '#131517',
      color: '#ffffff',
      borderRadius: '0.5rem',
      padding: '0.5rem 1rem',
      border: 'none',
      boxShadow: 'none',
      maxHeight: '48px',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      paddingLeft: '1.5rem',
      '&:hover': {
        borderColor: '#00aa4d',
        cursor: 'pointer',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#a0aec0',
      transform: 'translateY(-10%)',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#1f1f1f',
      color: '#ffffff',
      borderRadius: '0.5rem',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: bgColor ? `${bgColor})` : '#ffffff',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#00aa4d' : '#1f1f1f',
      color: '#ffffff',
      cursor: 'pointer',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#00aa4d',
      padding: '0.2rem',
      cursor: 'pointer',
      position: 'absolute',
      left: '0.5rem',
      top: '50%',
      transform: 'translateY(-50%)',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  const DropdownIndicator = (props) => (
    <components.DropdownIndicator {...props}>
      <RiDropdownList size={16} />
    </components.DropdownIndicator>
  );

  return (
    <div className="relative w-full">
      <Select
        options={options}
        styles={customStyles}
        placeholder={placeholder}
        isSearchable
        components={{ DropdownIndicator }}
        {...props}
      />
    </div>
  );
};

export default SelectForm;