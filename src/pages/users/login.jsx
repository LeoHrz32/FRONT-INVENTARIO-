import React, { useState } from 'react';
import { useUsers } from '../../context/users/usersContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import LoginView from '../../components/loginView';

const LoginPage = () => {
  const { loginUser } = useUsers();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const MySwal = withReactContent(Swal);

  const handleLogin = async (formData) => {
    console.log('👉 LoginPage recibe:', formData);
    const { str_name_user, str_password } = formData;

    setLoading(true);
    const result = await loginUser(str_name_user, str_password);
    setLoading(false);

    console.log('📡 loginUser devolvió:', result);

    if (result.success) {
      MySwal.fire({
        title: `<span style="font-size: 22px; font-weight: bold;">¡Bienvenido!</span>`,
        html: `<p style="font-size: 18px;">Hola <strong>${result.user.username}</strong>, tu sesión ha sido iniciada correctamente.</p>`,
        icon: 'success',
        background: '#1e1f25',
        color: '#ffffff',
        confirmButtonColor: '#6366F1', // Indigo-500
        confirmButtonText: 'Continuar',
        customClass: {
          popup: 'rounded-xl shadow-lg',
          confirmButton: 'text-white',
        },
        timer: 2500,
        timerProgressBar: true,
        showClass: {
          popup: 'swal2-show animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'swal2-hide animate__animated animate__fadeOutUp',
        }
      });

      console.log('🚀 Redirigiendo a /users...');
      navigate('/users');
    } else {
      Swal.fire({
        title: 'Error de acceso',
        text: result.message || 'Credenciales inválidas',
        icon: 'error',
        background: '#1e1f25',
        color: '#fff',
        confirmButtonColor: '#EF4444', // red-500
        confirmButtonText: 'Intentar de nuevo',
        customClass: {
          popup: 'rounded-xl shadow-lg',
        }
      });
    }
  };

  return (
    <LoginView
      onLogin={handleLogin}
      onCancel={() => navigate('/login')}
      loading={loading}
    />
  );
};

export default LoginPage;
