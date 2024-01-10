import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchPromocodes,
  fetchPromocode,
  deletePromocodes,
} from '../../http/promocodeApi';
import formatDate from '../../utils/formatDate';

const initialState = {
  items: [],
  selectedItems: [],
  status: 'loading',
  page: 1,
  totalCount: 0,
  limit: 10,
  promocode: {},
};

export const getPromocodes = createAsyncThunk(
  'promocodes/getPromocodes',
  async ({ limit, page, name }) => {
    const data = await fetchPromocodes(limit, page, name);
    data.rows.forEach((item) => {
      item.date_start = formatDate(item.date_start);
      item.date_end = formatDate(item.date_end);
    });
    return data;
  }
);

export const getPromocode = createAsyncThunk(
  'users/getPromocode',
  async ({ id }) => {
    const data = await fetchPromocode(id);
    return data;
  }
);

export const removePromocodes = createAsyncThunk(
  'users/removePromocodes',
  async ({ promocodes }) => {
    const data = await deletePromocodes(promocodes);
    return data;
  }
);

const findInd = (state, newItem) => {
  return state.selectedItems.findIndex((item) => item.id === newItem.id);
};

export const promocodesSlice = createSlice({
  name: 'promocodes',
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
    setPromocode: (state, action) => {
      state.promocode = action.payload;
    },
    setPromocodesPage: (state, action) => {
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
      .addCase(getPromocodes.pending, (state) => {
        state.status = 'loading';
        state.items = [];
        state.selectedItems = [];
        state.totalCount = 0;
        state.promocode = {};
      })
      .addCase(getPromocodes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.rows;
        state.selectedItems = [];
        state.totalCount = action.payload.count;
        state.promocode = {};
      })
      .addCase(getPromocodes.rejected, (state) => {
        state.status = 'error';
        state.items = [];
        state.selectedItems = [];
        state.totalCount = 0;
        state.promocode = {};
      })
      .addCase(getPromocode.pending, (state) => {
        state.status = 'loading';
        state.promocodes = [];
        state.totalCount = 0;
        state.promocode = {};
      })
      .addCase(getPromocode.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.promocodes = [];
        state.totalCount = 0;
        state.promocode = action.payload;
      })
      .addCase(getPromocode.rejected, (state) => {
        state.status = 'error';
        state.promocodes = [];
        state.totalCount = 0;
        state.promocode = {};
      })
      .addCase(removePromocodes.pending, (state) => {
        state.status = 'loading';
        state.promocode = {};
      })
      .addCase(removePromocodes.fulfilled, (state) => {
        state.status = 'succeeded';
        state.selectedPromocodes = [];
        state.promocode = {};
      })
      .addCase(removePromocodes.rejected, (state) => {
        state.status = 'error';
        state.selectedPromocodes = [];
        state.promocode = {};
      });
  },
});

export const {
  setItems,
  setSelectedItems,
  addSelectedItem,
  removeSelectedItem,
  setPromocodesPage,
  setTotalCount,
  setLimit,
} = promocodesSlice.actions;

export default promocodesSlice.reducer;
