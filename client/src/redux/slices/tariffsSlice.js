import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchTariffs } from '../../http/tariffsApi';

const initialState = {
  items: [],
  selectedItems: [],
  status: 'loading',
  page: 1,
  totalCount: 0,
  limit: 10,
};

export const getTariffs = createAsyncThunk(
  'tariffs/getTariffs',
  async ({ usePagination, sortBy, sortType }) => {
    const data = await fetchTariffs(
      usePagination,
      sortBy,
      sortType
    );
    return data;
  }
);

const findInd = (state, newItem) => {
  return state.selectedItems.findIndex((item) => item.id === newItem.id);
};

export const tariffsSlice = createSlice({
  name: 'tariffs',
  initialState,
  reducers: {
    setTariffs: (state, action) => {
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
    setTariffsPage: (state, action) => {
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
      .addCase(getTariffs.pending, (state) => {
        state.status = 'loading';
        state.items = [];
        state.selectedItems = [];
        state.totalCount = 0;
      })
      .addCase(getTariffs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.rows;
        state.selectedItems = [];
        state.totalCount = action.payload.count;
      })
      .addCase(getTariffs.rejected, (state) => {
        state.status = 'error';
        state.items = [];
        state.selectedItems = [];
        state.totalCount = 0;
      });
  },
});

export const {
  setTariffs,
  setSelectedItems,
  addSelectedItem,
  removeSelectedItem,
  setTariffsPage,
  setTotalCount,
  setLimit,
} = tariffsSlice.actions;

export default tariffsSlice.reducer;
