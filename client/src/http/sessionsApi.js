import { $authHost } from './index';

export const fetchSessions = async (
  usePagination,
  limit = 10,
  page = 1,
  sortBy,
  sortType,
  search
) => {
  const { data } = await $authHost.get('api/sessions', {
    params: { usePagination, limit, page, sortBy, sortType, search },
  });
  return data;
};
