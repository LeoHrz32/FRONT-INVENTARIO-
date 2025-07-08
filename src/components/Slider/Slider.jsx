import { useState } from 'react';
import Slid from './Slider.module.css'; 
import img1 from '../Image/Inicio/img1.jpg';
import img2 from '../Image/Inicio/img2.jpg';
import img3 from '../Image/Inicio/img3.jpg';
import img4 from '../Image/Inicio/img4.jpg';
import uno from "../Image/Galery/2.jpg"
import siete from "../Image/Galery/7.jpg"
import seis from "../Image/Galery/6.jpg"
import tres from "../Image/Galery/3.jpg"


const ImageSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderItems = [
        {
            imgSrc: uno,
            title: 'Patrimonio',
            type: 'Comunal',
            description: 'Revive la historia a través de nuestras imágenes. Esta fotografía captura un emblemático edificio que ha sido testigo de innumerables momentos en nuestra comunidad. Explora más sobre nuestra rica herencia cultural y los hitos que han marcado el camino de la Fundación FEPI a lo largo de los años en nuestra galería histórica. ',
            link: '/patrimonio'
        },
        {
            imgSrc: siete,
            title: 'Artesanía',
            type: 'Local',
            description: 'Explora la creatividad y el esfuerzo comunitario en nuestras ferias de manualidades, donde cada puesto cuenta una historia a través de las manos de nuestros artesanos. Una celebración del talento local y de la tradición artesanal.',
            link: '/artesania'
        },
        {
            imgSrc: seis,
            title: 'Madres',
            type: 'Comunitarias',
            description: 'Revive los momentos llenos de inocencia y camaradería en los comedores infantiles, donde las sonrisas y la solidaridad eran el plato principal. Un retrato conmovedor de nuestra historia compartida.',
            link: '/madres-comunitarias' 
        },
        {
            imgSrc: tres,
            title: 'Historia',
            type: 'Deportiva',
            description: 'Revive los días de gloria en la cancha de la Divina Providencia, donde los grupos deportivos forjaron amistades y rivalidades en cada partido. Una mirada nostálgica a los momentos que definieron nuestra comunidad deportiva.',
            link: '/historia-deportiva'
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % sliderItems.length);
    };

    const prevSlide = () => {
        setCurrentSlide((currentSlide - 1 + sliderItems.length) % sliderItems.length);
    };

    return (
        <div className={Slid.slider}>
            <div className={Slid.list}>
                {sliderItems.map((item, index) => (
                    <div key={index} className={`${Slid.item} ${index === currentSlide ? Slid.active : ''}`}>
                        <img src={item.imgSrc} alt={item.title} />
                        <div className={Slid.content1}>
                            <div className={`${Slid.title1} font-serif`}>{item.title}</div>
                            <div className={`${Slid.type} font-serif`}>{item.type}</div>
                            <div className={`${Slid.description} text-justify`}>{item.description}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={Slid.thumbnail}>
                {sliderItems.map((item, index) => (
                    <div key={index} className={`${Slid.thumbnailItem} ${index === currentSlide ? Slid.active : ''}`}>
                        <img src={item.imgSrc} alt={item.title} />
                    </div>
                ))}
            </div>

            <div className={Slid.nextPrevArrows}>
                <button className={Slid.prev} onClick={prevSlide}> &lt; </button>
                <button className={Slid.next} onClick={nextSlide}> &gt; </button>
            </div>
        </div>
    );
};

export default ImageSlider;
