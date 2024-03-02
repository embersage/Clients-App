import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchFirstPays,
  fetchFirstPay,
  deleteFirstPays,
  updateFirstPay,
} from '../../http/firstPaysApi';
import formatDate from '../../utils/formatDate';

const initialState = {
  items: [],
  selectedItems: [],
  status: 'loading',
  page: 1,
  totalCount: 0,
  limit: 10,
  firstPay: {},
};

export const getFirstPays = createAsyncThunk(
  'firstPays/getFirstPays',
  async ({ usePagination, limit, page, sortBy, sortType, search }) => {
    const data = await fetchFirstPays(
      usePagination,
      limit,
      page,
      sortBy,
      sortType,
      search
    );
    data.rows.forEach((item) => {
      item.date_start = formatDate(item.date_start);
      item.date_end = formatDate(item.date_end);
    });
    return data;
  }
);

export const getFirstPay = createAsyncThunk(
  'firstPays/getFirstPay',
  async ({ id }) => {
    const data = await fetchFirstPay(id);
    return data;
  }
);

export const removeFirstPays = createAsyncThunk(
  'firstPays/removeFirstPays',
  async ({ firstPays }) => {
    const data = await deleteFirstPays(firstPays);
    return data;
  }
);

export const editFirstPay = createAsyncThunk(
  'firstPays/editFirstPay',
  async ({ id, data }) => {
    const response = await updateFirstPay(id, data);
    return response;
  }
);

const findInd = (state, newItem) => {
  return state.selectedItems.findIndex((item) => item.id === newItem.id);
};

export const firstPaysSlice = createSlice({
  name: 'firstPays',
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
    setFirstPay: (state, action) => {
      state.firstPay = action.payload;
    },
    setFirstPaysPage: (state, action) => {
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
      .addCase(getFirstPays.pending, (state) => {
        state.status = 'loading';
        state.items = [];
        state.selectedItems = [];
        state.totalCount = 0;
        state.firstPay = {};
      })
      .addCase(getFirstPays.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.rows;
        state.selectedItems = [];
        state.totalCount = action.payload.count;
        state.firstPay = {};
      })
      .addCase(getFirstPays.rejected, (state) => {
        state.status = 'error';
        state.items = [];
        state.selectedItems = [];
        state.totalCount = 0;
        state.firstPay = {};
      })
      .addCase(getFirstPay.pending, (state, action) => {
        state.status = 'loading';
        state.firstPay = {};
      })
      .addCase(getFirstPay.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.firstPay = action.payload;
      })
      .addCase(getFirstPay.rejected, (state) => {
        state.status = 'error';
        state.firstPay = {};
      })
      .addCase(editFirstPay.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editFirstPay.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.firstPay = action.payload;
      })
      .addCase(editFirstPay.rejected, (state) => {
        state.status = 'error';
        state.firstPay = {};
      })
      .addCase(removeFirstPays.pending, (state) => {
        state.status = 'loading';
        state.firstPay = {};
      })
      .addCase(removeFirstPays.fulfilled, (state) => {
        state.status = 'succeeded';
        state.selectedItems = [];
        state.firstPay = {};
      })
      .addCase(removeFirstPays.rejected, (state) => {
        state.status = 'error';
        state.selectedItems = [];
        state.firstPay = {};
      });
  },
});

export const {
  setItems,
  setSelectedItems,
  addSelectedItem,
  removeSelectedItem,
  setFirstPay,
  setFirstPaysPage,
  setTotalCount,
  setLimit,
} = firstPaysSlice.actions;

export default firstPaysSlice.reducer;
