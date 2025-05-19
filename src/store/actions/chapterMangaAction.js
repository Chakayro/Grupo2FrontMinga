import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChaptersByMangaId = createAsyncThunk(
  "chapters/fetchChaptersByMangaId", 
  async (mangaId, { rejectWithValue }) => { // Recibimos mangaId como argumento
    try {
      const response = await axios.get(`http://localhost:8080/api/chapter/read/${mangaId}`); 

      return response.data.response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error al obtener capítulos del manga");
    }
  }
);
