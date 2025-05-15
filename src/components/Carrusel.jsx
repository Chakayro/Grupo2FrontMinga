import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function GenreSlider({ 
  slides, 
  backgroundColor = "bg-orange-500", 
  textColor = "text-white",
  height = "h-64"
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Si no hay slides, no renderizar nada
  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div className={`relative w-full ${backgroundColor} ${textColor}`}>
      <div className={`flex items-center ${height}`}>
        {/* Left navigation */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 z-10 h-8 w-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center hover:bg-opacity-50 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        
        {/* Character image */}
        <div className="w-1/3 h-full relative">
          <img 
            src={slides[currentSlide].cover_photo} 
            alt={`Character for ${slides[currentSlide].title}`} 
            className="absolute bottom-0 h-full object-contain"
          />
        </div>
        
        {/* Group image */}
        <div className="w-1/3 h-full flex items-center justify-center">
          <img 
            src={slides[currentSlide].cover_photo} 
            alt={slides[currentSlide].title} 
            className="h-56 object-contain"
          />
        </div>
        
        {/* Text content */}
        <div className="w-1/3 px-6">
          <h2 className="text-3xl font-bold mb-2">{slides[currentSlide].title}</h2>
          <p className="text-sm">{slides[currentSlide].description}</p>
        </div>
        
        {/* Right navigation */}
        <button 
          onClick={nextSlide}
          className="absolute right-4 z-10 h-8 w-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center hover:bg-opacity-50 transition-all"
        >
          <ChevronRight size={24} />
        </button>
        
        {/* Solo mostrar indicadores si hay más de un slide */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full transition-all ${currentSlide === index ? 'bg-white w-4' : 'bg-white/50'}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}