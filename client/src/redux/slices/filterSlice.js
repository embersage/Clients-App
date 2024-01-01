import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  isOpened: false,
  endSoon: false,
  hasFreeTariff: false,
  hasSubscription: false,
  hasAutoPayment: false,
  amount: 0,
  tariff: '',
  currency: '',
  isActivated: false,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setIsOpened: (state, action) => {
      state.search = action.payload;
    },
    setEndSoon: (state, action) => {
      state.endSoon = action.payload;
    },
    setHasFreeTariff: (state, action) => {
      state.hasFreeTariff = action.payload;
    },
    setHasSubscription: (state, action) => {
      state.hasSubscription = action.payload;
    },
    setHasAutoPayment: (state, action) => {
      state.hasAutoPayment = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setTariff: (state, action) => {
      state.tariff = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setIsActivated: (state, action) => {
      state.isActivated = action.payload;
    },
  },
});

export const {
  setSearch,
  setIsOpened,
  setEndSoon,
  setHasFreeTariff,
  setHasSubscription,
  setHasAutoPayment,
  setAmount,
  setTariff,
  setCurrency,
  setIsActivated,
} = filterSlice.actions;

export default filterSlice.reducer;
