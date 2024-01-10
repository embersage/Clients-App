import { $authHost } from './index';

export const fetchPromocodes = async (limit = 10, page = 1, name) => {
  const { data } = await $authHost.get('api/promocode', {
    params: { limit, page, name },
  });
  return data;
};

export const fetchPromocode = async (id) => {
  const { data } = await $authHost.get(`api/promocode/${id}`);
  return data;
};

export const deletePromocodes = async (promocodes) => {
  const { response } = await $authHost.delete('api/promocode', {
    data: { promocodes },
  });
  return response.message;
};
