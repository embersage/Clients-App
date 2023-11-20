import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: true,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setIsOpened: (state, action) => {
      state.isOpened = action.payload;
    },
  },
});

export const { setIsOpened } = menuSlice.actions;

export default menuSlice.reducer;
