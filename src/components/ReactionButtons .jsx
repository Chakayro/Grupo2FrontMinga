import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReaction, resetReaction } from "../store/actions/reactionAction";
import { fetchMangaById } from "../store/actions/mangaAction";

const reactions = [
  { id: 1, emoji: "👍", label: "Like" },
  { id: 2, emoji: "👎", label: "Dislike" },
  { id: 3, emoji: "😮", label: "Surprised" },
  { id: 4, emoji: "😍", label: "Love" },
];

const baseStyle =
  "flex items-center justify-center w-14 h-14 rounded-full shadow bg-white transition-all duration-200 border border-gray-200 text-2xl focus:outline-none relative";
const activeStyle = "scale-130 bg-orange-100 border-orange-400";
const badgeStyle =
  "absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow";

const ReactionButtons = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((s) => s.reaction);
  const { selectedManga: manga } = useSelector((s) => s.mangas);
  const mangaId = manga._id;

  useEffect(() => {
    if (status === "success" && mangaId) {
      dispatch(fetchMangaById(mangaId));
      dispatch(resetReaction());
    }
  }, [status, dispatch, mangaId]);

  const counts = manga.reaction.reduce((acc, { id, count }) => {
    acc[id] = count;
    return acc;
  }, {});

  // estado local para animar el botón
  const [active, setActive] = useState(null);

  const handleClick = (id) => {
    // disparo la petición
    dispatch(createReaction({ mangaId, reaction: id }));

    // enciendo la animación
    setActive(id);
    setTimeout(() => {
      setActive(null);
    }, 900);
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-2">
      {reactions.map((r) => (
        <div key={r.id} className="relative flex flex-col items-center">
          <button
            type="button"
            aria-label={r.label}
            className={`${baseStyle} ${active === r.id ? activeStyle : ""}`}
            onClick={() => handleClick(r.id)}
          >
            {r.emoji}
            {counts[r.id] > 0 && (
              <span className={badgeStyle}>{counts[r.id]}</span>
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReactionButtons;
