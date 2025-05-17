const CategoryButton = ({ label, color, activeColor, textColor, active, onClick }) => (
  <button
    className={`px-4 py-1 rounded-full text-sm font-semibold transition
      ${active ? `${activeColor} text-white` : `${color} ${textColor}`}
      border-none outline-none`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default CategoryButton;