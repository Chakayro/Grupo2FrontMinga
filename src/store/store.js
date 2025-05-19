import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { registerReducer } from "./reducers/registerReducer";
import mangasReducer from "./reducers/mangaReducer.js";
import {authorReducer} from '../store/reducers/authorReducer.js'
import { companyReducer } from "./reducers/companyReducer.js";
const store = configureStore({
    reducer:{
        auth: authReducer,
        register: registerReducer,
        mangas: mangasReducer,
        author: authorReducer,
        company: companyReducer
    }
})

export default store;