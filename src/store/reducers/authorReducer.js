import { createReducer } from "@reduxjs/toolkit";
import { createAuthor, resetAuthorCreation, getAuthor } from "../actions/authorAction";

const initialAuthorState = {
  author: null,   
  status: 'idle', 
  message: null,
  error: null     
};

export const authorReducer = createReducer(initialAuthorState, (builder) => {
builder
    .addCase(createAuthor.pending, (state) => {
    state.status = 'pending';
    state.error = null;
    state.author = null;
    state.message = null;
    })
    .addCase(createAuthor.fulfilled, (state, action) => {
    state.status = 'success';
    state.author = action.payload.response;
    state.message = action.payload.message;
    })
    .addCase(createAuthor.rejected, (state, action) => {
    state.status = 'failed';
    state.error = action.payload;
    state.author = null;
    state.message = null;
    })

    .addCase(getAuthor.fulfilled , (state)=>{
      state.status = "succeded"
    })

    .addCase(resetAuthorCreation, () => {
    return { ...initialAuthorState };
    });
});
