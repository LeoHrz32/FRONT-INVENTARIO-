import React from 'react';
import Select, { components } from 'react-select';
import { RiAddLine, RiFileExcel2Line, RiFilePdf2Line, RiSearchLine, RiDropdownList } from 'react-icons/ri';

export const CreateButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-primary text-white font-bold text-sm py-3 px-4 rounded-lg flex items-center gap-1 hover:bg-green-700"
  >
    <RiAddLine size={16} className="transition-colors duration-300 hover:text-gray-200" />
    Crear
  </button>
);

export const ExportButton = ({ onClick, type }) => (
  <button
    onClick={onClick}
    className="hidden md:flex bg-secondary-100 hover:bg-secondary-500 text-white font-bold text-sm py-3 px-4 mx-0.5 rounded-lg items-center gap-2"
  >
    {type === 'pdf' ? (
      <RiFilePdf2Line size={16} className="transition-colors duration-300 hover:text-primary" />
    ) : (
      <RiFileExcel2Line size={16} className="transition-colors duration-300 hover:text-primary" />
    )}
  </button>
);

export const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        onChange={handleSearch}
        className="py-3 pl-10 pr-4 bg-secondary-100 w-full outline-none rounded-lg hover:bg-secondary-500 mx-0.5"
        placeholder="Buscar..."
      />
      <RiSearchLine size={16} className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white transition-colors duration-300 hover:text-primary" />
    </div>
  );
};

export const ItemsPerPageSelect = ({ value, onChange }) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#1E1F25',
      color: '#ffffff',
      borderRadius: '0.5rem',
      padding: '0.75rem 1rem', // Ajustado para py-3 px-4
      border: 'none',
      boxShadow: 'none',
      maxHeight: '48px',
      fontSize: '0.875rem', // text-sm
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', // Centrar contenido horizontalmente
      '&:hover': {
        backgroundColor: '#18191E', // bg-secondary-500
        cursor: 'pointer',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#a0aec0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', // Centrar el texto del placeholder
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', // Centrar el valor seleccionado
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#00aa4d' : '#1f1f1f',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', // Centrar las opciones en el menú desplegable
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#ffffff', // Color del ícono
      padding: '0.2rem', // Espaciado alrededor del ícono
      cursor: 'pointer',
      '&:hover': {
        color: '#00aa4d',
      },
      display: 'none', // Ocultar por defecto
      '@media (min-width: 768px)': { // Mostrar en pantallas medianas y grandes
        display: 'flex',
      },
    }),
  };

  const options = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
  ];

  const DropdownIndicator = (props) => (
    <components.DropdownIndicator {...props}>
      <RiDropdownList size={16} />
    </components.DropdownIndicator>
  );

  return (
    <div className="relative w-24 flex items-center justify-center">
      <Select
        value={options.find(option => option.value === value)}
        onChange={(selectedOption) => onChange(selectedOption.value)}
        options={options}
        styles={customStyles}
        placeholder="Select items per page"
        isSearchable={false}
        components={{ DropdownIndicator }}
        className="ml-1"
      />
    </div>
  );
};