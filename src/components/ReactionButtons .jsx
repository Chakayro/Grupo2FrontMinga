import { useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { createReaction } from "../store/actions/reactionAction";



const reactions = [
  { id: 1, emoji: "👍", label: "Like" },
  { id: 2, emoji: "👎", label: "Dislike" },
  { id: 3, emoji: "😮", label: "Surprised" },
  { id: 4, emoji: "😍", label: "Love" },
];


const baseStyle =
  "flex items-center justify-center w-14 h-14 rounded-full shadow bg-white transition-all duration-200 border border-gray-200 text-2xl focus:outline-none relative";

const activeStyle =
  "scale-130 bg-orange-100 border-orange-400";

const badgeStyle =
  "absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow";


const ReactionButtons = ({ manga }) => {
  const {data} = useSelector((state) => state.reaction);
  console.log("data", data);
  
  const dispatch = useDispatch();
  const mangaRecibido = manga
  const mangaId = mangaRecibido._id  
  const counts = mangaRecibido.reaction.reduce((acc, { id, count }) => {
  acc[id] = count;
  return acc;
}, {});
  const [active, setActive] = useState(null);
  
  const handleClick = (id) => {
    if (active === id) {
      setActive(null);
      dispatch(createReaction({mangaId,reaction:id}))
      ;
    } else {
      setActive(id);
      dispatch(createReaction({mangaId,reaction:id}))

      
    }
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