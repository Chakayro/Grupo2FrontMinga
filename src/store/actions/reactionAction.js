import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to create/toggle a reaction
export const createReaction = createAsyncThunk(
'reaction/create',
async ({ mangaId, reaction }, { rejectWithValue }) => {
    try {
    const token = localStorage.getItem('token');
    const url   = `http://localhost:8080/api/reaction/create/${mangaId}`;
    const body  = { reaction };

    const response = await axios.post(
        url,
        body,
        {
        headers: {
            Authorization: `Bearer ${token}`
        }
        }
        );

        return response.data;
    } catch (err) {
        if (err.response) {
        return rejectWithValue(err.response.data);
    }
    return rejectWithValue({ message: 'Error creating reaction' });
    }
    }
);

export const resetReaction = createAction('reaction/reset');
