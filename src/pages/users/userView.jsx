import React, { useRef } from 'react';
import { RiCloseLine } from 'react-icons/ri';

const ViewModal = ({ user, onClose, viewModalLayout }) => {
    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    const renderElement = (key) => {
        switch (key) {
            case 'str_name_user':
                return (
                    <div key={key} className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-300">Nombre de usuario</h3>
                        <p className="text-gray-400">{user.str_name_user}</p>
                    </div>
                );
            case 'str_email':
                return (
                    <div key={key} className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-300">Correo Electronico</h3>
                        <p className="text-gray-400">{user.str_email}</p>
                    </div>
                );
            case 'str_password':
                return (
                    <div key={key} className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-300">Contraseña</h3>
                        <p className="text-gray-400">{user.str_password ? "*".repeat(user.str_password.length) : ""}</p>

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
                    <h2 className="text-2xl font-bold text-white">Información del Usuario</h2>
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