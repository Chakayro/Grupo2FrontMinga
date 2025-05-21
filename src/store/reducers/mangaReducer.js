import { createReducer } from "@reduxjs/toolkit";
import {
  fetchMangas,
  fetchMangaById,
  fetchMangasByAuthorId
} from "../actions/mangaAction";

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

  selectedManga: null,
  detailStatus: statusTypes.IDLE,
  detailError: null,

  authorMangas: [],
  authorStatus: statusTypes.IDLE,
  authorError: null,
};

const mangasReducer = createReducer(initialState, (builder) => {
  builder
    // Todos los mangas
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
    })

    // Manga por ID
    .addCase(fetchMangaById.pending, (state) => {
      state.detailStatus = statusTypes.PENDING;
      state.detailError = null;
    })
    .addCase(fetchMangaById.fulfilled, (state, action) => {
      state.selectedManga = action.payload;
      state.detailStatus = statusTypes.SUCCEEDED;
    })
    .addCase(fetchMangaById.rejected, (state, action) => {
      state.detailStatus = statusTypes.FAILED;
      state.detailError = action.payload;
    })

    // Mangas por autorId
    .addCase(fetchMangasByAuthorId.pending, (state) => {
      state.authorStatus = statusTypes.PENDING;
      state.authorError = null;
    })
    .addCase(fetchMangasByAuthorId.fulfilled, (state, action) => {
      state.authorMangas = action.payload;
      state.authorStatus = statusTypes.SUCCEEDED;
    })
    .addCase(fetchMangasByAuthorId.rejected, (state, action) => {
      state.authorStatus = statusTypes.FAILED;
      state.authorError = action.payload;
    });
});

export default mangasReducer;
