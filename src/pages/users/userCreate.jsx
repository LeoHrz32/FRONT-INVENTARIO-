import React, { useState } from 'react';
import {
    RiBuilding4Line,
    RiMailLine,
    RiPhoneLine,
    RiMapPin2Line,
    RiBuildingLine,
    RiUserLine,
    RiPassportLine,
    RiUserVoiceLine,
    RiCloseLine
} from "react-icons/ri";
import InputField from '../../components/form/InputField';
import FormLabel from '../../components/form/FormLabel';
import CreateCancelButtons from '../../components/form/CreateCancelButtons';
import Heading from '../../components/form/Heading';
import DivForm1 from '../../components/form/DivForm1';
import DivForm2 from '../../components/form/DivForm2';
import Form from '../../components/form/Form';
import SelectForm from '../../components/form/SelectForm';
import { useUsers } from '../../context/users/usersContext';
import LoadingScreen from '../../components/LoadingScreen'
import { show_alert } from '../../components/alertFunctions';

const ModalUserCreateForm = ({ onClose }) => {
    const { createUser } = useUsers();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        str_name_user: '',
        str_email: '',
        str_password: ''
    });


    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validación en tiempo real
        const error = validateField(name, value);
        setErrors({ ...errors, [name]: error });
    };

    const handleSelectChange = (selectedOption) => {
        setFormData({
            ...formData,
            documentType: selectedOption.value
        });
    };

    const validateField = (name, value) => {
        const onlyLettersWithSpaces = /^[A-Za-zñÑ\s'-]+$/;
        const isEmpty = (value) => value.trim() === '';

        switch (name) {
            case 'str_name_user':
                if (isEmpty(value)) {
                    return "El nombre no puede estar vacío.";
                } else if (!value.match(onlyLettersWithSpaces)) {
                    return "El nombre debe contener solo letras.";
                }
                break;
            case 'str_email':
                if (isEmpty(value)) {
                    return "Los apellidos no pueden estar vacíos.";
                }
                break;
            case 'str_password':
                if (isEmpty(value)) {
                    return "La contraseña no puede estar vacía.";
                }
                break;
            default:
                break;
        }
        return '';
    };


    const handleCreate = async (e) => {
        e.preventDefault();

        const tempErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) {
                tempErrors[key] = error;
            }
        });
        setErrors(tempErrors);

        if (Object.keys(tempErrors).length > 0) {
            return;
        }

        await createUser(formData);
        setFormData({
            str_name_user: '',
            str_email: '',
            str_password: ''

        });
        onClose();
        show_alert(`Se añadió a ${formData.str_name_user} correctamente.`, 'success'); // Mostramos la alerta de éxito
    };

    const handleCancel = () => {
        show_alert("El registro se canceló.", 'error'); // Mostramos la alerta de cancelación
        onClose();
    };

    return (
        <>
            <div className="absolute inset-0 justify-center items-center z-50 bg-gray-900 bg-opacity-50 overflow-auto">
                <DivForm1>
                    <DivForm2>
                        <div className="relative flex items-center mb-10 mt-4">
                            <Heading level={1}>
                                Crear <span className="text-primary">Usuario</span>
                            </Heading>
                            <button onClick={handleCancel} className="absolute right-0 text-gray-400 hover:text-white">
                                <RiCloseLine size={24} />
                            </button>
                        </div>
                        <Form onSubmit={handleCreate}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormLabel label={<span>Nombre de usuario<span className="text-red-500"> *</span></span>}>
                                    <InputField
                                        type="text"
                                        name="str_name_user"
                                        placeholder="Ingrese el nombre de usuario"
                                        value={formData.str_name_user}
                                        onChange={handleChange}
                                        icon={RiUserLine}
                                    />
                                    {errors.str_name_user && <p className="text-red-500">{errors.str_name_user}</p>}
                                </FormLabel>

                                <FormLabel label={<span>Correo Electronico <span className="text-red-500">*</span></span>}>
                                    <InputField
                                        type="text"
                                        name="str_email"
                                        placeholder="Ingrese el correo"
                                        value={formData.str_email}
                                        onChange={handleChange}
                                        icon={RiUserLine}
                                    />
                                    {errors.str_email && <p className="text-red-500">{errors.str_email}</p>}
                                </FormLabel>
                                <FormLabel label={<span>Contraseña<span className="text-red-500">*</span></span>}>
                                    <InputField
                                        type="text"
                                        name="str_password"
                                        placeholder="Ingrese la contraseña"
                                        value={formData.str_password}
                                        onChange={handleChange}
                                        icon={RiUserLine}
                                    />
                                    {errors.str_password && <p className="text-red-500">{errors.str_password}</p>}
                                </FormLabel>

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

export default ModalUserCreateForm;
