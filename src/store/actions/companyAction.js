import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to create a company
export const createCompany = createAsyncThunk(
'company/create',
async (
    dataCompany,              // expects an object with company fields
    { rejectWithValue }
) => {
    try {
    const token = localStorage.getItem('token');
    console.log('Creating company with payload:', dataCompany);

    const response = await axios.post(
        'http://localhost:8080/api/company/create',  // adjust if your endpoint differs
        dataCompany,
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        }
    );

      return response.data;  // e.g. { company: {...} }
    } catch (error) {
    if (error.response && error.response.data) {
        return rejectWithValue(
        error.response.data.message || 'Failed to create company'
        );
    }
    return rejectWithValue('Network error while creating company');
    }
}
);

// Action to reset the creation state
export const resetCompanyCreation = createAction('company/resetCreation');
