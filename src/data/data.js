// src/data/data.js
import HomeImage from "../assets/backgroundPrincipal.png";
import PanelImage from "../assets/backgroundpanel.png";
import MangasImage from "../assets/mangasgeneral.png";
import ManagerImage from "../assets/mymangas.png";
import AuthorImage from "../assets/backgroundProfile.png";


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
      id: "Autores", // Este ID se usará para coincidir con la ruta, ej: /author
      photo: AuthorImage,
      description: "Fondo para la página de autor"
    },
  ],
};

export default data;