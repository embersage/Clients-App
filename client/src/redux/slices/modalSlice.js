import { createSlice } from '@reduxjs/toolkit';

const initialState = { isVisible: false, pressedButton: '' };

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsVisible: (state, action) => {
      state.isVisible = action.payload;
    },
    setPressedButton: (state, action) => {
      state.pressedButton = action.payload;
    },
  },
});

export const { setIsVisible, setPressedButton } = modalSlice.actions;

export default modalSlice.reducer;
