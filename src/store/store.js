import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { registerReducer } from "./reducers/registerReducer";
import mangasReducer from "./reducers/mangaReducer.js";

const store = configureStore({
    reducer:{
        auth: authReducer,
        register: registerReducer,
        mangas: mangasReducer
    }
})

export default store;