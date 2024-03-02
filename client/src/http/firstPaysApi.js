import { $authHost } from './index';

export const fetchFirstPays = async (
  usePagination,
  limit = 10,
  page = 1,
  sortBy,
  sortType,
  search
) => {
  const { data } = await $authHost.get('api/first_pays', {
    params: { usePagination, limit, page, sortBy, sortType, search },
  });
  return data;
};

export const fetchFirstPay = async (id) => {
  const { data } = await $authHost.get(`api/first_pays/${id}`);
  return data;
};

export const updateFirstPay = async (id, data) => {
  const response = await $authHost.patch(`api/first_pays/${id}`, {
    data,
  });
  return response.data;
};

export const deleteFirstPays = async (firstPays) => {
  const { response } = await $authHost.delete('api/first_pays', {
    data: { firstPays },
  });
  return response.message;
};
