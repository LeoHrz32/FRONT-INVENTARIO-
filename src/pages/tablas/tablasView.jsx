import React, { useRef } from 'react';
import { RiCloseLine } from 'react-icons/ri';

const ModalTablaView = ({ onClose, tabla, columnas }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
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
          <h2 className="text-2xl font-bold text-white">
            Columnas de la tabla: <span className="text-primary">{tabla?.nombre_tabla}</span>
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <RiCloseLine size={24} />
          </button>
        </div>
        <div className="space-y-2">
          {columnas.length === 0 ? (
            <p className="text-gray-300">No hay columnas registradas para esta tabla.</p>
          ) : (
            columnas.map((columna, index) => (
              <div
                key={index}
                className="p-4 bg-secondary-200 rounded-lg shadow flex justify-between items-center text-gray-800"
              >
                <span className="font-semibold">{columna.nombre_columna}</span>
                <span className="italic text-sm">{columna.tipo_columna}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalTablaView;
