import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = () => {
  const token = Cookies.get('token');

  console.log('🔐 Token desde cookies:', token);

  if (!token) {
    console.warn('⚠️ No hay token disponible');
    return <Navigate to="/login" />;
  }

  let decodedToken;

  try {
    decodedToken = jwtDecode(token);
    console.log('📦 Token decodificado:', decodedToken);
  } catch (error) {
    console.error('❌ Error al decodificar token:', error);
    return <Navigate to="/login" />;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  console.log('⏱️ Tiempo actual:', currentTime);
  console.log('📅 Expira en:', decodedToken.exp);

  if (decodedToken.exp < currentTime) {
    console.warn('⛔ Token expirado');
    return <Navigate to="/login" />;
  }

  if (decodedToken.user?.type !== 'ACCESS GRANTED') {
    console.warn('🚫 Usuario no autorizado');
    return <Navigate to="/login" />;
  }

  console.log('✅ Usuario autenticado y autorizado');
  return <Outlet />; // ← Esto debe funcionar si está dentro de una <Route element={<ProtectedRoute />} />
};

export default ProtectedRoute;
