import { createReducer } from "@reduxjs/toolkit";
import {
  createAuthor,
  resetAuthorCreation,
  fetchAuthorById,
  updateAuthor,
  deleteAuthor,
} from "../actions/authorAction"; // Importa deleteAuthor

const initialAuthorState = {
  author: null,
  status: "idle",
  message: null,
  error: null,
};

export const authorReducer = createReducer(initialAuthorState, (builder) => {
  builder
    .addCase(createAuthor.pending, (state) => {
      state.status = "pending";
      state.error = null;
      state.author = null;
      state.message = null;
    })
    .addCase(createAuthor.fulfilled, (state, action) => {
      state.status = "success";
      state.author = action.payload.response;
      state.message = action.payload.message;
    })
    .addCase(createAuthor.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      state.author = null;
      state.message = null;
    })
    .addCase(fetchAuthorById.pending, (state) => {
      state.status = "pending";
      state.error = null;
      state.message = null;
    })
    .addCase(fetchAuthorById.fulfilled, (state, action) => {
      state.status = "success";
      state.author = action.payload.response;
      state.message = action.payload.message;
      state.error = null;
    })
    .addCase(fetchAuthorById.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      state.author = null;
      state.message = null;
    })
    .addCase(updateAuthor.pending, (state) => {
      state.status = "pending";
      state.error = null;
      state.message = null;
    })
    .addCase(updateAuthor.fulfilled, (state, action) => {
      state.status = "success";
      state.author = action.payload.response;
      state.message =
        action.payload.message || "Autor actualizado exitosamente!";
      state.error = null;
    })
    .addCase(updateAuthor.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      state.message = null;
    })
    // --- Casos para deleteAuthor (NUEVOS) ---
    .addCase(deleteAuthor.pending, (state) => {
      state.status = "pending"; // O un estado más específico como 'deleting'
      state.error = null;
      state.message = null;
    })
    .addCase(deleteAuthor.fulfilled, (state, action) => {
      state.status = "success"; // Vuelve a idle, o a 'deleted'
      state.author = null; // ¡El autor ha sido eliminado!
      state.message = action.payload.message || "Autor eliminado exitosamente.";
      state.error = null;
      // Opcional: podrías querer limpiar los tokens o redirigir al usuario
      // localStorage.removeItem('token');
      // window.location.href = '/login';
    })
    .addCase(deleteAuthor.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      state.message = null;
    })
    .addCase(resetAuthorCreation, () => {
      return { ...initialAuthorState };
    });
});
