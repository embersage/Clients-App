import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './slices/menuSlice';
import filterReducer from './slices/filterSlice';
import userReducer from './slices/userSlice';
import usersReducer from './slices/usersSlice';
import paymentsReducer from './slices/usersSlice';
import modalReducer from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    payments: paymentsReducer,
    menu: menuReducer,
    filter: filterReducer,
    modal: modalReducer,
  },
});
