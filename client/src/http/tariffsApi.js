import { $authHost } from './index';

export const fetchTariffs = async (usePagination, sortBy, sortType) => {
  const { data } = await $authHost.get('api/tariffs', {
    params: { usePagination, sortBy, sortType },
  });
  return data;
};

export const fetchTariff = async (id) => {
  const { data } = await $authHost.get(`api/tariffs/${id}`);
  return data;
};
