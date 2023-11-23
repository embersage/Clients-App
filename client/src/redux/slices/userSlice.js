import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from '../../http/userApi';

const initialState = {
  isAuth: false,
  user: {},
  status: 'loading',
};

export const signIn = createAsyncThunk(
  'user/signIn',
  async ({ email, password }) => {
    const data = await login(email, password);
    return data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [signIn.pending]: (state) => {
      state.isAuth = false;
      state.user = {};
      state.status = 'loading';
    },
    [signIn.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
      state.status = 'succeeded';
    },
    [signIn.rejected]: (state) => {
      state.isAuth = false;
      state.user = {};
      state.status = 'rejected';
    },
  },
});

export const { setIsAuth, setUser } = userSlice.actions;

export default userSlice.reducer;
