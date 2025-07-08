import React, { useState, useEffect } from 'react';
import MG from "./MiniGaleria.module.css";
import Title from "../Title/Title";
import { useGalery } from '../../context/galery/galeryContext';
import Modal from './Modal';
import Pagination from '../../components/table/Pagination';

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { photos, getAllGalery } = useGalery();
  const [currentAlbumPhotos, setCurrentAlbumPhotos] = useState([]);
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);

  useEffect(() => {
    getAllGalery();
  }, []);

  const handleAlbumClick = (albumPhotos) => {
    setCurrentAlbumPhotos(albumPhotos);
    setCurrentAlbumIndex(0);
    setSelectedImage(albumPhotos[0]);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const nextImage = () => {
    const newIndex = (currentAlbumIndex + 1) % currentAlbumPhotos.length;
    setCurrentAlbumIndex(newIndex);
    setSelectedImage(currentAlbumPhotos[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (currentAlbumIndex - 1 + currentAlbumPhotos.length) % currentAlbumPhotos.length;
    setCurrentAlbumIndex(newIndex);
    setSelectedImage(currentAlbumPhotos[newIndex]);
  };

  const groupedPhotos = photos.reduce((albums, photo) => {
    if (photo.active && photo.categoryId?.state) {
      const albumName = photo.categoryId?.name || 'Sin Categoría';
      if (!albums[albumName]) {
        albums[albumName] = [];
      }
      albums[albumName].push(photo);
    }
    return albums;
  }, {});

  const albumsArray = Object.entries(groupedPhotos).filter(([_, photos]) => photos.length > 0);

  // Validación para que currentPage no sobrepase el número total de páginas
  const totalAlbums = albumsArray.length;
  const totalPages = Math.ceil(totalAlbums / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const indexOfLastAlbum = currentPage * itemsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - itemsPerPage;
  const currentAlbums = albumsArray.slice(indexOfFirstAlbum, indexOfLastAlbum);

  const handlePaginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <div className={MG.Gallery}>
        <div className={MG.TitleGallery}>
          <Title title="Galería Histórica" />
          <p className='text-black w-[100%] text-center font-medium text-2xl mb-5'>Explora nuestros álbumes de fotos agrupados por categoría.</p>
        </div>
        <div className={MG.GalleryGrid}>
          {currentAlbums.map(([albumName, albumPhotos], index) => (
            <div key={index} className={MG.Album} onClick={() => handleAlbumClick(albumPhotos)}>
              <div className={MG.AlbumCover}>
                <img 
                  alt={albumName}
                  src={albumPhotos[0]?.photoUrl}
                  className={MG.CoverImage}
                />
                <div className={MG.AlbumOverlay}>
                  <span className={MG.PhotoCount}>{albumPhotos.length} fotos</span>
                </div>
              </div>
              <h3 className={MG.AlbumTitle}>{albumName}</h3>
            </div>
          ))}
        </div>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalAlbums}
          onPageChange={handlePaginate}  
          currentPage={currentPage}
        />
      </div>
      <Modal 
        show={showModal} 
        onClose={closeModal} 
        image={selectedImage} 
        onNext={nextImage} 
        onPrev={prevImage} 
      />
    </>
  );
}
