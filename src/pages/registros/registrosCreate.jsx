import React, { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import InputField from '../../components/form/InputField';
import FormLabel from '../../components/form/FormLabel';
import CreateCancelButtons from '../../components/form/CreateCancelButtons';
import Heading from '../../components/form/Heading';
import DivForm1 from '../../components/form/DivForm1';
import DivForm2 from '../../components/form/DivForm2';
import Form from '../../components/form/Form';
import LoadingScreen from '../../components/LoadingScreen';
import { show_alert } from '../../components/alertFunctions';
import { useRegistros } from "../../context/registros/registrosContext";

const ModalRegistroCreateForm = ({ onClose, tableName, schema }) => {
    // ← DESDE context viene crearRegistro, no createRegistro
    const { crearRegistro } = useRegistros();
    const [loading, setLoading] = useState(false);

    const camposForm = Array.isArray(schema)
        ? schema.filter(col => col.name.toLowerCase() !== 'id')
        : [];

    const [formData, setFormData] = useState(
        camposForm.reduce((acc, col) => ({ ...acc, [col.name]: '' }), {})
    );
    const [errors, setErrors] = useState({});

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({
            ...prev,
            [name]: !value.trim() ? 'Este campo es obligatorio.' : ''
        }));
    };

    const validateForm = () => {
        const temp = {};
        for (const key in formData) {
            if (!formData[key].trim()) temp[key] = 'Este campo es obligatorio.';
        }
        setErrors(temp);
        return Object.keys(temp).length === 0;
    };

    const handleCreate = async e => {
        e.preventDefault();
        if (!validateForm()) return;

        const payload = { ...formData };
        delete payload.id;

        console.log("🗃️ tableName:", tableName);
        console.log("📤 payload:", payload);

        try {
            setLoading(true);
            // ← Aquí ahora sí llamas la función correcta
            await crearRegistro(tableName, payload);
            console.log("✅ Registro creado en tabla", tableName);
            show_alert(`Registro añadido correctamente en ${tableName}`, 'success');
            onClose();
        } catch (error) {
            console.error("❌ Error al crear el registro:", error.response?.data || error.message);
            show_alert('Error al crear el registro.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        show_alert('Creación cancelada.', 'error');
        onClose();
    };

    if (!Array.isArray(schema) || schema.length === 0) {
        return (
            <div className="absolute inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
                <div className="bg-white p-10 rounded-xl shadow-lg">
                    <p className="text-center text-lg">⏳ Cargando campos del formulario...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="absolute inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
                <DivForm1>
                    <DivForm2>
                        <div className="relative flex items-center mb-10 mt-4">
                            <Heading level={1}>
                                Crear <span className="text-primary">Registro</span>
                            </Heading>
                            <button onClick={handleCancel} className="absolute right-0 text-gray-400 hover:text-white">
                                <RiCloseLine size={24} />
                            </button>
                        </div>
                        <Form onSubmit={handleCreate}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {camposForm.map(col => (
                                    <FormLabel key={col.name} label={
                                        <span>{col.name} <span className="text-red-500">*</span></span>
                                    }>
                                        <InputField
                                            type="text"
                                            name={col.name}
                                            placeholder={`Ingrese ${col.name}`}
                                            value={formData[col.name]}
                                            onChange={handleChange}
                                        />
                                        {errors[col.name] && (
                                            <p className="text-red-500 text-sm mt-1">{errors[col.name]}</p>
                                        )}
                                    </FormLabel>
                                ))}
                            </div>
                            <CreateCancelButtons name="Registrar" onCreate={handleCreate} onCancel={handleCancel} />
                        </Form>
                    </DivForm2>
                </DivForm1>
            </div>
            {loading && <LoadingScreen />}
        </>
    );
};

export default ModalRegistroCreateForm;
