import React, { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import LoadingScreen from "../../components/LoadingScreen";
import { useRegistros } from "../../context/registros/registrosContext";
import show_alert from "../../components/alertFunctions";

const ModalRegistroEditForm = ({ registro, tableName, schema, onClose }) => {
    const { actualizarRegistro } = useRegistros();
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const camposForm = Array.isArray(schema)
        ? schema.filter(col => col.name.toLowerCase() !== "id")
        : [];

    useEffect(() => {
        if (registro && camposForm.length) {
            const initial = {};
            camposForm.forEach(col => {
                initial[col.name] = registro[col.name] ?? "";
            });
            console.log("📋 [Modal] initial formData cargado:", initial);
            setFormData(initial);
        }
    }, [registro, schema]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({
            ...prev,
            [name]: !value.toString().trim() ? "Este campo es obligatorio." : ""
        }));
    };

    const validateForm = () => {
        const temp = {};
        Object.entries(formData).forEach(([key, val]) => {
            if (!val.toString().trim()) temp[key] = "Este campo es obligatorio.";
        });
        setErrors(temp);
        return Object.keys(temp).length === 0;
    };

    const handleEdit = async e => {
        e.preventDefault();
        if (!validateForm()) return;

        const payload = { ...formData };
        const pkField = schema.find(c => c.primary_key)?.name || "id";
        const pkValue = registro[pkField];

        try {
            setLoading(true);
            await actualizarRegistro(tableName, pkValue, payload);
            onClose();
            show_alert(`Registro actualizado correctamente en ${tableName}`, 'success');
        } catch (error) {
            console.error("❌ Error actualizando:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        show_alert('Edición cancelada.', 'error');
        onClose();
    };

    if (!registro) return <LoadingScreen />;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="w-full max-w-3xl bg-secondary-100 text-white rounded-2xl shadow-lg p-8 relative">
                <button onClick={handleCancel} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <RiCloseLine size={24} />
                </button>
                <h2 className="text-3xl font-bold mb-6">
                    Editar <span className="text-primary">Registro</span>
                </h2>
                <form onSubmit={handleEdit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {camposForm.map(col => (
                            <div key={col.name} className="w-full">
                                <label className="block text-base font-medium text-gray-300 mb-1">
                                    {col.name} <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name={col.name}
                                    placeholder={`Ingrese ${col.name}`}
                                    value={formData[col.name] || ""}
                                    onChange={handleChange}
                                    className="w-full bg-secondary-900 border border-gray-700 text-white placeholder-gray-400 rounded-lg px-3 py-2 focus:ring-primary/50 focus:border-primary"
                                />
                                {errors[col.name] && (
                                    <p className="text-red-400 text-sm mt-1">{errors[col.name]}</p>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg"
                        >
                            {loading ? "Actualizando…" : "Actualizar"}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                        >
                            Cancelar
                        </button>

                    </div>
                </form>
                {loading && <LoadingScreen />}
            </div>
        </div>
    );
};

export default ModalRegistroEditForm;
