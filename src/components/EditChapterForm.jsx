import { useSelector, useDispatch } from 'react-redux';
import MyComiccomiCover from '../assets/naruto.png';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchChaptersByMangaId } from '../store/actions/chapterMangaAction.js';
import { fetchMangaById } from '../store/actions/mangaAction.js';

const ChevronDownIcon = () => (
    <svg
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

function EditChapterForm() {
    const token = useSelector(state => state.auth.token);

    const dispatch = useDispatch();
    const { id } = useParams();

    const manga = useSelector((state) => state.mangas?.selectedManga);
    const mangaF = manga?.cover_photo
    const chapter = useSelector((state) => state.chapters?.chapters);

    const [selectedChapterId, setSelectedChapterId] = useState("");
    const [chapterTitle, setChapterTitle] = useState("");
    const [selectedField, setSelectedField] = useState("");
    const [dataToEdit, setDataToEdit] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    useEffect(() => {
        if (id) {
            dispatch(fetchChaptersByMangaId(id));
            dispatch(fetchMangaById(id));
        }
    }, [dispatch, id]);

    const pcFormInputClasses =
        "w-full p-2 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-lg";
    const pcButtonClasses =
        "w-full font-semibold py-3 px-3 rounded-full transition-colors shadow-xs text-lg";

    const handleChapterChange = (e) => {
        const selectedId = e.target.value;
        setSelectedChapterId(selectedId);
        const selected = chapter?.find(ch => ch._id === selectedId);
        setChapterTitle(selected?.title || "");
    };

    const handleEdit = async () => {
        if (!selectedChapterId || !selectedField || !dataToEdit) {
            setMessage("Please fill out all fields");
            setMessageType("error");
            return;
        }

        const body = {
            [selectedField]: dataToEdit
        };

        try {
            const response = await fetch(`http://localhost:8080/api/chapter/update/${selectedChapterId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error("Error updating the chapter");
            }

            setMessage("Chapter updated successfully");
            setMessageType("success")

            if (selectedField === "title") {
                setChapterTitle(dataToEdit)
            }

            setDataToEdit("")
            setSelectedField("")

        } catch (error) {
            console.error(error)
            setMessage("An error occurred while editing")
        }
    };

    const handleDelete = async () => {
        if (!selectedChapterId) {
            setMessage("Please select a chapter to delete")
            setMessageType("error")
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/chapter/delete/${selectedChapterId}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Error deleting the chapter")
            }

            setMessage("Chapter deleted successfully")
            setMessageType("success")

            setSelectedChapterId("")
            setChapterTitle("")
            setSelectedField("")
            setDataToEdit("")

            dispatch(fetchChaptersByMangaId(id));

        } catch (error) {
            console.error(error);
            setMessage("An error occurred while deleting")
        }
    };
    console.log(manga );
    
    console.log(mangaF);
    

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
                            defaultValue={manga?.title || ""}
                            placeholder="Name of the manga"
                            className={pcFormInputClasses}
                            readOnly
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            value={chapterTitle}
                            onChange={(e) => setChapterTitle(e.target.value)}
                            placeholder="Title of the chapter"
                            className={pcFormInputClasses}
                            readOnly
                        />
                    </div>

                    <div className="relative">
                        <select
                            value={selectedChapterId}
                            onChange={handleChapterChange}
                            className={`${pcFormInputClasses} appearance-none pr-6`}
                        >
                            <option value="">Select chapter</option>
                            {chapter?.map((chapter) => (
                                <option key={chapter._id} value={chapter._id}>
                                    {chapter.order}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-1.5">
                            <ChevronDownIcon />
                        </div>
                    </div>

                    <div className="relative">
                        <select
                            value={selectedField}
                            onChange={(e) => setSelectedField(e.target.value)}
                            className={`${pcFormInputClasses} appearance-none pr-6`}
                        >
                            <option value="" disabled>
                                Select data to edit
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
                            value={dataToEdit}
                            onChange={(e) => setDataToEdit(e.target.value)}
                            placeholder="New data"
                            className={pcFormInputClasses}
                        />
                    </div>

                    {message && (
                        <h2 className={`text-center text-sm font-medium ${messageType === "success" ? "text-green-600" : "text-red-600"}`}>
                            {message}
                        </h2>
                    )}

                    <div className="pt-2 space-y-3">
                        <button
                            type="button"
                            onClick={handleEdit}
                            className={`${pcButtonClasses} bg-teal-400 hover:bg-teal-500 text-white`}
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className={`${pcButtonClasses} bg-pink-100 hover:bg-pink-200 text-red-500`}
                        >
                            Delete
                        </button>
                    </div>
                </div>

                <div className="w-full md:w-[50%] flex flex-col items-center order-2 md:order-2 md:justify-start pt-2 md:pt-0 hidden md:flex">
                    <div className="flex flex-col items-center w-full h-full">
                        {mangaF && (
                            <p className="text-[10px] sm:text-xs text-gray-600 mb-1 text-center">
                                {manga.title || ""}
                            </p>
                        )}
                        <img
                            src={mangaF}
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
