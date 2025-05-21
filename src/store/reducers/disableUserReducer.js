// src/store/reducers/adminReducer.js
import { createReducer } from '@reduxjs/toolkit';
import { resetAdminPanel, toggleUser } from '../actions/adminAction';

export const statusTypes = {
  IDLE:     'idle',
  PENDING:  'pending',
  SUCCEEDED:'succeeded',
  FAILED:   'failed',
};

const initialState = {
  authors:   [],
  companies: [],
  status:    statusTypes.IDLE,
  error:     null,
};




export default adminReducer;
