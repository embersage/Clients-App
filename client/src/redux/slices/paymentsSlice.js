import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPayments } from '../../http/paymentsApi';
import formatDate from '../../utils/formatDate';

const initialState = {
  items: [],
  selectedItems: [],
  status: 'loading',
  page: 1,
  totalCount: 0,
  limit: 10,
};

export const getPayments = createAsyncThunk(
  'payments/getPayments',
  async ({
    usePagination,
    limit,
    page,
    sortBy,
    sortType,
    search,
    amount,
    tariff,
    currency,
  }) => {
    const data = await fetchPayments(
      usePagination,
      limit,
      page,
      sortBy,
      sortType,
      search,
      amount,
      tariff,
      currency
    );
    data.rows.forEach((item) => {
      item.date_start = formatDate(item.date_start);
      item.date_end = formatDate(item.date_end);
    });
    return data;
  }
);

const findInd = (state, newItem) => {
  return state.selectedItems.findIndex((item) => item.id === newItem.id);
};

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setPayments: (state, action) => {
      state.items = action.payload;
    },
    setSelectedItems: (state, action) => {
      state.selectedItems = action.payload;
    },
    addSelectedItem: (state, action) => {
      state.selectedItems = [...state.selectedItems, action.payload];
    },
    removeSelectedItem: (state, action) => {
      state.selectedItems.splice(findInd(state, action.payload), 1);
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
        state.selectedItems = [];
        state.totalCount = 0;
      })
      .addCase(getPayments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.rows;
        state.selectedItems = [];
        state.totalCount = action.payload.count;
      })
      .addCase(getPayments.rejected, (state) => {
        state.status = 'error';
        state.items = [];
        state.selectedItems = [];
        state.totalCount = 0;
      });
  },
});

export const {
  setPayments,
  setSelectedItems,
  addSelectedItem,
  removeSelectedItem,
  setPaymentsPage,
  setTotalCount,
  setLimit,
} = paymentsSlice.actions;

export default paymentsSlice.reducer;
