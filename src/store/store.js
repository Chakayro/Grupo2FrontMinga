import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { registerReducer } from "./reducers/registerReducer";

const store = configureStore({
    reducer:{
        auth: authReducer,
        register: registerReducer
    }
})

export default store;