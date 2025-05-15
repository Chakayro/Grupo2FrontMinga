
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import './MangaCarousel.css'; // Tus estilos personalizados

// El componente ahora recibe 'slides' como prop
const MangaCarousel = ({ slides }) => {
  if (!slides || slides.length === 0) {
    return <p>No hay mangas para mostrar en este momento.</p>; // O algún placeholder
  }

  return (
    <div className="manga-carousel-container">
      <Swiper
        modules={[Navigation, EffectFade, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        loop={slides.length > 1} // Loop solo si hay más de un slide
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="myMangaSwiper"
      >
        {slides.map((manga, index) => (
          // Estrategia para la key:
          // 1. Ideal: manga.id (cuando venga del backend)
         
          <SwiperSlide key={manga.title || index} className="manga-slide">
            <div className="slide-content-wrapper">
              <div className="slide-image-container">
                <img src={manga.cover_photo} alt={manga.title} />
              </div>
              <div className="slide-text-container">
              <h2>{manga.category_id?.toUpperCase() || 'SIN CATEGORÍA'}</h2>
                <h2>{manga.title}</h2>
                <p>{manga.description}</p>
                
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MangaCarousel;