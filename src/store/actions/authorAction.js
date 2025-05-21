import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Crear autor
export const createAuthor = createAsyncThunk(
  'author/create',
  async (dataAutor, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      console.log('author', dataAutor);

      const response = await axios.post(
        'http://localhost:8080/api/author/create',
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
        return rejectWithValue(error.response.data.message || 'Error creating author');
      }
      return rejectWithValue('Connection error when creating author');
    }
  }
);

export const fetchAllAuthors = createAsyncThunk(
  'author/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8080/api/author/read', {
      });
      
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || 'Error fetching authors');
      }
      return rejectWithValue('Connection error when fetching authors');
    }
  }
);

export const resetAuthorCreation = createAction('author/resetCreation');
