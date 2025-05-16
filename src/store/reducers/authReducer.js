import { createReducer } from "@reduxjs/toolkit";
import { login, setUser, logout} from "../actions/authAction";


const initialState = {
user: null,
token: null,
status: 'idle', //pending, success, success, failed
error: null
}

export const authReducer = createReducer(initialState, (builder) => {
    builder.addCase(login.pending, (state) => {
        state.status = 'pending';
        state.error = null;
        state.user = null;
        state.token = null;
    })
    builder.addCase(login.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload.user;
        state.token = action.payload.token;
    })
    builder.addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.user = null;
        state.token = null;
    })
    builder.addCase(setUser, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
    })
    builder.addCase(logout, (state) => {
        state.user = null;
        state.token = null;
    })

})