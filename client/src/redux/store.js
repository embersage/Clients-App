import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './slices/menuSlice';
import filterReducer from './slices/filterSlice';
import userReducer from './slices/userSlice';
import usersReducer from './slices/usersSlice';
import paymentsReducer from './slices/paymentsSlice';
import promocodesReducer from './slices/promocodesSlice';
import tariffsReducer from './slices/tariffsSlice';
import notificationsReducer from './slices/notificationsSlice';
import modalReducer from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    payments: paymentsReducer,
    promocodes: promocodesReducer,
    tariffs: tariffsReducer,
    notifications: notificationsReducer,
    menu: menuReducer,
    filter: filterReducer,
    modal: modalReducer,
  },
});
