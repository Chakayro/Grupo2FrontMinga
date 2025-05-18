import { createReducer } from "@reduxjs/toolkit";
import { fetchMangas } from "../actions/MangaAction";

export const statusTypes = {
  IDLE: "idle",
  PENDING: "pending",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};

const initialState = {
  mangas: [],
  status: statusTypes.IDLE,
  error: null,
};

const mangasReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchMangas.pending, (state) => {
      state.status = statusTypes.PENDING;
    })
    .addCase(fetchMangas.fulfilled, (state, action) => {
      state.mangas = action.payload;
      state.status = statusTypes.SUCCEEDED;
    })
    .addCase(fetchMangas.rejected, (state, action) => {
      state.status = statusTypes.FAILED;
      state.error = action.payload;
    });
});

export default mangasReducer;