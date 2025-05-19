import { createAsyncThunk } from "@reduxjs/toolkit";	
import axios from "axios";

export const fetchMangas = createAsyncThunk(
  "mangas/fetchMangas",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8080/api/manga/read");
      return response.data.response; // Ajusta según la estructura de tu API
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error al obtener mangas");
    }
  }
);