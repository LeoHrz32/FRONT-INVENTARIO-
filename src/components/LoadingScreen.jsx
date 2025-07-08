import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid"></div>
        <p className="text-white mt-4">Cargando...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;