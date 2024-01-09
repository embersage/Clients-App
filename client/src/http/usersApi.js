import { $authHost } from './index';

export const fetchUsers = async (
  limit = 10,
  page = 1,
  sortBy,
  sortType,
  search,
  activate,
  autoPayment
) => {
  const { data } = await $authHost.get('api/user', {
    params: {
      limit,
      page,
      sortBy,
      sortType,
      search,
      activate,
      autoPayment,
    },
  });
  return data;
};

export const fetchUser = async (id) => {
  const { data } = await $authHost.get(`api/user/${id}`);
  return data;
};

export const uploadUsers = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await $authHost.post('api/user/import', formData);
  return data.message;
};

export const updateUser = async (id, data) => {
  const response = await $authHost.patch(`api/user/${id}`, {
    data,
  });
  console.log(response.data);
  return response.data;
};

export const deleteUsers = async (users) => {
  const { response } = await $authHost.delete('api/user', {
    data: { users },
  });
  return response.message;
};
