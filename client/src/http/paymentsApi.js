import { $authHost } from './index';

export const fetchPayments = async (name, limit = 10, page = 1) => {
  const { data } = await $authHost.get('api/payment', {
    params: { name, limit, page },
  });
  return data;
};
