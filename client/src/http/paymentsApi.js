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
