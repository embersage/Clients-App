import Users from './pages/Users';
import User from './pages/User';
import Payments from './pages/Payments';
import FirstPays from './pages/FirstPays';
import Promocodes from './pages/Promocodes';
import Promocode from './pages/Promocode';
import Sessions from './pages/Sessions';
import Notifications from './pages/Notifications';
import Login from './pages/Login';
import {
  USERS_ROUTE,
  USER_ROUTE,
  PAYMENTS_ROUTE,
  FIRST_PAYS_ROUTE,
  PROMOCODES_ROUTE,
  PROMOCODE_ROUTE,
  SESSIONS_ROUTE,
  NOTIFICATIONS_ROUTE,
  LOGIN_ROUTE,
} from './utils/consts';

export const authRoutes = [
  {
    path: USERS_ROUTE,
    element: <Users />,
  },
  {
    path: USER_ROUTE,
    element: <User />,
  },
  {
    path: PAYMENTS_ROUTE,
    element: <Payments />,
  },
  {
    path: FIRST_PAYS_ROUTE,
    element: <FirstPays />,
  },
  {
    path: PROMOCODES_ROUTE,
    element: <Promocodes />,
  },
  {
    path: PROMOCODE_ROUTE,
    element: <Promocode />,
  },
  {
    path: SESSIONS_ROUTE,
    element: <Sessions />,
  },
  {
    path: NOTIFICATIONS_ROUTE,
    element: <Notifications />,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    element: <Login />,
  },
];
