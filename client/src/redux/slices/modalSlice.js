import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsVisible: (state, action) => {
      state.isVisible = action.payload;
    },
  },
});

export const { setIsVisible } = modalSlice.actions;

export default modalSlice.reducer;
