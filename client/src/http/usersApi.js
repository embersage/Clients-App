import { $authHost } from './index';

export const fetchUsers = async (
  usePagination,
  limit = 10,
  page = 1,
  sortBy,
  sortType,
  search,
  activate,
  endSoon,
  autoPayment,
  hasFreeTariff,
  hasSubscription
) => {
  const { data } = await $authHost.get('api/users', {
    params: {
      usePagination,
      limit,
      page,
      sortBy,
      sortType,
      search,
      activate,
      endSoon,
      autoPayment,
      hasFreeTariff,
      hasSubscription,
    },
  });
  return data;
};

export const fetchUser = async (id, sortBy, sortType) => {
  const { data } = await $authHost.get(`api/users/${id}`, {
    params: {
      sortBy,
      sortType,
    },
  });
  return data;
};

export const uploadUsers = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await $authHost.post('api/users/import', formData);
  return data.message;
};

export const updateUser = async (id, data) => {
  const response = await $authHost.patch(`api/users/${id}`, {
    data,
  });
  return response.data;
};

export const deleteUsers = async (users) => {
  const response = await $authHost.delete('api/users', {
    data: { users },
  });
  return response.message;
};
