// src/data/data.js
import HomeImage from "../assets/bgHome.png";
import PanelImage from "../assets/bgPanel.png";
import MangasImage from "../assets/bgMangas.png";
import ManagerImage from "../assets/bgManager.png";
import AuthorImage from "../assets/bgAuthor.png";


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
    {
      id: "mangas", // Este ID se usará para coincidir con la ruta, ej: /manga
      photo: MangasImage,
      description: "Fondo para la página de manga"
    },
    {
      id: "manager", // Este ID se usará para coincidir con la ruta, ej: /manager
      photo: ManagerImage,
      description: "Fondo para la página de manager"
    },
    {
      id: "author", // Este ID se usará para coincidir con la ruta, ej: /author
      photo: AuthorImage,
      description: "Fondo para la página de autor"
    },
  ],
};

export default data;