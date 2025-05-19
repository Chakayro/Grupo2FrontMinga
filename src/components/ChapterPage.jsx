const ChapterPage = ({ page, imageUrl, onRead }) => {
  return (
    <div className="flex items-center justify-evenly gap-4 mb-2">
      <img
        src={imageUrl}
        alt={`Page ${page + 1}`}
        className="w-10 h-10 rounded object-cover"
        />
    <span>Page #{page + 1}</span>
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