import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  user: {},
};

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
});

export const { setIsAuth, setUser } = userSlice.actions;

export default userSlice.reducer;
