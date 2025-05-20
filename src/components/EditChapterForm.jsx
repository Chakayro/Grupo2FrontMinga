const ChevronDownIcon = () => (<svg
    className="w-3 h-3 text-gray-400 pointer-events-none"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
>
    <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M19 9l-7 7-7-7"
    />
</svg>
);

function EditChapterForm({ comicCoverImageUrl }) {
    const chapterDetails = {
    mangaName: "",
    titleOfTheChapter: "",
    selectedChapter: "",
    selectedDataField: "",
    dataToEdit: "",
    comicTitleAboveImage: "Chapter #1 - Discover the word"
    };

    const pcFormInputClasses =
    "w-full p-2 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-lg";

    const pcButtonClasses =
    "w-full font-semibold py-3 px-3 rounded-full transition-colors shadow-xs text-lg";

    return (
    <div className="w-8/12 md:w-full max-w-3xl py-1">
    <div className="flex flex-col md:flex-row md:justify-between md:items-stretch gap-4 md:gap-6 lg:gap-60">
        <div className="w-full md:w-[55%] lg:w-[50%] flex flex-col space-y-1.5 order-1 md:order-1 p-1">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-7 text-center md:text-left">
            Edit Chapter
        </h2>

        <div>
            <input
            type="text"
            defaultValue={chapterDetails.mangaName}
            placeholder="name of the manga"
            className={pcFormInputClasses}
            />
        </div>

        <div>
            <input
            type="text"
            defaultValue={chapterDetails.titleOfTheChapter}
            placeholder="title of the chapter"
            className={pcFormInputClasses}
            />
        </div>

        <div className="relative">
            <select
            defaultValue={chapterDetails.selectedChapter}
            className={`${pcFormInputClasses} appearance-none pr-6`}
            >
            <option value="" disabled>
                select chapter
            </option>
            <option value="1">Chapter 1</option>
            <option value="2">Chapter 2</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-1.5">
            <ChevronDownIcon />
            </div>
        </div>

        <div className="relative">
            <select
            defaultValue={chapterDetails.selectedDataField}
            className={`${pcFormInputClasses} appearance-none pr-6`}
            >
            <option value="" disabled>
                select data
            </option>
            <option value="title">Title</option>
            <option value="pages">Pages</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-1.5">
            <ChevronDownIcon />
            </div>
        </div>

        <div>
            <input
            type="text"
            defaultValue={chapterDetails.dataToEdit}
            placeholder="data to edit"
            className={pcFormInputClasses}
            />
        </div>

        <div className="pt-2 space-y-3">
            <button
            type="button"
            className={`${pcButtonClasses} bg-teal-400 hover:bg-teal-500 text-white`}
            >
            Edit
            </button>
            <button
            type="button"
            className={`${pcButtonClasses} bg-pink-100 hover:bg-pink-200 text-red-500`}
            >
            Delete
            </button>
        </div>
        </div>

        <div className="w-full md:w-[50%] flex flex-col items-center order-2 md:order-2 md:justify-start pt-2 md:pt-0 hidden md:flex">
        <div className="flex flex-col items-center w-full h-full">
            {comicCoverImageUrl && (
            <p className="text-[10px] sm:text-xs text-gray-600 mb-1 text-center">
                {chapterDetails.comicTitleAboveImage}
            </p>
            )}
            <img
            src={
                comicCoverImageUrl ||
                "https://via.placeholder.com/300x450.png?text=Cover+Preview"
            }
            alt="Comic Cover"
            className="w-full max-w-xs sm:max-w-sm md:max-w-full h-auto md:h-full object-contain rounded shadow-md border border-gray-200"
            />
        </div>
        </div>
    </div>
    </div>
    );
}

export default EditChapterForm; 