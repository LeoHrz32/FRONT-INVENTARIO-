import React from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import Swal from 'sweetalert2'; // ← IMPORTACIÓN NECESARIA ✅

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: 'Se eliminará tu sesión actual',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove('token');
        console.log('🔓 Sesión cerrada: token eliminado');
        navigate('/login');
      }
    });
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      // COURSES
      case "/teachers":
        return "Profesores De Esummer";
      case "/users":
        return "Usuarios De Esumer";
      case "/tablas":
        return "Tablas De Inventario";
      case "/courses/instructors":
        return "Instructores";
      default:
        return "ESUMER"; // Título por defecto
    }
  };

  return (
    <header className="h-[7vh] md:h-[10vh] border-b border-primary bg-secondary-500 p-8 flex items-center justify-between">
      <h1 className="text-center lg:text-4xl text-3xl sm:text-4xl font-bold text-white">
        ESUMMER<span className="text-primary text-4xl"></span><span className="text-primary text-4xl"> -</span> <span className="text-4xl font-thin">{getPageTitle()}</span>
      </h1>
      <nav className="flex items-center gap-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-x-2 hover:bg-secondary-100 p-2 rounded-lg transition-colors text-gray-300 hover:text-red-500"
        >
          <RiLogoutCircleRLine /> Cerrar sesión
        </button>
      </nav>
    </header>
  );
};

export default Header;
