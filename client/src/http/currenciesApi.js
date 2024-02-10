import { $authHost } from './index';

export const fetchCurrencies = async () => {
  const { data } = await $authHost.get('api/currencies');
  return data;
};
