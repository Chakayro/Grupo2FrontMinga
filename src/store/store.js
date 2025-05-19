import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { registerReducer } from "./reducers/registerReducer";
import mangasReducer from "./reducers/mangaReducer.js";
import chatReducer from "./reducers/chatReducer.js";

const store = configureStore({
    reducer:{
        auth: authReducer,
        register: registerReducer,
        mangas: mangasReducer,
        chat: chatReducer
    }
})

export default store;