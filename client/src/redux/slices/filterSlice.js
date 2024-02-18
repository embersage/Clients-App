import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  usePagination: true,
  search: '',
  endSoon: false,
  hasFreeTariff: false,
  hasSubscription: false,
  autoPayment: '',
  amount: '',
  selectedTariffs: [],
  selectedCurrencies: [],
  activate: '',
  sortBy: '',
  sortType: '',
};

const findInd = (state, where, newItem) => {
  return state[where].findIndex((item) => item === newItem);
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setUsePagination: (state, action) => {
      state.usePagination = action.payload;
    },
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
    addSelectedTariff: (state, action) => {
      state.selectedTariffs = [...state.selectedTariffs, action.payload];
    },
    removeSelectedTariff: (state, action) => {
      state.selectedTariffs.splice(
        findInd(state, 'selectedTariffs', action.payload),
        1
      );
    },
    addSelectedCurrency: (state, action) => {
      state.selectedCurrencies = [...state.selectedCurrencies, action.payload];
    },
    removeSelectedCurrency: (state, action) => {
      state.selectedCurrencies.splice(
        findInd(state, 'selectedCurrencies', action.payload),
        1
      );
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
  setUsePagination,
  setSearch,
  setEndSoon,
  setHasFreeTariff,
  setHasSubscription,
  setAutoPayment,
  setAmount,
  addSelectedTariff,
  removeSelectedTariff,
  addSelectedCurrency,
  removeSelectedCurrency,
  setActivate,
  setSortBy,
  setSortType,
} = filterSlice.actions;

export default filterSlice.reducer;
