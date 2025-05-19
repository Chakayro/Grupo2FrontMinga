import React, { useState } from "react";

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

// counts: { 1: 3, 2: 0, 3: 1, 4: 0 }
const ReactionButtons = ({ onReact, selected, counts = {} }) => {
  const [active, setActive] = useState(selected || null);

  const handleClick = (id) => {
    let newCount = counts[id] || 0;
    if (active === id) {
      newCount = Math.max(0, newCount - 1);
      setActive(null);
      if (onReact) onReact(id, "remove", newCount);
    } else {
      newCount = newCount + 1;
      setActive(id);
      if (onReact) onReact(id, "add", newCount);
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