import { $authHost } from './index';

export const fetchUsers = async (name) => {
  if (!name) {
    const { data } = await $authHost.get('api/user');
    return data;
  }
  const { data } = await $authHost.get(`api/user?name=${name}`);
  return data;
};
