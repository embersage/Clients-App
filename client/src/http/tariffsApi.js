import { $authHost } from './index';

export const fetchTariffs = async (
  usePagination,
  limit = 10,
  page = 1,
  sortBy,
  sortType,
  search
) => {
  const { data } = await $authHost.get('api/tariffs', {
    params: { usePagination, limit, page, sortBy, sortType, search },
  });
  return data;
};

export const fetchTariff = async (id) => {
  const { data } = await $authHost.get(`api/tariffs/${id}`);
  return data;
};
