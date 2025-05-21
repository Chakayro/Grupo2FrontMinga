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

export const fetchMangaById = createAsyncThunk(
  "manga/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response  = await axios.get(`http://localhost:8080/api/manga/read/${id}`);
      return response.data.response;   // asume que tu backend devuelve { manga: {…} }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch failed");
    }
  }
);



export const fetchMangasByAuthorId = createAsyncThunk(
  "mangas/fetchByAuthorId",
  async (_, { rejectWithValue }) => { 
    try {
      
      const token = localStorage.getItem('token'); 
      if (!token) {
        return rejectWithValue("No se encontró token de autenticación. Por favor, inicia sesión.");
      }
      const config = {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      };
      const response = await axios.get(`http://localhost:8080/api/manga/readEspecific`, config);
      
      console.log("Respuesta del nuevo endpoint (fetchMangasByAuthorId):", response.data);
      return response.data.response; 
    } catch (error) {
      console.error("Error al obtener mangas del autor:", error.response?.data?.message || error.message);
    
      return rejectWithValue(error.response?.data?.message || "Error al obtener mangas del autor");
    }
  }
);