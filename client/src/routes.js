import Home from './pages/Home';
import Users from './pages/Users';
import User from './pages/User';
import Payments from './pages/Payments';
import Promocodes from './pages/Promocodes';
import Notifications from './pages/Notifications';
import Login from './pages/Login';
import {
  HOME_ROUTE,
  USERS_ROUTE,
  USER_ROUTE,
  PAYMENTS_ROUTE,
  PROMOCODES_ROUTE,
  NOTIFICATIONS_ROUTE,
  LOGIN_ROUTE,
} from './utils/consts';

export const authRoutes = [
  {
    path: HOME_ROUTE,
    element: <Home />,
  },
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
    path: PROMOCODES_ROUTE,
    element: <Promocodes />,
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
