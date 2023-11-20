import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './slices/menuSlice';
import userReducer from './slices/userSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    menu: menuReducer,
  },
});
