import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';
import adminReducer from './slices/adminSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    admin: adminReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
