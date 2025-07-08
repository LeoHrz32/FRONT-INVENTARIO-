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
import { useTeachers } from '../../context/teachers/teachersContext';
import LoadingScreen from '../../components/LoadingScreen'
import { show_alert } from '../../components/alertFunctions';

const ModalTeacherCreateForm = ({ onClose }) => {
    const { addTeacher } = useTeachers();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        location: '',
        documentType: '',
        documentNumber: '',
        phoneNumber: '',
        profession: '',
        area: '',
        thematic: '',
        state: true
    });

    const options = [
        { value: 'Cedula', label: 'Cedula' },
        { value: 'Cedula extranjera', label: 'Cedula extranjera' }
    ];

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
        const onlyNumbers = /^[0-9]+$/;
        const phonePattern = /^\d{7,14}$/;
        const isEmpty = (value) => value.trim() === '';

        switch (name) {
            case 'firstName':
                if (isEmpty(value)) {
                    return "El nombre no puede estar vacío.";
                } else if (!value.match(onlyLettersWithSpaces)) {
                    return "El nombre debe contener solo letras.";
                }
                break;

            case 'lastName':
                if (isEmpty(value)) {
                    return "Los apellidos no pueden estar vacíos.";
                } else if (!value.match(onlyLettersWithSpaces)) {
                    return "Los apellidos deben contener solo letras.";
                }
                break;
            case 'location':
                if (isEmpty(value)) {
                    return "La dirección no puede estar vacía.";
                }
                break;
            case 'documentNumber':
                if (isEmpty(value)) {
                    return "El número de documento no puede estar vacío.";
                } else if (!value.match(onlyNumbers)) {
                    return "El número de documento debe contener solo números.";
                } else if (value[0] === '0') {
                    return "El número de documento no puede comenzar con 0.";
                } else if (!value.match(phonePattern)) {
                    return "El número de documento debe tener entre 7 y 14 dígitos.";
                }
                break;
            case 'documentType':
                if (isEmpty(value)) {
                    return "Debes de selecionar un tipo de docuento.";
                }
                break;
            case 'phoneNumber':
                if (isEmpty(value)) {
                    return "El número de teléfono no puede estar vacío.";
                } else if (!value.match(onlyNumbers)) {
                    return "El número de teléfono debe contener solo números.";
                } else if (!value.match(phonePattern)) {
                    return "El número de teléfono debe tener entre 7 y 14 dígitos.";
                }
                break;
            case 'profession':
                if (isEmpty(value)) {
                    return "La profesión no puede estar vacía.";
                } else if (!value.match(onlyLettersWithSpaces)) {
                    return "La profesión debe contener solo letras.";
                }
                break;
            case 'area':
                if (isEmpty(value)) {
                    return "El área no puede estar vacía.";
                } else if (!value.match(onlyLettersWithSpaces)) {
                    return "El área debe contener solo letras.";
                }
                break;
            case 'thematic':
                if (isEmpty(value)) {
                    return "La especialización no puede estar vacía.";
                } else if (!value.match(onlyLettersWithSpaces)) {
                    return "La especialización debe contener solo letras.";
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

        await addTeacher(formData);
        setFormData({
            firstName: '',
            lastName: '',
            location: '',
            documentType: '',
            documentNumber: '',
            phoneNumber: '',
            profession: '',
            area: '',
            thematic: '',
            state: true
        });
        onClose();
        show_alert(`Se añadió a ${formData.firstName} ${formData.lastName} correctamente.`, 'success'); // Mostramos la alerta de éxito
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
                                Crear <span className="text-primary">Profesor</span>
                            </Heading>
                            <button onClick={handleCancel} className="absolute right-0 text-gray-400 hover:text-white">
                                <RiCloseLine size={24} />
                            </button>
                        </div>
                        <Form onSubmit={handleCreate}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormLabel label={<span>Número de documento<span className="text-red-500"> *</span></span>}>
                                    <InputField
                                        type="number"
                                        name="documentNumber"
                                        placeholder="Digite el número de documento"
                                        value={formData.documentNumber}
                                        onChange={handleChange}
                                        icon={RiUserLine}
                                    />
                                    {errors.documentNumber && <p className="text-red-500">{errors.documentNumber}</p>}
                                </FormLabel>

                                <FormLabel label={<span>Nombres <span className="text-red-500">*</span></span>}>
                                    <InputField
                                        type="text"
                                        name="firstName"
                                        placeholder="Ingrese el nombre del profesor"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        icon={RiUserLine}
                                    />
                                    {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
                                </FormLabel>
                                <FormLabel label={<span>Apellidos <span className="text-red-500">*</span></span>}>
                                    <InputField
                                        type="text"
                                        name="lastName"
                                        placeholder="Ingrese el apellido del profesor"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        icon={RiUserLine}
                                    />
                                    {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
                                </FormLabel>
                                <FormLabel label={<span>Tipo de documento <span className="text-red-500">*</span></span>}>
                                    <SelectForm
                                        options={options}
                                        placeholder="Seleccione una opción"
                                        icon={RiPassportLine}
                                        value={options.find(option => option.value === formData.documentType)}
                                        onChange={handleSelectChange}
                                    />
                                    {errors.documentType && <p className="text-red-500">{errors.documentType}</p>}
                                </FormLabel>
                                <FormLabel label={<span>Dirección<span className="text-red-500">*</span></span>}>
                                    <InputField
                                        type="text"
                                        name="location"
                                        placeholder="Ingrese la dirección"
                                        value={formData.location}
                                        onChange={handleChange}
                                        icon={RiMapPin2Line}
                                    />
                                    {errors.location && <p className="text-red-500">{errors.location}</p>}
                                </FormLabel>
                                <FormLabel label={<span>Teléfono<span className="text-red-500">*</span></span>}>
                                    <InputField
                                        type="number"
                                        name="phoneNumber"
                                        placeholder="Digite el número de teléfono"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        icon={RiPhoneLine}
                                    />
                                    {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
                                </FormLabel>
                                <FormLabel label={<span>Profesión<span className="text-red-500">*</span></span>}>
                                    <InputField
                                        type="text"
                                        name="profession"
                                        placeholder="Ingrese la profesión"
                                        value={formData.profession}
                                        onChange={handleChange}
                                        icon={RiUserVoiceLine}
                                    />
                                    {errors.profession && <p className="text-red-500">{errors.profession}</p>}
                                </FormLabel>
                                <FormLabel label={<span>Area<span className="text-red-500">*</span></span>}>
                                    <InputField
                                        type="text"
                                        name="area"
                                        placeholder="Ingrese el área"
                                        value={formData.area}
                                        onChange={handleChange}
                                        icon={RiBuilding4Line}
                                    />
                                    {errors.area && <p className="text-red-500">{errors.area}</p>}
                                </FormLabel>
                                <FormLabel label={<span>Especialización<span className="text-red-500">*</span></span>}>
                                    <InputField
                                        type="text"
                                        name="thematic"
                                        placeholder="Ingrese la especialización"
                                        value={formData.thematic}
                                        onChange={handleChange}
                                        icon={RiBuildingLine}
                                    />
                                    {errors.thematic && <p className="text-red-500">{errors.thematic}</p>}
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

export default ModalTeacherCreateForm;
