import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchUsers,
  fetchUser,
  uploadUsers,
  deleteUsers,
  updateUser,
} from '../../http/usersApi';
import formatDate from '../../utils/formatDate';

const initialState = {
  users: [],
  selectedUsers: [],
  status: 'loading',
  page: 1,
  totalCount: 0,
  limit: 10,
  user: {},
  selectedPresentations: [],
};

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async ({
    usePagination,
    limit,
    page,
    sortBy,
    sortType,
    search,
    activate,
    autoPayment,
  }) => {
    const data = await fetchUsers(
      usePagination,
      limit,
      page,
      sortBy,
      sortType,
      search,
      activate,
      autoPayment
    );
    data.rows.forEach((item) => {
      item.date_reg = formatDate(item.date_reg);
      item.date_last_login = formatDate(item.date_last_login);
    });
    return data;
  }
);

export const getUser = createAsyncThunk(
  'users/getUser',
  async ({ id, sortBy, sortType }) => {
    const data = await fetchUser(id, sortBy, sortType);
    data.date_reg = formatDate(data.date_reg);
    data.date_last_login = formatDate(data.date_last_login);
    return data;
  }
);

export const importUsers = createAsyncThunk(
  'users/importUsers',
  async ({ file }) => {
    const data = await uploadUsers(file);
    return data;
  }
);

export const editUser = createAsyncThunk(
  'users/editUser',
  async ({ id, data }) => {
    const response = await updateUser(id, data);
    return response;
  }
);

export const removeUsers = createAsyncThunk(
  'users/removeUsers',
  async ({ users }) => {
    const data = await deleteUsers(users);
    return data;
  }
);

const findInd = (state, where, newItem) => {
  return state[where].findIndex((item) => item.id === newItem.id);
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setSelectedUsers: (state, action) => {
      state.selectedUsers = action.payload;
    },
    addSelectedUser: (state, action) => {
      state.selectedUsers = [...state.selectedUsers, action.payload];
    },
    removeSelectedUser: (state, action) => {
      state.selectedUsers.splice(
        findInd(state, 'selectedUsers', action.payload),
        1
      );
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSelectedPresentations: (state, action) => {
      state.selectedPresentations = action.payload;
    },
    addSelectedPresentation: (state, action) => {
      state.selectedPresentations = [
        ...state.selectedPresentations,
        action.payload,
      ];
    },
    removeSelectedPresentation: (state, action) => {
      state.selectedPresentations.splice(
        findInd(state, 'selectedPresentations', action.payload),
        1
      );
    },
    setUsersPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = 'loading';
        state.users = [];
        state.selectedUsers = [];
        state.totalCount = 0;
        state.user = {};
        state.selectedPresentations = [];
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload.rows;
        state.selectedUsers = [];
        state.totalCount = action.payload.count;
        state.user = {};
        state.selectedPresentations = [];
      })
      .addCase(getUsers.rejected, (state) => {
        state.status = 'error';
        state.users = [];
        state.selectedUsers = [];
        state.totalCount = 0;
        state.user = {};
        state.selectedPresentations = [];
      })
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
        state.users = [];
        state.totalCount = 0;
        state.user = {};
        state.selectedPresentations = [];
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = [];
        state.totalCount = 0;
        state.user = action.payload;
        state.selectedPresentations = [];
      })
      .addCase(getUser.rejected, (state) => {
        state.status = 'error';
        state.users = [];
        state.totalCount = 0;
        state.user = {};
        state.selectedPresentations = [];
      })
      .addCase(importUsers.pending, (state) => {
        state.status = 'loading';
        state.user = {};
      })
      .addCase(importUsers.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = {};
      })
      .addCase(importUsers.rejected, (state) => {
        state.status = 'error';
        state.user = {};
      })
      .addCase(editUser.pending, (state) => {
        state.status = 'loading';
        state.users = [];
        state.totalCount = 0;
        state.user = {};
        state.selectedPresentations = [];
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = [];
        state.totalCount = 0;
        state.user = action.payload;
        state.selectedPresentations = [];
      })
      .addCase(editUser.rejected, (state) => {
        state.status = 'error';
        state.users = [];
        state.totalCount = 0;
        state.user = {};
        state.selectedPresentations = [];
      })
      .addCase(removeUsers.pending, (state) => {
        state.status = 'loading';
        state.selectedUsers = [];
        state.user = {};
        state.selectedPresentations = [];
      })
      .addCase(removeUsers.fulfilled, (state) => {
        state.status = 'succeeded';
        state.selectedUsers = [];
        state.user = {};
        state.selectedPresentations = [];
      })
      .addCase(removeUsers.rejected, (state) => {
        state.status = 'error';
        state.selectedUsers = [];
        state.user = {};
        state.selectedPresentations = [];
      });
  },
});

export const {
  setUsers,
  setSelectedUsers,
  addSelectedUser,
  removeSelectedUser,
  setSelectedPresentations,
  addSelectedPresentation,
  removeSelectedPresentation,
  setUser,
  setUsersPage,
  setTotalCount,
  setLimit,
} = usersSlice.actions;

export default usersSlice.reducer;
