import { $authHost } from './index';

export const fetchPromocodes = async (limit = 10, page = 1, name) => {
  const { data } = await $authHost.get('api/promocode', {
    params: { limit, page, name },
  });
  return data;
};
