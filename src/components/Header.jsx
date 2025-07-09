import React from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const MySwal = withReactContent(Swal);

  const handleLogout = () => {
    MySwal.fire({
      title: `<span style="font-size:20px; font-weight:bold;">¿Cerrar sesión?</span>`,
      html: `<p style="font-size:16px; margin-top:8px;">Se eliminará tu sesión actual.</p>`,
      icon: 'warning',
      background: '#1e1f25',
      color: '#ffffff',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#EF4444',    // red-500
      cancelButtonColor: '#6B7280',     // gray-500
      customClass: {
        popup: 'rounded-xl shadow-lg',
        confirmButton: 'px-6 py-2 font-medium',
        cancelButton: 'px-6 py-2 font-medium'
      },
      showClass: {
        popup: 'swal2-show animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'swal2-hide animate__animated animate__fadeOutUp'
      }
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
      case "/teachers":
        return "Profesores De Esummer";
      case "/users":
        return "Usuarios De Esumer";
      case "/tablas":
        return "Tablas De Inventario";
      case "/courses/instructors":
        return "Instructores";
      default:
        return "ESUMER";
    }
  };

  return (
    <header className="h-[7vh] md:h-[10vh] border-b border-primary bg-secondary-500 p-8 flex items-center justify-between">
      <h1 className="text-center lg:text-4xl text-3xl sm:text-4xl font-bold text-white">
        ESUMER<span className="text-primary"> - </span>
        <span className="text-4xl font-thin">{getPageTitle()}</span>
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
