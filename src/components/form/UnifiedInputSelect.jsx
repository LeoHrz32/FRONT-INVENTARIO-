import React from 'react';
import Select from 'react-select';

const UnifiedInputSelect = ({
  options,
  placeholderSelect,
  placeholderInput,
  inputType,
  selectValue,
  inputValue,
  onSelectChange,
  onInputChange,
  ...props
}) => {
  const handleSelectChange = (selectedOption) => {
    onSelectChange(selectedOption);
  };

  const handleInputChange = (e) => {
    onInputChange(e.target.value);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#131517',
      color: '#ffffff',
      borderRadius: '0.5rem',
      padding: '0.5rem 1rem',
      border: 'none',
      boxShadow: 'none',
      maxHeight: '48px',
      '&:hover': {
        borderColor: '#00aa4d',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#a0aec0',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#1f1f1f',
      color: '#ffffff',
      borderRadius: '0.5rem',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#ffffff',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#00aa4d' : '#1f1f1f',
      color: '#ffffff',
    }),
  };

  return (
    <div className="relative w-full">
      <Select
        options={options}
        styles={customStyles}
        placeholder={placeholderSelect}
        value={selectValue}
        isSearchable
        onChange={handleSelectChange}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        {...props}
      />
      {selectValue && (
        <input
          type={inputType}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholderInput}
          className="absolute inset-y-0 right-0 px-4 py-3 text-white bg-secondary-500 border-none focus:border-primary focus:outline-none text-sm w-28" // Ajusta aquí el tamaño del texto y el ancho del input
        />
      )}
    </div>
  );
};

export default UnifiedInputSelect;
