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
import { useRegistros } from '../../context/registros/registrosContext';

const ModalRegistroEditForm = ({ onClose, tableName, schema, registro }) => {
    const { actualizarRegistro } = useRegistros();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    // Excluir campo id del formulario
    const camposForm = Array.isArray(schema)
        ? schema.filter(col => col.name.toLowerCase() !== 'id')
        : [];

    // Inicializa formData con los valores del registro
    useEffect(() => {
        if (registro && camposForm.length) {
            const initial = {};
            camposForm.forEach(col => {
                initial[col.name] = registro[col.name] ?? '';
            });
            setFormData(initial);
        }
    }, [registro, camposForm]);

    // Manejo de cambios
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({
            ...prev,
            [name]: !value.toString().trim() ? 'Este campo es obligatorio.' : ''
        }));
    };

    // Validación completa
    const validateForm = () => {
        const temp = {};
        for (const key in formData) {
            if (!formData[key].toString().trim()) temp[key] = 'Este campo es obligatorio.';
        }
        setErrors(temp);
        return Object.keys(temp).length === 0;
    };

    // Envío de actualización
    const handleEdit = async e => {
        e.preventDefault();
        if (!validateForm()) return;

        const payload = { ...formData };
        console.log('🗃️ tableName (edit):', tableName);
        console.log('📤 edit payload:', payload);

        try {
            setLoading(true);
            // pk dinámico
            const pkField = registro.hasOwnProperty('id') ? 'id' : schema.find(c => c.primary_key)?.name;
            const pkValue = registro[pkField];
            await actualizarRegistro(tableName, pkField, pkValue, payload);
            console.log('✅ Registro actualizado en tabla', tableName);
            show_alert(`Registro actualizado correctamente en ${tableName}`, 'success');
            onClose();
        } catch (error) {
            console.error('❌ Error al actualizar el registro:', error.response?.data || error.message);
            show_alert('Error al actualizar el registro.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        show_alert('Edición cancelada.', 'info');
        onClose();
    };

    // Si aún no hay registro o campos cargados muestro loading
    if (!registro || !camposForm.length) {
        return (
            <div className="absolute inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
                <div className="bg-white p-10 rounded-xl shadow-lg">
                    <p className="text-center text-lg">⏳ Cargando datos del registro...</p>
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
                                Editar <span className="text-primary">Registro</span>
                            </Heading>
                            <button onClick={handleCancel} className="absolute right-0 text-gray-400 hover:text-white">
                                <RiCloseLine size={24} />
                            </button>
                        </div>
                        <Form onSubmit={handleEdit}>
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
                            <CreateCancelButtons name="Actualizar" onCreate={handleEdit} onCancel={handleCancel} />
                        </Form>
                    </DivForm2>
                </DivForm1>
            </div>
            {loading && <LoadingScreen />}
        </>
    );
};

export default ModalRegistroEditForm;
