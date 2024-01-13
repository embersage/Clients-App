import { $authHost } from './index';

export const fetchNotifications = async (
  usePagination,
  limit = 10,
  page = 1,
  sortBy,
  sortType,
  search
) => {
  const { data } = await $authHost.get('api/notifications', {
    params: { usePagination, limit, page, sortBy, sortType, search },
  });
  return data;
};
