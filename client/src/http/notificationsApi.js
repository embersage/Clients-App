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

export const fetchNotification = async (id) => {
  const { data } = await $authHost.get(`api/notifications/${id}`);
  return data;
};

export const updateNotification = async (id, data) => {
  const response = await $authHost.patch(`api/notifications/${id}`, {
    data,
  });
  return response.data;
};

export const deleteNotifications = async (notifications) => {
  const { response } = await $authHost.delete('api/notifications', {
    data: { notifications },
  });
  return response.message;
};
