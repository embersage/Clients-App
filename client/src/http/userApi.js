import $authHost from './index';
import { jwtDecode } from 'jwt-decode';

export const login = async (email, password) => {
  const { data } = await $authHost.post('api/user/auth', {
    email,
    password,
  });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get('api/user/auth');
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};
