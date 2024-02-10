import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchPayments,
  fetchPayment,
  deletePayments,
  updatePayment,
} from '../../http/paymentsApi';
import formatDate from '../../utils/formatDate';

const initialState = {
  items: [],
  selectedItems: [],
  status: 'loading',
  page: 1,
  totalCount: 0,
  limit: 10,
  payment: {},
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
    tariffs,
    currencies,
  }) => {
    const data = await fetchPayments(
      usePagination,
      limit,
      page,
      sortBy,
      sortType,
      search,
      amount,
      tariffs,
      currencies
    );
    data.rows.forEach((item) => {
      item.date_start = formatDate(item.date_start);
      item.date_end = formatDate(item.date_end);
    });
    return data;
  }
);

export const getPayment = createAsyncThunk(
  'payments/getPayment',
  async ({ id }) => {
    const data = await fetchPayment(id);
    return data;
  }
);

export const removePayments = createAsyncThunk(
  'payments/removePayments',
  async ({ payments }) => {
    const data = await deletePayments(payments);
    return data;
  }
);

export const editPayment = createAsyncThunk(
  'payments/editPayment',
  async ({ id, data }) => {
    const response = await updatePayment(id, data);
    return response;
  }
);

const findInd = (state, newItem) => {
  return state.selectedItems.findIndex((item) => item.id === newItem.id);
};

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setItems: (state, action) => {
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
    setPayment: (state, action) => {
      state.payment = action.payload;
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
        state.payment = {};
      })
      .addCase(getPayments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.rows;
        state.selectedItems = [];
        state.totalCount = action.payload.count;
        state.payment = {};
      })
      .addCase(getPayments.rejected, (state) => {
        state.status = 'error';
        state.items = [];
        state.selectedItems = [];
        state.totalCount = 0;
        state.payment = {};
      })
      .addCase(getPayment.pending, (state, action) => {
        state.status = 'loading';
        state.payment = {};
      })
      .addCase(getPayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.payment = action.payload;
      })
      .addCase(getPayment.rejected, (state) => {
        state.status = 'error';
        state.payment = {};
      })
      .addCase(editPayment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editPayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.payment = action.payload;
      })
      .addCase(editPayment.rejected, (state) => {
        state.status = 'error';
        state.payment = {};
      })
      .addCase(removePayments.pending, (state) => {
        state.status = 'loading';
        state.payment = {};
      })
      .addCase(removePayments.fulfilled, (state) => {
        state.status = 'succeeded';
        state.selectedItems = [];
        state.payment = {};
      })
      .addCase(removePayments.rejected, (state) => {
        state.status = 'error';
        state.selectedItems = [];
        state.payment = {};
      });
  },
});

export const {
  setItems,
  setSelectedItems,
  addSelectedItem,
  removeSelectedItem,
  setPayment,
  setPaymentsPage,
  setTotalCount,
  setLimit,
} = paymentsSlice.actions;

export default paymentsSlice.reducer;
