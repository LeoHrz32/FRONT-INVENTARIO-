import React from "react";
import { RiCloseLine } from "react-icons/ri";

const ModalRegistroView = ({ registro, schema, onClose }) => {
    if (!registro || !schema) {
        console.warn("⚠️ [ModalRegistroView] registro o schema no disponibles.");
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="w-full max-w-3xl bg-secondary-100 text-white rounded-2xl shadow-lg p-8 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    <RiCloseLine size={24} />
                </button>

                <h2 className="text-3xl font-bold mb-6">
                    Detalle <span className="text-primary">Registro</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.isArray(schema) && schema.map((col) => (
                        <div key={col.name} className="w-full">
                            <label className="block text-base font-medium text-gray-300 mb-1">
                                {col.name}
                            </label>
                            <div className="w-full bg-secondary-900 border border-gray-700 text-white rounded-lg px-3 py-2">
                                {registro[col.name] ?? "—"}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalRegistroView;
