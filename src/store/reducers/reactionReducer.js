import { createReducer } from '@reduxjs/toolkit';
import { createReaction, resetReaction } from '../actions/reactionAction';

const initialState = {
    data: null,
    status: 'idle',   // 'idle' | 'pending' | 'success' | 'failed'
    error: null
};

export const reactionReducer = createReducer(initialState, (builder) => {
    builder
    // cuando empieza la llamada
    .addCase(createReaction.pending, (state) => {
        state.status = 'pending';
        state.error = null;
        state.data = null;
    })
    // cuando responde OK
    .addCase(createReaction.fulfilled, (state, action) => {
        state.status = 'success';
      state.data = action.payload;  // { success: true, message: ..., ... }
    })
    // cuando hay error
    .addCase(createReaction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error;
    })
    // para resetear manualmente si lo necesitas
    .addCase(resetReaction, () => initialState);
});
