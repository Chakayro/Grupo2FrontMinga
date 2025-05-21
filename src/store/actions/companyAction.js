import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const createCompany = createAsyncThunk(
  'company/create',
  async (dataCompany, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Creating company with payload:', dataCompany);

      const response = await axios.post(
        'http://localhost:8080/api/company/create',
        dataCompany,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data; // expected: { response: { ... }, message: "..." }
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

export const fetchAllCompanies = createAsyncThunk(
  'company/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8080/api/company/read');

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.message || 'Failed to fetch companies'
        );
      }
      return rejectWithValue('Network error while fetching companies');
    }
  }
);


export const resetCompanyCreation = createAction('company/resetCreation');
