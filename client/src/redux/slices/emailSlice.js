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
  return state.params.findIndex(
    (item) => item.code === newItem.code && item.value === newItem.value
  );
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
    setCode: (state, action) => {
      state.params[action.payload.index] = {
        code: action.payload.code,
        value: state.params[action.payload.index].value,
      };
    },
    setValue: (state, action) => {
      state.params[action.payload.index] = {
        code: state.params[action.payload.index].code,
        value: action.payload.value,
      };
    },
    addParam: (state, action) => {
      state.params = [...state.params, action.payload];
    },
    removeParam: (state, action) => {
      state.params.splice(findInd(state, action.payload), 1);
    },
  },
});

export const {
  setName,
  setTemplate,
  setCode,
  setValue,
  addParam,
  removeParam,
} = emailSlice.actions;

export default emailSlice.reducer;
