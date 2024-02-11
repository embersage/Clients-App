import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  template: '',
  variables: [],
};

const findInd = (state, newItem) => {
  return state.variables.findIndex((item) => item === newItem);
};

export const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setTemplate: (state, action) => {
      state.template = action.payload;
    },
    addVariable: (state, action) => {
      state.variables = [...state.variables, action.payload];
    },
    removeVariable: (state, action) => {
      state.variables.splice(findInd(state, action.payload), 1);
    },
  },
});

export const { setName, setTemplate, addVariable, removeVariable } =
  emailSlice.actions;

export default emailSlice.reducer;
