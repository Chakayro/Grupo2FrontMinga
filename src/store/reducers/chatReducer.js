import { createReducer } from '@reduxjs/toolkit';
import { toggleChat, addMessage, setInput, setLoading, clearMessages, sendMessage } from '../actions/chatAction.js';

const initialState = {
  open: false,
  messages: [],
  input: '',
  loading: false,
  error: null,
};

const chatReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleChat, (state) => {
      state.open = !state.open;
    })
    .addCase(addMessage, (state, action) => {
      state.messages.push(action.payload);
    })
    .addCase(setInput, (state, action) => {
      state.input = action.payload;
    })
    .addCase(setLoading, (state, action) => {
      state.loading = action.payload;
    })
    .addCase(clearMessages, (state) => {
      state.messages = [];
    })
    .addCase(sendMessage.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(sendMessage.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(sendMessage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    });
});

export default chatReducer;
