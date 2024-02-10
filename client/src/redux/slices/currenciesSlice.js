import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCurrencies } from '../../http/currenciesApi';

const initialState = {
  items: [],
  status: 'loading',
};

export const getCurrencies = createAsyncThunk(
  'currencies/getCurrencies',
  async () => {
    const data = await fetchCurrencies();
    return data;
  }
);

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrencies.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(getCurrencies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getCurrencies.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export default currenciesSlice.reducer;
