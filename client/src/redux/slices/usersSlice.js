import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUsers, uploadUsers } from '../../http/usersApi';

const initialState = {
  items: [],
  status: 'loading',
  page: 1,
  totalCount: 0,
  limit: 10,
};

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async ({ name, limit, page }) => {
    const data = await fetchUsers(name, limit, page);
    return data;
  }
);

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
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.rows;
        state.totalCount = action.payload.count;
      })
      .addCase(getUsers.rejected, (state) => {
        state.status = 'error';
        state.items = [];
        state.totalCount = 0;
      })
      .addCase(importUsers.pending, (state) => {
        state.status = 'loading';
        //getUsers();
        //console.log('loading');
      })
      .addCase(importUsers.fulfilled, (state) => {
        state.status = 'succeeded';
        //getUsers();
      })
      .addCase(importUsers.rejected, (state) => {
        state.status = 'error';
        //getUsers();
        //console.log('error');
      });
  },
});

export const { setUsers, setUsersPage, setTotalCount, setLimit } =
  usersSlice.actions;

export default usersSlice.reducer;
