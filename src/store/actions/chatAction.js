import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const toggleChat = createAction('chat/toggleChat');
export const addMessage = createAction('chat/addMessage');
export const setInput = createAction('chat/setInput');
export const setLoading = createAction('chat/setLoading');
export const clearMessages = createAction('chat/clearMessages');

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (message, { dispatch }) => {
    try {
      dispatch(addMessage({
        text: message,
        sender: 'user'
      }));

      dispatch(setLoading(true));

      const response = await axios.post('http://localhost:8080/api/gemini/ask', {
        message
      });

      const reply = response.data.reply || "🤖 I didn't understand your message...";

      dispatch(addMessage({
        text: reply,
        sender: 'Minga Sensei'
      }));

      dispatch(setLoading(false));

    } catch (error) {
      dispatch(setLoading(false));
      dispatch(addMessage({
        text: '❌ Error connecting to AI',
        sender: 'bot'
      }));
      throw error;
    }
  }
);

