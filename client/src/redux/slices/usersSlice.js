import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../../http/usersApi';

const initialState = {
  items: [],
  status: 'loading',
};

export const getUsers = createAsyncThunk('users/getUsers', async (name) => {
  if (!name) {
    const data = await fetchUsers();
    return data.rows;
  }
  const data = await fetchUsers(name);
  return data.rows;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [getUsers.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    },
    [getUsers.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;
