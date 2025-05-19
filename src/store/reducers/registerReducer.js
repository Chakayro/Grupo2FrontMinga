// src/store/reducers/registerReducer.js
import { createReducer } from "@reduxjs/toolkit";
import { register, resetRegister } from "../actions/registerAction";

const initialRegisterState = {
    status: 'idle',    
    error: null,
    message: null     
};

export const registerReducer = createReducer(initialRegisterState, (builder) => {
    builder
    .addCase(register.pending, (state) => {
    state.status = 'pending';
    state.error  = null;
    })
    .addCase(register.fulfilled, (state, action) => {
    state.status  = 'success';
    state.message = action.payload.message;  
    })
    .addCase(register.rejected, (state, action) => {
    state.status = 'failed';
    state.error  = action.payload;
    })
    .addCase(resetRegister, () => initialRegisterState);
});
