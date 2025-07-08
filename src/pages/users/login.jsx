import React, { useState } from 'react';
import { useUsers } from '../../context/users/usersContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoginView from '../../components/loginView';

const LoginPage = () => {
  const { loginUser } = useUsers();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (formData) => {
    console.log('👉 LoginPage recibe:', formData);
    const { str_name_user, str_password } = formData;

    setLoading(true);
    const result = await loginUser(str_name_user, str_password);
    setLoading(false);

    console.log('📡 loginUser devolvió:', result);

    if (result.success) {
      Swal.fire('Bienvenido', `Hola ${result.user.username}`, 'success');
      console.log('🚀 Redirigiendo a /users...');
      navigate('/users'); // ✅ Redirección correcta
    } else {
      Swal.fire('Error', result.message || 'Credenciales inválidas', 'error');
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
