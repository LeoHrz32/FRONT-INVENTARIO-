import React, { useState, useEffect } from 'react';
import { RiBuilding4Line, RiBuildingLine, RiPhoneLine, RiMapPin2Line, RiCloseLine, RiUserLine, RiUserVoiceLine, RiPassportLine } from "react-icons/ri";
import InputField from '../../components/form/InputField';
import FormLabel from '../../components/form/FormLabel';
import CreateCancelButtons from '../../components/form/CreateCancelButtons';
import Heading from '../../components/form/Heading';
import DivForm1 from '../../components/form/DivForm1';
import DivForm2 from '../../components/form/DivForm2';
import Form from '../../components/form/Form';
import SelectForm from '../../components/form/SelectForm';
import { useUsers } from '../../context/users/usersContext';
import show_alert from '../../components/alertFunctions';

const ModalUserEditForm = ({ onClose, user }) => {
    const { updateUser } = useUsers();
    const [formData, setFormData] = useState({
        str_name_user: '',
        str_email: '',
        str_password: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {   
        if (user) {
            setFormData({
                str_name_user: user.str_name_user,
                str_email: user.str_email,
                str_password: user.str_password
            });
        }
    }, [user]);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        const error = validateField(name, value);
        setErrors({ ...errors, [name]: error });
    };

    const handleSelectChange = (selectedOption) => {
        setFormData({ ...formData, documentType: selectedOption.value });
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

    const handleEdit = async (e) => {
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

        if (user) {
            await updateUser(user.id, formData);
            show_alert(`Se actualizo a ${formData.str_name_user} correctamente.`, 'success'); // Mostramos la alerta de éxito
        }
        setFormData({
            str_name_user: '',
            str_email: '',
            str_password: ''
        });
        onClose();
    };

    const handleCancel = () => {
        show_alert("La actualización se canceló.", 'info'); // Mostramos la alerta de cancelación
        onClose();
    };

    return (
        <div className="absolute inset-0 justify-center items-center z-50 bg-gray-900 bg-opacity-50 overflow-auto">
            <DivForm1>
                <DivForm2>
                    <div className="relative flex items-center mb-10 mt-4">
                        <Heading level={1}>
                            Editar <span className="text-primary">Usuario</span>
                        </Heading>
                        <button onClick={handleCancel} className="absolute right-0 text-gray-400 hover:text-white">
                            <RiCloseLine size={24} />
                        </button>
                    </div>
                    <Form onSubmit={handleEdit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <FormLabel label={<span>Nombre de usuario<span className="text-red-500"> *</span></span>}>
                                <InputField
                                    type="text"
                                    name="str_name_user"
                                    placeholder="Ingrese el nombre de usuario"
                                    value={formData.str_name_user}
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
                                    icon={RiUserLine}
                                />
                                {errors.str_password && <p className="text-red-500">{errors.str_password}</p>}
                            </FormLabel>
                        </div>

                        <CreateCancelButtons name='Editar'
                            onCancel={handleCancel}
                            onCreate={handleEdit}
                        />
                    </Form>
                </DivForm2>
            </DivForm1>
        </div>
    );
};

export default ModalUserEditForm;
