import React, { useState } from 'react';
import { RiUserLine, RiLockLine } from 'react-icons/ri';
import InputField from './form/InputField';
import FormLabel from './form/FormLabel';
import CreateCancelButtons from './form/CreateCancelButtons';
import Heading from './form/Heading';
import DivForm1 from './form/DivForm1';
import DivForm2 from './form/DivForm2';
import Form from './form/Form';

const LoginView = ({ onLogin, onCancel }) => {
    const [formData, setFormData] = useState({
        str_name_user: '',
        str_password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Validación inmediata
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const validateField = (name, value) => {
        if (!value.trim()) {
            return 'Este campo es obligatorio.';
        }
        return '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const tempErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) tempErrors[key] = error;
        });

        setErrors(tempErrors);

        if (Object.keys(tempErrors).length === 0) {
            onLogin(formData);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-90">
            <DivForm1>
                <DivForm2>
                    <Heading level={1}>
                        Iniciar <span className="text-primary">Sesión</span>
                    </Heading>
                    <Form onSubmit={handleSubmit}>
                        <FormLabel label="Usuario">
                            <InputField
                                type="text"
                                name="str_name_user"
                                value={formData.str_name_user}
                                onChange={handleChange}
                                placeholder="Ingrese su usuario"
                                icon={RiUserLine}
                            />
                            {errors.str_name_user && <p className="text-red-500">{errors.str_name_user}</p>}
                        </FormLabel>
                        <FormLabel label="Contraseña">
                            <InputField
                                type="password"
                                name="str_password"
                                value={formData.str_password}
                                onChange={handleChange}
                                placeholder="Ingrese su contraseña"
                                icon={RiLockLine}
                            />
                            {errors.str_password && <p className="text-red-500">{errors.str_password}</p>}
                        </FormLabel>
                        <CreateCancelButtons
                            name="Ingresar"
                            onCreate={handleSubmit}
                            onCancel={onCancel}
                        />
                    </Form>
                </DivForm2>
            </DivForm1>
        </div>
    );
};
export default LoginView;