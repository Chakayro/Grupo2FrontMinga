import { createReducer } from "@reduxjs/toolkit";
import { fetchMangas, fetchMangaById } from "../actions/mangaAction";

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
  // detalle de un solo manga
  selectedManga: null,
  detailStatus: statusTypes.IDLE,
  detailError: null,
};

const mangasReducer = createReducer(initialState, (builder) => {
  builder
    // listado de mangas
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
    // detalle de manga por ID
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
    });
});

export default mangasReducer;
