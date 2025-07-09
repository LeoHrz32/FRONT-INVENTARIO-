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
    const { createRegistro } = useRegistros();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(
        schema.reduce((acc, col) => ({ ...acc, [col.name]: '' }), {})
    );
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (!value.trim()) {
            setErrors(prev => ({ ...prev, [name]: 'Este campo es obligatorio.' }));
        } else {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const tempErrors = {};
        for (const key in formData) {
            if (!formData[key].trim()) {
                tempErrors[key] = 'Este campo es obligatorio.';
            }
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setLoading(true);
            await createRegistro(tableName, formData);
            show_alert(`Registro añadido correctamente en la tabla ${tableName}`, 'success');
            onClose();
        } catch (error) {
            console.error('Error creando registro:', error);
            show_alert('Error al crear el registro.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        show_alert('Creación cancelada.', 'error');
        onClose();
    };

    return (
        <>
            <div className="absolute inset-0 justify-center items-center z-50 bg-gray-900 bg-opacity-50 overflow-auto">
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
                                {schema.map((col) => (
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
                                        {errors[col.name] && <p className="text-red-500">{errors[col.name]}</p>}
                                    </FormLabel>
                                ))}
                            </div>
                            <CreateCancelButtons name='Registrar' onCreate={handleCreate} onCancel={handleCancel} />
                        </Form>
                    </DivForm2>
                </DivForm1>
            </div>
            {loading && <LoadingScreen />}
        </>
    );
};

export default ModalRegistroCreateForm;
