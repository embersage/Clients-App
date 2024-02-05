import { $authHost } from './index';

export const fetchPayments = async (
  usePagination,
  limit = 10,
  page = 1,
  sortBy,
  sortType,
  search,
  amount,
  tariff,
  currency
) => {
  const { data } = await $authHost.get('api/payments', {
    params: {
      usePagination,
      limit,
      page,
      sortBy,
      sortType,
      search,
      amount,
      tariff,
      currency,
    },
  });
  return data;
};

export const fetchPayment = async (id) => {
  const { data } = await $authHost.get(`api/payments/${id}`);
  return data;
};

export const updatePayment = async (id, data) => {
  const response = await $authHost.patch(`api/payments/${id}`, {
    data,
  });
  return response.data;
};

export const deletePayments = async (payments) => {
  const { response } = await $authHost.delete('api/payments', {
    data: { payments },
  });
  return response.message;
};
