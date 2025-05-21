import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { registerReducer } from "./reducers/registerReducer";
import mangasReducer from "./reducers/mangaReducer.js";
import chatReducer from "./reducers/chatReducer.js";
import chaptersReducer from "./reducers/chapterMangaReducer.js";
import { authorReducer } from '../store/reducers/authorReducer.js';
import { companyReducer } from "./reducers/companyReducer.js";
import { reactionReducer } from "./reducers/reactionReducer.js";
import { adminReducer } from "./reducers/adminReducer.js";


const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    mangas: mangasReducer,
    chapters: chaptersReducer, 
    author: authorReducer,
    company: companyReducer,
    chat: chatReducer,
    reaction: reactionReducer,
    admin: adminReducer
  }
})

export default store;