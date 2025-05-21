// src/store/actions/adminAction.js
import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk para leer authors y companies en paralelo
export const fetchAdminPanel = createAsyncThunk(
    "admin/fetchPanel",
    async (_, { rejectWithValue }) => {
    try {
    const token = localStorage.getItem('token');
      // Disparamos ambas peticiones en paralelo
    const [authorsRes, companiesRes] = await Promise.all([
        axios.get("http://localhost:8080/api/author/read",
        {
            headers: {
            Authorization: `Bearer ${token}`,
        }
        }
        ),
        axios.get("http://localhost:8080/api/company/read", 
        {
            headers: {
            Authorization: `Bearer ${token}`,
        }
        }
        ),
        ]);
        return {
        authors: authorsRes.data.authors,
        companies: companiesRes.data.companies,
        };
    } catch (err) {
        if (err.response) {
        return rejectWithValue(err.response.data.message || err.response.data);
        }
        return rejectWithValue("error reading author and compnay");
    }
    }
);
export const resetAdminPanel = createAction("admin/resetPanel");
