import Authorization from './pages/Login';
import Users from './pages/Users';
import { LOGIN_ROUTE, USERS_ROUTE } from './utils/consts';

export const authRoutes = [
  {
    path: USERS_ROUTE,
    element: <Users />,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    element: <Authorization />,
  },
];
