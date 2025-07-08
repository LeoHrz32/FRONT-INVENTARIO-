import React, { useState, useEffect } from 'react';
import { RiBuilding4Line, RiBuildingLine, RiPhoneLine, RiMapPin2Line, RiCloseLine,RiUserLine ,RiUserVoiceLine ,RiPassportLine } from "react-icons/ri";
import InputField from '../../components/form/InputField';
import FormLabel from '../../components/form/FormLabel';
import CreateCancelButtons from '../../components/form/CreateCancelButtons';
import Heading from '../../components/form/Heading';
import DivForm1 from '../../components/form/DivForm1';
import DivForm2 from '../../components/form/DivForm2';
import Form from '../../components/form/Form';
import SelectForm from '../../components/form/SelectForm';
import { useTeachers } from '../../context/teachers/teachersContext';
import show_alert from '../../components/alertFunctions';

const ModalTeacherEditForm = ({ onClose, teacher }) => {
    const { updateTeacher } = useTeachers();
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
        state: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (teacher) {
            setFormData({
                firstName: teacher.firstName,
                lastName: teacher.lastName,
                location: teacher.location,
                documentType: teacher.documentType,
                documentNumber: teacher.documentNumber,
                phoneNumber: teacher.phoneNumber,
                profession: teacher.profession,
                area: teacher.area,
                thematic: teacher.thematic,
                state: teacher.state
            });
        }
    }, [teacher]);

    const options = [
        { value: 'Cedula', label: 'Cedula' },
        { value: 'Cedula extranjera', label: 'Cedula extranjera' },
        { value: 'Pasaporte', label: 'Pasaporte' }
    ];

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
        value = String(value);
        const onlyLettersWithSpaces = /^[A-Za-zñÑ\s'-]+$/;
        const onlyNumbers = /^[0-9]+$/;
        const phonePattern = /^\d{7,14}$/;

        const isEmpty = (value) => {
            if (typeof value === 'string') {
                return value.trim() === '';
            } else if (typeof value === 'number') {
                return isNaN(value);
            } else {
                return true; // Otros tipos de datos se consideran vacíos
            }
        };

        switch (name) {
            case 'firstName':
                if (isEmpty(value)) {
                    return "El nombre no puede estar vacío.";
                } else if (!onlyLettersWithSpaces.test(value)) {
                    return "El nombre debe contener solo letras.";
                }
                break;
            case 'lastName':
                if (isEmpty(value)) {
                    return "Los apellidos no pueden estar vacíos.";
                } else if (!onlyLettersWithSpaces.test(value)) {
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
                } else if (!onlyNumbers.test(value)) {
                    return "El número de documento debe contener solo números.";
                } else if (value[0] === '0') {
                    return "El número de documento no puede comenzar con 0.";
                } else if (!phonePattern.test(value)) {
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
                } else if (!onlyNumbers.test(value)) {
                    return "El número de teléfono debe contener solo números.";
                } else if (!phonePattern.test(value)) {
                    return "El número de teléfono debe tener entre 7 y 14 dígitos.";
                }
                break;
            case 'profession':
                if (isEmpty(value)) {
                    return "La profesión no puede estar vacía.";
                } else if (!onlyLettersWithSpaces.test(value)) {
                    return "La profesión debe contener solo letras.";
                }
                break;
            case 'area':
                if (isEmpty(value)) {
                    return "El área no puede estar vacía.";
                } else if (!onlyLettersWithSpaces.test(value)) {
                    return "El área debe contener solo letras.";
                }
                break;
            case 'thematic':
                if (isEmpty(value)) {
                    return "La especialización no puede estar vacía.";
                } else if (!onlyLettersWithSpaces.test(value)) {
                    return "La especialización debe contener solo letras.";
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

        if (teacher) {
            await updateTeacher(teacher._id, formData);
            show_alert(`Se actualizo a ${formData.firstName} ${formData.lastName} correctamente.`, 'success'); // Mostramos la alerta de éxito
        }
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
            state: ''
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
                            Editar <span className="text-primary">profesor</span>
                        </Heading>
                        <button onClick={handleCancel} className="absolute right-0 text-gray-400 hover:text-white">
                            <RiCloseLine size={24} />
                        </button>
                    </div>
                    <Form onSubmit={handleEdit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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
                            <FormLabel label={<span>Número de documento<span className="text-red-500"> *</span></span>}>
                                <InputField
                                    type="number"
                                    name="documentNumber"
                                    placeholder="Digite el número de documento"
                                    value={formData.documentNumber}
                                    onChange={handleInputChange}
                                    icon={RiUserLine}
                                />
                                {errors.documentNumber && <p className="text-red-500">{errors.documentNumber}</p>}
                            </FormLabel>
                            <FormLabel label={<span>Nombres <span className="text-red-500">*</span></span>}>
                                <InputField
                                    type="text"
                                    name="firstName"
                                    placeholder="Ingrese el nombre del Profesor"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    icon={RiUserLine}
                                />
                                {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
                            </FormLabel>
                            <FormLabel label={<span>Apellidos <span className="text-red-500">*</span></span>}>
                                <InputField
                                    type="text"
                                    name="lastName"
                                    placeholder="Ingrese el apellido del Profesor"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    icon={RiUserLine}
                                />
                                {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
                            </FormLabel>
                            <FormLabel label={<span>Dirección<span className="text-red-500">*</span></span>}>
                                <InputField
                                    type="text"
                                    name="location"
                                    placeholder="Ingrese la dirección"
                                    value={formData.location}
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
                                    icon={RiBuildingLine}
                                />
                                {errors.thematic && <p className="text-red-500">{errors.thematic}</p>}
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

export default ModalTeacherEditForm;
