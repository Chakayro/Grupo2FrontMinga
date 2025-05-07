// pages/Home.jsx
import React from 'react';
import HeroImagen from '../components/HeroImagen.jsx';
import Carrusel from '../components/Carrusel.jsx';
import backgroundPrincipal from "../assets/backgroundPrincipal.png";

const Home = () => {
  const items = [
    {
      titulo: "Kagurabachi",
      descripcion:
        "Chihiro Rokuhira busca vengar la muerte de su padre y recuperar las espadas encantadas robadas por un grupo de hechiceros.",
      imagen: "https://wallpaperaccess.com/full/13420931.jpg",
    },
    {
      titulo: "Gachiakuta",
      descripcion:
        "Rudo, exiliado injustamente, lucha contra bestias de basura en un mundo distópico, utilizando objetos comunes imbuidos de poder.",
      imagen: "https://tse1.mm.bing.net/th/id/OIP.fxDI3IRxyh31l4BfHCns4gHaLZ?cb=iwp1&rs=1&pid=ImgDetMain",
    },
    {
      titulo: "Astro Royale",
      descripcion:
        "Hibaru Yotsurugi, heredero de un clan yakuza, obtiene poderes sobrenaturales tras una lluvia de meteoritos, desatando una guerra entre clanes.",
      imagen: "https://lavacajaponesa.com/wp-content/uploads/2024/01/Astro-Royale-1.jpg",
    },
    {
      titulo: "The Barbarian's Bride",
      descripcion:
        "Una princesa guerrera se casa con un rey bárbaro, enfrentando desafíos en un mundo de fantasía oscura y romance.",
      imagen: "https://tse4.mm.bing.net/th/id/OIP.C-61RgVE8axKtUZlK4epNwHaKd?cb=iwp1&rs=1&pid=ImgDetMain",
    },
    {
      titulo: "The Blue Wolves of Mibu",
      descripcion:
        "Nio se une a los Miburo, un grupo de espadachines en el Japón feudal, buscando justicia y un cambio en el mundo.",
      imagen: "https://tse3.mm.bing.net/th/id/OIP.ebze6hQ79mbJd5UNqSyXrQAAAA?cb=iwp1&rs=1&pid=ImgDetMain",
    },
  ];
  

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* HeroImagen - con altura completa en móviles */}
      <div className="md:aspect-[1440/644] h-screen md:h-auto">
      <HeroImagen imagenFondo={backgroundPrincipal}>
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold">For the love of manga</h1>
            <p className="mt-2">Explore our varieties</p>
            <button className="mt-4 bg-white text-orange-500 font-bold px-6 py-2 rounded">
              Sign In!
            </button>
          </div>
        </HeroImagen>
      </div>

      {/* Carrusel visible solo en md+ */}
      {/* <div className="hidden md:block">
        <Carrusel items={items} />
      </div> */}
    </div>
  );
};

export default Home;
