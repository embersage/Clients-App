import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchNotifications,
  fetchNotification,
  deleteNotifications,
  updateNotification,
} from '../../http/notificationsApi';
import formatDate from '../../utils/formatDate';

const initialState = {
  items: [],
  selectedItems: [],
  status: 'loading',
  page: 1,
  totalCount: 0,
  limit: 10,
  notification: {},
};

export const getNotifications = createAsyncThunk(
  'notifications/getNotifications',
  async ({ usePagination, limit, page, sortBy, sortType, search }) => {
    const data = await fetchNotifications(
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

export const getNotification = createAsyncThunk(
  'notifications/getNotification',
  async ({ id }) => {
    const data = await fetchNotification(id);
    return data;
  }
);

export const removeNotifications = createAsyncThunk(
  'notifications/removeNotifications',
  async ({ notifications }) => {
    const data = await deleteNotifications(notifications);
    return data;
  }
);

export const editNotification = createAsyncThunk(
  'notifications/editNotification',
  async ({ id, data }) => {
    const response = await updateNotification(id, data);
    return response;
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
    setNotification: (state, action) => {
      state.notification = action.payload;
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
        state.notification = {};
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.rows;
        state.selectedItems = [];
        state.totalCount = action.payload.count;
        state.notification = {};
      })
      .addCase(getNotifications.rejected, (state) => {
        state.status = 'error';
        state.items = [];
        state.selectedItems = [];
        state.totalCount = 0;
        state.notification = {};
      })
      .addCase(getNotification.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = [];
        state.totalCount = 0;
        state.notification = action.payload;
      })
      .addCase(getNotification.rejected, (state) => {
        state.status = 'error';
        state.items = [];
        state.totalCount = 0;
        state.notification = {};
      })
      .addCase(editNotification.pending, (state) => {
        state.status = 'loading';
        state.items = [];
        state.totalCount = 0;
        state.notification = {};
      })
      .addCase(editNotification.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = [];
        state.totalCount = 0;
        state.notification = action.payload;
      })
      .addCase(editNotification.rejected, (state) => {
        state.status = 'error';
        state.items = [];
        state.totalCount = 0;
        state.notification = {};
      })
      .addCase(removeNotifications.pending, (state) => {
        state.status = 'loading';
        state.notification = {};
      })
      .addCase(removeNotifications.fulfilled, (state) => {
        state.status = 'succeeded';
        state.selectedItems = [];
        state.notification = {};
      })
      .addCase(removeNotifications.rejected, (state) => {
        state.status = 'error';
        state.selectedItems = [];
        state.notification = {};
      });
  },
});

export const {
  setItems,
  setSelectedItems,
  addSelectedItem,
  removeSelectedItem,
  setNotification,
  setNotificationsPage,
  setTotalCount,
  setLimit,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
