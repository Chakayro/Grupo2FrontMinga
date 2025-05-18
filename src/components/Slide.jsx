import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';




const MangaCarousel = ({ slides }) => {
  if (!slides || slides.length === 0) {
    return <p>No hay mangas para mostrar en este momento.</p>; 
  }

  return (
    <div className="manga-carousel-container bg-[#FF6600] rounded-lg my-10 mx-7 w-auto h-[40vh] overflow-hidden md:my-20 md:mx-15 md:h-[50vh] lg:overflow-visible relative">
      <Swiper
        modules={[Navigation, EffectFade, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        loop={slides.length > 1}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        className="!overflow-visible"
      >
        {slides.map((manga, index) => (
          <SwiperSlide key={manga.title || index} className="!overflow-visible">
            <div className="container-slide flex flex-col h-full w-full md:flex-row md:justify-center md:items-center lg:relative !overflow-visible">
              
              <div className="image-container h-full w-full flex items-center justify-center md:w-1/2 md:justify-end
                lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2 lg:flex lg:items-center lg:justify-center lg:z-10 lg:overflow-visible pointer-events-none">
                <img 
                  src={manga.cover_photo} 
                  alt={manga.title} 
                  className="object-contain h-[250px] w-[210px] md:h-[50vh] md:w-[80%] lg:h-[56vh] lg:w-[40%] lg:object-cover lg:rounded-2xl lg:-translate-y-13" 
                /> 
              </div>
              
              <div className="text-container
                absolute text-white gap-1 pb-2 h-full w-full
                md:relative md:w-1/2 flex flex-col justify-end lg:justify-center
                lg:static lg:w-[45%] lg:h-[50vh] lg:overflow-hidden lg:z-20
                lg:items-start lg:text-left lg:translate-x-50 xl:translate-x-75">
                <h2 className="text-lg md:text-2xl lg:text-3xl font-bold tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  {manga.category_id.name?.toUpperCase() || 'SIN CATEGORÍA'}
                </h2>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  {manga.title}
                </h2>
                <div className="relative max-h-[30%] overflow-hidden lg:max-h-[40%]">
                  <p className='hidden lg:block text-lg font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                    lg:w-full lg:text-left lg:px-4 lg:max-w-[90%] lg:mx-0
                    line-clamp-3'>
                    {manga.description}
                  </p>
                  <div className="absolute bottom-0 left-0 w-full h-5 bg-gradient-to-t from-[#FF6600] to-transparent"></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MangaCarousel;