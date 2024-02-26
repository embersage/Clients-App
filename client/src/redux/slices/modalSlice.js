import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
  pressedButton: '',
  isEditing: false,
  editingIndex: null,
};

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
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setEditingIndex: (state, action) => {
      state.editingIndex = action.payload;
    },
  },
});

export const { setIsVisible, setPressedButton, setIsEditing, setEditingIndex } =
  modalSlice.actions;

export default modalSlice.reducer;
