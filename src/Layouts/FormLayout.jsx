import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";


const MainLayout = () => {
    //Mas adelante se crearan las rutas protegidas pero está la base
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      
    </>
  );
};

export default MainLayout;