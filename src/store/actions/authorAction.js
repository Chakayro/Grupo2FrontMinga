import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

export const createAuthor = createAsyncThunk(
  "author/create",
  async (dataAutor, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log("author", dataAutor);
      const response = await axios.post(
        "http://localhost:8080/api/author/create",
        dataAutor,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.message || "Error al crear author"
        );
      }
      return rejectWithValue("Error de conexión al crear author");
    }
  }
);

export const fetchAuthorById = createAsyncThunk(
  "author/fetchById",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("No se encontró token de autenticación.");
      }

      const response = await axios.get(
        "http://localhost:8080/api/author/readespecific",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.message || "Error al obtener autor"
        );
      }
      return rejectWithValue("Error de conexión al obtener autor");
    }
  }
);

export const updateAuthor = createAsyncThunk(
  "author/update",
  async ({ idauthor, dataAutor }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("No se encontró token de autenticación.");
      }

      const response = await axios.put(
        `http://localhost:8080/api/author/update/${idauthor}`,
        dataAutor,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.message || "Error al actualizar el autor"
        );
      }
      return rejectWithValue("Error de conexión al actualizar el autor");
    }
  }
);

// NUEVA ACCIÓN: Eliminar Author
export const deleteAuthor = createAsyncThunk(
  "author/delete",
  async (idAuthor, { rejectWithValue }) => {
    // Solo necesitamos el ID del autor
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("No se encontró token de autenticación.");
      }

      const response = await axios.delete(
        `http://localhost:8080/api/author/delete/${idAuthor}`, // Usa el idAuthor en la URL
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.message || "Error al eliminar el autor"
        );
      }
      return rejectWithValue("Error de conexión al eliminar el autor");
    }
  }
);

export const resetAuthorCreation = createAction("author/resetCreation");
