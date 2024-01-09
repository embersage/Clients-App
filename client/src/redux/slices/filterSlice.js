import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  endSoon: '',
  hasFreeTariff: '',
  hasSubscription: '',
  autoPayment: '',
  amount: 0,
  tariff: '',
  currency: '',
  activate: '',
  sortBy: '',
  sortType: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearch: (state, action) => {
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
    setAutoPayment: (state, action) => {
      state.autoPayment = action.payload;
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
    setActivate: (state, action) => {
      state.activate = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const {
  setSearch,
  setEndSoon,
  setHasFreeTariff,
  setHasSubscription,
  setAutoPayment,
  setAmount,
  setTariff,
  setCurrency,
  setActivate,
  setSortBy,
  setSortType,
} = filterSlice.actions;

export default filterSlice.reducer;
