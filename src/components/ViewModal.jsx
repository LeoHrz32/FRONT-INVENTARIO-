import React, { useRef } from 'react';
import { RiCloseLine } from 'react-icons/ri';

const ViewModal = ({ item, onClose, viewModalLayout }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  const renderElement = (key) => {
    switch (key) {
      case 'name':
        return (
          <div key={key} className="flex-1">
            <h3 className="text-lg font-semibold text-gray-300">Nombre</h3>
            <p className="text-gray-400">{item.name}</p>
          </div>
        );
      case 'description':
        return (
          <div key={key} className="flex-1">
            <h3 className="text-lg font-semibold text-gray-300">Descripción</h3>
            <p className="text-gray-400">{item.description}</p>
          </div>
        );
      case 'status':
        return (
          <div key={key} className="flex-1">
            <h3 className="text-lg font-semibold text-gray-300">Estatus</h3>
            <p className={`py-1 px-2 ${item.status === 'Abierto' ? 'bg-green-500/10 text-green-500' : item.status === 'En proceso' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'} rounded-lg`}>{item.status}</p>
          </div>
        );
      case 'state':
        return (
          <div key={key} className="flex-1">
            <h3 className="text-lg font-semibold text-gray-300">Estado</h3>
            <p className={`py-1 px-2 ${item.state === true ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'} rounded-lg`}>{item.state === true ? 'Activo' : 'Inactivo'}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50 overflow-auto"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="bg-secondary-100 p-6 rounded-xl w-full max-w-[80%] max-h-[90%] overflow-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Detalle del Elemento</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <RiCloseLine size={24} />
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          {viewModalLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex space-x-4">
              {row.map((key) => renderElement(key))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewModal;