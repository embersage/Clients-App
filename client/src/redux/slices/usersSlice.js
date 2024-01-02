import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUsers, fetchUser, uploadUsers } from '../../http/usersApi';

const initialState = {
  items: [],
  status: 'loading',
  page: 1,
  totalCount: 0,
  limit: 10,
  user: {},
};

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async ({ limit, page, search }) => {
    const data = await fetchUsers(limit, page, search);
    return data;
  }
);

export const getUser = createAsyncThunk('users/getUser', async ({ id }) => {
  const data = await fetchUser(id);
  return data;
});

export const importUsers = createAsyncThunk(
  'users/importUsers',
  async ({ file }) => {
    const data = await uploadUsers(file);
    return data;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.items = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUsersPage: (state, action) => {
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
      .addCase(getUsers.pending, (state) => {
        state.status = 'loading';
        state.items = [];
        state.totalCount = 0;
        state.user = {};
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.rows;
        state.totalCount = action.payload.count;
        state.user = {};
      })
      .addCase(getUsers.rejected, (state) => {
        state.status = 'error';
        state.items = [];
        state.totalCount = 0;
        state.user = {};
      })
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
        state.items = [];
        state.totalCount = 0;
        state.user = {};
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = [];
        state.totalCount = 0;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.status = 'error';
        state.items = [];
        state.totalCount = 0;
        state.user = {};
      })
      .addCase(importUsers.pending, (state) => {
        state.status = 'loading';
        state.user = {};
      })
      .addCase(importUsers.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = {};
      })
      .addCase(importUsers.rejected, (state) => {
        state.status = 'error';
        state.user = {};
      });
  },
});

export const { setUsers, setUser, setUsersPage, setTotalCount, setLimit } =
  usersSlice.actions;

export default usersSlice.reducer;
