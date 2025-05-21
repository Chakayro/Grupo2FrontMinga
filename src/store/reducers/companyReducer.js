// src/store/reducers/companyReducer.js

import { createReducer } from "@reduxjs/toolkit";
import { createCompany, fetchAllCompanies, resetCompanyCreation } from "../actions/companyAction.js";

const initialCompanyState = {
  company: null,
  companies: [],
  status: 'idle',
  message: null,
  error: null
};

export const companyReducer = createReducer(initialCompanyState, (builder) => {
  builder
    // Crear company
    .addCase(createCompany.pending, (state) => {
      state.status = 'pending';
      state.error = null;
      state.company = null;
      state.message = null;
    })
    .addCase(createCompany.fulfilled, (state, action) => {
      state.status = 'success';
      state.company = action.payload.response;
      state.message = action.payload.message;
    })
    .addCase(createCompany.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      state.company = null;
      state.message = null;
    })

    // Leer todas las companies
    .addCase(fetchAllCompanies.pending, (state) => {
      state.status = 'pending';
      state.error = null;
      state.message = null;
    })
    .addCase(fetchAllCompanies.fulfilled, (state, action) => {
      state.status = 'success';
      state.companies = action.payload.companies
      state.message = action.payload.message;
    })
    .addCase(fetchAllCompanies.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      state.companies = [];
      state.message = null;
    })

    // Reset
    .addCase(resetCompanyCreation, () => {
      return { ...initialCompanyState };
    });
});
