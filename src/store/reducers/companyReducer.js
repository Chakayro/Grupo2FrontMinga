import { createReducer } from "@reduxjs/toolkit";
import { createCompany, resetCompanyCreation } from "../actions/companyAction";

const initialCompanyState = {
    company: null, 
    status: 'idle',  
    message: null,   
    error: null     
};
export const companyReducer = createReducer(initialCompanyState, (builder) => {
builder
    .addCase(createCompany.pending, (state) => {
    state.status = 'pending';
    state.error = null;
    state.company = null;
    state.message = null;
    })
    .addCase(createCompany.fulfilled, (state, action) => {
    state.status = 'success';
    state.company = action.payload.company;
    state.message = action.payload.message;
    })
    .addCase(createCompany.rejected, (state, action) => {
    state.status = 'failed';
    state.error = action.payload;
    state.company = null;
    state.message = null;
    })
    .addCase(resetCompanyCreation, () => {
    return { ...initialCompanyState };
    });
});
