import React from "react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import caveman404 from "./../../assets/images/caveman404.gif"; // Importamos el gif principal
import smallGif from "./../../assets/images/smallGif.gif"; // Importamos el gif pequeño

const Error404 = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/'); // Redirigir a la página de inicio si no hay historial
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white">
      {/* GIF pequeño en la esquina superior izquierda */}
     
      
      {/* GIF principal centrado */}
      <div className="w-full max-w-2xl">
        <img
          src={caveman404}
          alt="404 Error"
          className="w-full h-auto"
        />
      </div>
      
      {/* Botón debajo del GIF principal */}
      <div className="mb-4">
        <button
          onClick={handleGoBack}
          className="bg-primary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
        >
          BACK UGA-UGA
        </button>
      </div>
    </div>
  );
};

export default Error404;
