import axios from 'axios';

const $authHost = axios.create({ baseURL: process.env.REACT_APP_API_URL });

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export default $authHost;
