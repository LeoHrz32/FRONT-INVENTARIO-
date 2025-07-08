import React, { useCallback, useEffect } from 'react';
import MG from "./MiniGaleria.module.css";
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const Modal = ({ show, onClose, image, onNext, onPrev }) => {
    console.log(image)
  const handleOutsideClick = useCallback((e) => {
    if (e.target.classList.contains(MG.modalOverlay)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (show) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [show, handleOutsideClick]);

  if (!show) {
    return null;
  }

  return (
    <div className={MG.modalOverlay}>
      <div className={MG.modalContent}>
        <div className={MG.modalHeader}>
          <h2 className={MG.modalTitle}>{image.categoryId?.name || 'Sin Categoría'}</h2>
          <button className={`${MG.closeButton} hover:text-gray-200`} onClick={onClose} aria-label="Cerrar modal">
            <X size={32} />
          </button>
        </div>
        <div className={MG.modalBody}>
          <button onClick={onPrev} className={`${MG.arrowButton} ${MG.prevButton}`} aria-label="Imagen anterior">
            <ChevronLeft size={24} />
          </button>
          <div className={MG.imageContainer}>
            <img src={image.photoUrl} alt={image.alt || 'Imagen del álbum'} className={MG.modalImage} />
          </div>
          <div className={MG.imageDetails}>
            <p><strong>{image.tittle || 'Desconocido'}</strong></p>
            <p><strong>Año:</strong> {image.photoYear || 'Desconocido'}</p>
            <p className={MG.description}><strong>Descripción:</strong> {image.description || 'Sin descripción'}</p>
          </div>
          <button onClick={onNext} className={`${MG.arrowButton} ${MG.nextButton}`} aria-label="Siguiente imagen">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;