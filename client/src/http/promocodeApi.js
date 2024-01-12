import { $authHost } from './index';

export const fetchPromocodes = async (
  usePagination,
  limit = 10,
  page = 1,
  sortBy,
  sortType,
  search
) => {
  const { data } = await $authHost.get('api/promocodes', {
    params: { usePagination, limit, page, sortBy, sortType, search },
  });
  return data;
};

export const fetchPromocode = async (id) => {
  const { data } = await $authHost.get(`api/promocodes/${id}`);
  return data;
};

export const deletePromocodes = async (promocodes) => {
  const { response } = await $authHost.delete('api/promocodes', {
    data: { promocodes },
  });
  return response.message;
};
