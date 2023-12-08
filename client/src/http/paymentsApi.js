import { $authHost } from './index';

export const fetchPayments = async (limit = 10, page = 1) => {
  const { data } = await $authHost.get('api/payment', {
    params: { limit, page },
  });
  return data;
};

//export const fetchUser = async (id) => {
//  const { data } = await $authHost.get(`api/user/${id}`);
//  return data;
//};
