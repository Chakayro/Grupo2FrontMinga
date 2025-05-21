import { createReducer } from "@reduxjs/toolkit";
import { createAuthor, fetchAllAuthors, resetAuthorCreation } from "../actions/authorAction.js";

const initialAuthorState = {
  author: null,  
  authors: [],   
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
    .addCase(fetchAllAuthors.pending, (state) => {
      state.status = 'pending';
      state.error = null;
      state.authors = [];
      state.message = null;
    })
    .addCase(fetchAllAuthors.fulfilled, (state, action) => {
      state.status = 'success';
      state.authors = action.payload
      state.message = action.payload.message
    })
    .addCase(fetchAllAuthors.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      state.authors = [];
      state.message = null;
    })
    .addCase(resetAuthorCreation, () => {
      return { ...initialAuthorState };
    })
});
