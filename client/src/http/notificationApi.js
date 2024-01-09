import { $authHost } from './index';

export const fetchNotifications = async (limit = 10, page = 1, name) => {
  const { data } = await $authHost.get('api/notification', {
    params: { limit, page, name },
  });
  return data;
};
