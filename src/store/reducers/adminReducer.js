// src/store/reducers/adminReducer.js
import { createReducer } from "@reduxjs/toolkit";
import { fetchAdminPanel, resetAdminPanel } from "../actions/adminAction";

const initialState = {
    authors: [],
    companies: [],
    status: 'idle',
    error: null,
};

export const adminReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(fetchAdminPanel.pending, (state) => {
        state.status = "pending";
        state.error = null;
    })
    .addCase(fetchAdminPanel.fulfilled, (state, { payload }) => {
        state.status    = "succeeded";
        state.authors   = payload.authors;
        state.companies = payload.companies;
    })
    .addCase(fetchAdminPanel.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error  = payload;
    })
    .addCase(resetAdminPanel, () => initialState);
});


