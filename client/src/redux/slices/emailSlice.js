import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sendMail } from '../../http/emailApi';

const initialState = {
  to: '',
  name: '',
  template: '',
  params: [],
};

export const sendLetter = createAsyncThunk(
  'sendMail',
  async ({ to, templateId, params }) => {
    const response = await sendMail(to, templateId, params);
    return response;
  }
);

const findInd = (state, newItem) => {
  return state.params.findIndex((item) => item === newItem);
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
    addParam: (state, action) => {
      state.params = [...state.params, action.payload];
    },
    removeParam: (state, action) => {
      state.params.splice(findInd(state, action.payload), 1);
    },
  },
});

export const { setName, setTemplate, addParam, removeParam } =
  emailSlice.actions;

export default emailSlice.reducer;
