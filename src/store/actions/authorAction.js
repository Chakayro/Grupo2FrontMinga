import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const createAuthor = createAsyncThunk(
'author/create',
async (
    dataAutor,  
    { rejectWithValue }
) => {
    try {
    const token = localStorage.getItem('token');
    console.log('author',dataAutor);
    
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
        return rejectWithValue(error.response.data.message || 'Error al crear author');
    }
    return rejectWithValue('Error de conexión al crear author');
    }
}
);
export const resetAuthorCreation = createAction('author/resetCreation');
