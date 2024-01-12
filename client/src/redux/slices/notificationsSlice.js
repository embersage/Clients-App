import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchNotifications } from '../../http/notificationApi';
import formatDate from '../../utils/formatDate';

const initialState = {
  items: [],
  selectedItems: [],
  status: 'loading',
  page: 1,
  totalCount: 0,
  limit: 10,
};

export const getNotifications = createAsyncThunk(
  'notifications/getNotifications',
  async ({  usePagination, limit, page, sortBy, sortType, search  }) => {
    const data = await fetchNotifications( usePagination, limit, page, sortBy, sortType, search );
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

export const notificationsSlice = createSlice({
  name: 'notifications',
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
    setNotificationsPage: (state, action) => {
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
      .addCase(getNotifications.pending, (state) => {
        state.status = 'loading';
        state.items = [];
        state.selectedItems = [];
        state.totalCount = 0;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.rows;
        state.selectedItems = [];
        state.totalCount = action.payload.count;
      })
      .addCase(getNotifications.rejected, (state) => {
        state.status = 'error';
        state.items = [];
        state.selectedItems = [];
        state.totalCount = 0;
      });
  },
});

export const {
  setItems,
  setSelectedItems,
  addSelectedItem,
  removeSelectedItem,
  setNotificationsPage,
  setTotalCount,
  setLimit,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
