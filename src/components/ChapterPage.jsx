const ChapterPage = ({ title, imageUrl, onRead }) => {
  const formattedTitle = title?.toLowerCase().includes('chapter') ? title : `Chapter: ${title}`;

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
      <button
        onClick={() => onRead(imageUrl)}
        className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
      >
        Read
      </button>
    </div>
  );
};

export default ChapterPage; 