import { $authHost } from './index';

export const fetchUsers = async () => {
  const { data } = await $authHost.get('api/user');
  return data;
};
