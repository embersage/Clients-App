import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPayments } from '../../http/paymentsApi';

const initialState = {
  items: [],
  status: 'loading',
  page: 1,
  totalCount: 0,
  limit: 10,
};

export const getPayments = createAsyncThunk(
  'payments/getPayments',
  async ({ limit, page }) => {
    const data = await fetchPayments(limit, page);
    return data;
  }
);

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setPayments: (state, action) => {
      state.items = action.payload;
    },
    setPaymentsPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPayments.pending, (state) => {
        state.status = 'loading';
        state.items = [];
        state.totalCount = 0;
      })
      .addCase(getPayments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.rows;
        state.totalCount = action.payload.count;
      })
      .addCase(getPayments.rejected, (state) => {
        state.status = 'error';
        state.items = [];
        state.totalCount = 0;
      });
  },
});

export const { setPayments, setPaymentsPage, setTotalCount, setLimit } =
  paymentsSlice.actions;

export default paymentsSlice.reducer;
