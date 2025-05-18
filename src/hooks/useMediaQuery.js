// src/hooks/useMediaQuery.js
import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
  // Intenta obtener el estado inicial de forma segura, por si window no está disponible (SSR)
  const getMatches = (query) => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState(getMatches(query));

  useEffect(() => {
    // Asegúrate de que window está definido (para evitar errores en SSR o entornos no-navegador)
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQueryList = window.matchMedia(query);
    const listener = (event) => setMatches(event.matches);

    // Actualiza el estado al montar por si la query cambió o el estado inicial era incorrecto
    setMatches(mediaQueryList.matches);

    // Soporte para addEventListener y removeEventListener (moderno)
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener);
    } else {
      // Fallback para navegadores más antiguos (ej. Safari < 14)
      mediaQueryList.addListener(listener);
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', listener);
      } else {
        mediaQueryList.removeListener(listener);
      }
    };
  }, [query]); // Vuelve a ejecutar si la query cambia

  return matches;
};

export default useMediaQuery;
