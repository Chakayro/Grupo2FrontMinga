const CategoryButton = ({ category_id, color, activeColor, textColor, active, onClick, label }) => {
  // Si el color es un hex (empieza con #), úsalo en style. Si no, usa Tailwind.
  const isHex = typeof color === "string" && color.startsWith("#");
  const bgColor = active ? activeColor : color;

  return (
    <button
      className={`px-4 py-1 rounded-full text-sm font-semibold transition border-none outline-none
        ${!isHex ? (active ? `${activeColor} text-white` : `${color} ${textColor}`) : ""}
      `}
      style={isHex ? { background: bgColor, color: "#fff" } : {}}
      onClick={onClick}
    >
      {label || category_id}
    </button>
  );
};

export default CategoryButton;