import { createReducer } from "@reduxjs/toolkit";
import { fetchChaptersByMangaId } from "../actions/chapterMangaAction"; 

export const statusTypes = {
  IDLE: "idle",
  PENDING: "pending",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};

const initialState = {
  chapters: [], // Cambiamos 'mangas' a 'chapters'
  status: statusTypes.IDLE,
  error: null,
};

const chaptersReducer = createReducer(initialState, (builder) => { // Cambiamos 'mangasReducer'
  builder
    .addCase(fetchChaptersByMangaId.pending, (state) => {
      state.status = statusTypes.PENDING;
    })
    .addCase(fetchChaptersByMangaId.fulfilled, (state, action) => {
      state.chapters = action.payload; // Cambiamos 'mangas' a 'chapters'
      state.status = statusTypes.SUCCEEDED;
    })
    .addCase(fetchChaptersByMangaId.rejected, (state, action) => {
      state.status = statusTypes.FAILED;
      state.error = action.payload;
    });
});

export default chaptersReducer; // Exportamos el nuevo reducer
