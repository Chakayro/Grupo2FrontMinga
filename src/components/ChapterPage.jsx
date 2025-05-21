import React from "react";
import { Link } from "react-router-dom";

const ChapterPage = ({ _id, title, imageUrl, chapter }) => {
  // Recibimos el _id del capítulo como prop
  const formattedTitle = title?.toLowerCase().includes("chapter")
    ? title
    : `Chapter: ${title}`;

  return (
    <div className="flex items-center gap-4 mb-2">
      <img
        src={imageUrl}
        alt={`Chapter ${title}`}
        className="w-10 h-10 rounded object-cover"
      />
      <div className="flex-grow min-w-0">
        <span className="truncate block">{formattedTitle}</span>
      </div>
      <Link
        to={`/lectura/${_id}`}
        state={{ chapter }}
        className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
      >
        Read
      </Link>
    </div>
  );
};

export default ChapterPage;
