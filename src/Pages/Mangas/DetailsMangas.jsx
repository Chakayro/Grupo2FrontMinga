import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const DetailsMangas = () => {
  const { id } = useParams();
  const mangas = useSelector((state) => state.mangas.mangas);
  const manga = mangas.find((m) => m._id === id);

  if (!manga) {
    return (
      <div
        style={{
          height: "300px",
          width: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f3f3f3",
          borderRadius: "16px",
          margin: "40px auto",
        }}
      >
        <span className="text-gray-500 text-lg">Manga no encontrado.</span>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "300px",
        width: "600px",
        background: "#fff",
        borderRadius: "16px",
        margin: "40px auto",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <h2 className="text-2xl font-bold">{manga.title}</h2>
      <div><b>ID:</b> {manga._id}</div>
      <div><b>Descripción:</b> {manga.description}</div>
      <div><b>Categoría:</b> {manga.category_id?.name}</div>
      <div><b>Autor:</b> {manga.author_id?.name}</div>
    </div>
  );
};

export default DetailsMangas;