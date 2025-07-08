import React, { useRef } from 'react';
import { RiCloseLine } from 'react-icons/ri';

const ViewModal = ({ teacher, onClose, viewModalLayout }) => {
    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    const renderElement = (key) => {
        switch (key) {
            case 'firstName':
                return (
                    <div key={key} className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-300">Nombres</h3>
                        <p className="text-gray-400">{teacher.firstName}</p>
                    </div>
                );
            case 'lastName':
                return (
                    <div key={key} className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-300">Apellidos</h3>
                        <p className="text-gray-400">{teacher.lastName}</p>
                    </div>
                );
            case 'location':
                return (
                    <div key={key} className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-300">Dirección</h3>
                        <p className="text-gray-400">{teacher.location}</p>
                    </div>
                );
            case 'documentType':
                return (
                    <div key={key} className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-300">Tipo Documento</h3>
                        <p className="text-gray-400">{teacher.documentType}</p>
                    </div>
                );
            case 'documentNumber':
                return (
                    <div key={key} className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-300">Número de documento</h3>
                        <p className="text-gray-400">{teacher.documentNumber}</p>
                    </div>
                );
            case 'phoneNumber':
                return (
                    <div key={key} className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-300">Teléfono</h3>
                        <p className="text-gray-400">{teacher.phoneNumber}</p>
                    </div>
                );
            case 'profession':
                return (
                    <div key={key} className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-300">Profesión</h3>
                        <p className="text-gray-400">{teacher.profession}</p>
                    </div>
                );
            case 'area':
                return (
                    <div key={key} className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-300">Área</h3>
                        <p className="text-gray-400">{teacher.area}</p>
                    </div>
                );
            case 'thematic':
                return (
                    <div key={key} className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-300">Especialización</h3>
                        <p className="text-gray-400">{teacher.thematic}</p>
                    </div>
                );
            case 'state':
                return (
                    <div key={key} className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-300">Estado</h3>
                        <p className={`py-1 px-2 ${teacher.state === true ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'} rounded-lg`}>
                            {teacher.state === true ? 'Activo' : teacher.state === false ? 'Inactivo' : 'Desconocido'}
                        </p>
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
                    <h2 className="text-2xl font-bold text-white">Detalle del Instructor</h2>
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