import Home from './pages/Home';
import Users from './pages/Users';
import User from './pages/User';
import Payments from './pages/Payments';
import Login from './pages/Login';
import {
  HOME_ROUTE,
  USERS_ROUTE,
  USER_ROUTE,
  MAIL_ROUTE,
  PAYMENTS_ROUTE,
  LOGIN_ROUTE,
} from './utils/consts';
import Mail from './pages/Mail';

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
    path: MAIL_ROUTE,
    element: <Mail />,
  },
  {
    path: PAYMENTS_ROUTE,
    element: <Payments />,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    element: <Login />,
  },
];
