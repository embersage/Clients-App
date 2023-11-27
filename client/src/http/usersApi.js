import { $authHost } from './index';

export const fetchUsers = async (name, limit = 10, page = 1) => {
  const { data } = await $authHost.get('api/user', {
    params: { name, limit, page },
  });
  return data;
};

export const fetchUser = async (id) => {
  const { data } = await $authHost.get(`api/user/${id}`);
  return data;
};
