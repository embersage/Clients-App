import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './slices/menuSlice';
import filterReducer from './slices/filterSlice';
import userReducer from './slices/userSlice';
import usersReducer from './slices/usersSlice';
import paymentsReducer from './slices/paymentsSlice';
import promocodesReducer from './slices/promocodesSlice';
import tariffsReducer from './slices/tariffsSlice';
import sessionsReducer from './slices/sessionsSlice';
import notificationsReducer from './slices/notificationsSlice';
import currenciesReducer from './slices/currenciesSlice';
import modalReducer from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    payments: paymentsReducer,
    promocodes: promocodesReducer,
    tariffs: tariffsReducer,
    sessions: sessionsReducer,
    notifications: notificationsReducer,
    currencies: currenciesReducer,
    menu: menuReducer,
    filter: filterReducer,
    modal: modalReducer,
  },
});
