import React, { useState } from 'react';
import { RiUserLine, RiLockLine } from 'react-icons/ri';
import InputField from './form/InputField';
import FormLabel from './form/FormLabel';
import CreateCancelButtons from './form/CreateCancelButtons';
import Heading from './form/Heading';
import logoImage from '../assets/images/Fondo.jpg';

const LoginView = ({ onLogin, onCancel }) => {
    const [formData, setFormData] = useState({
        str_name_user: '',
        str_password: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({
            ...prev,
            [name]: value.trim() ? '' : 'Este campo es obligatorio.'
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const tempErrors = {};
        Object.entries(formData).forEach(([key, val]) => {
            if (!val.trim()) tempErrors[key] = 'Este campo es obligatorio.';
        });
        setErrors(tempErrors);
        if (Object.keys(tempErrors).length === 0) {
            onLogin(formData);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-95 px-4">
            <div
                className="relative bg-[rgb(30_31_37/0.95)] text-white rounded-2xl shadow-2xl p-8 pt-24 w-full max-w-md"
            >
                {/* Imagen flotante grande */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img
                        src={logoImage}
                        alt="Logo"
                        className="w-60 h-auto max-h-28 object-contain bg-white shadow-md border border-white rounded-md"
                    />
                </div>

                {/* Título */}
                <div className="mb-16">
                    <Heading level={1} className="text-center text-3xl sm:text-4xl">
                        Iniciar <span className="text-primary">Sesión</span>
                    </Heading>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <FormLabel label="Usuario">
                        <InputField
                            type="text"
                            name="str_name_user"
                            value={formData.str_name_user}
                            onChange={handleChange}
                            placeholder="Ingrese su usuario"
                            icon={RiUserLine}
                        />
                        {errors.str_name_user && (
                            <p className="text-red-500 text-sm">{errors.str_name_user}</p>
                        )}
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
                        {errors.str_password && (
                            <p className="text-red-500 text-sm">{errors.str_password}</p>
                        )}
                    </FormLabel>

                    <div className="flex justify-center mt-6">
                        <CreateCancelButtons
                            name="Ingresar"
                            onCreate={handleSubmit}
                            onCancel={onCancel}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginView;
