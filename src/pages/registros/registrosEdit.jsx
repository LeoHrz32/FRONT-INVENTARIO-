import React, { useState, useEffect } from 'react';
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

const ModalRegistroEditForm = ({ onClose, tableName, schema, record }) => {
    const { updateRegistro } = useRegistros();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (record) {
            setFormData({ ...record });
        }
    }, [record]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (!value.trim()) {
            setErrors(prev => ({ ...prev, [name]: 'Este campo es obligatorio.' }));
        } else {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const tempErrors = {};
        for (const key in formData) {
            if (!formData[key]?.toString().trim()) {
                tempErrors[key] = 'Este campo es obligatorio.';
            }
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);
            const pk = schema.find(c => c.primary_key)?.name || 'id';
            const pkValue = formData[pk];

            if (!pkValue) {
                show_alert("No se encontró la clave primaria del registro.", "error");
                return;
            }

            await updateRegistro(tableName, pk, pkValue, formData);
            show_alert("Registro actualizado correctamente", "success");
            onClose();
        } catch (err) {
            console.error("Error al actualizar:", err);
            show_alert("Ocurrió un error al actualizar el registro.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        show_alert("Edición cancelada.", "info");
        onClose();
    };

    return (
        <>
            <div className="absolute inset-0 justify-center items-center z-50 bg-gray-900 bg-opacity-50 overflow-auto">
                <DivForm1>
                    <DivForm2>
                        <div className="relative flex items-center mb-10 mt-4">
                            <Heading level={1}>
                                Editar <span className="text-primary">Registro</span>
                            </Heading>
                            <button onClick={handleCancel} className="absolute right-0 text-gray-400 hover:text-white">
                                <RiCloseLine size={24} />
                            </button>
                        </div>
                        <Form onSubmit={handleEdit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {schema.map((col) => (
                                    <FormLabel key={col.name} label={
                                        <span>{col.name} <span className="text-red-500">*</span></span>
                                    }>
                                        <InputField
                                            type="text"
                                            name={col.name}
                                            placeholder={`Ingrese ${col.name}`}
                                            value={formData[col.name] ?? ''}
                                            onChange={handleChange}
                                            readOnly={col.name === 'id'} // puedes personalizar esto
                                        />
                                        {errors[col.name] && <p className="text-red-500">{errors[col.name]}</p>}
                                    </FormLabel>
                                ))}
                            </div>
                            <CreateCancelButtons
                                name="Actualizar"
                                onCreate={handleEdit}
                                onCancel={handleCancel}
                            />
                        </Form>
                    </DivForm2>
                </DivForm1>
            </div>
            {loading && <LoadingScreen />}
        </>
    );
};

export default ModalRegistroEditForm;
