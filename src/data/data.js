// src/data/data.js
// Asegúrate de que las rutas a tus imágenes sean correctas desde la ubicación de este archivo.
// Por ejemplo, si data.js está en src/data/ y tus imágenes en src/assets/.
import HomeImage from "../assets/bgHome.png";
import PanelImage from "../assets/bgPanel.png";
// Importa aquí otras imágenes que necesites

const data = {
  pages: [
    {
      id: "home", // Este ID se usará para coincidir con la ruta, ej: /home
      photo: HomeImage,
      description: "Fondo para la página de inicio"
    },
    {
      id: "panel", // Este ID se usará para coincidir con la ruta, ej: /panel
      photo: PanelImage,
      description: "Fondo para la página del panel"
    },
    // Puedes añadir más objetos de página aquí
    // {
    //   id: "contacto",
    //   photo: ContactoImage,
    //   description: "Fondo para la página de contacto"
    // },
  ],
};

export default data;