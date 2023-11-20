import Home from './pages/Home';
import Users from './pages/Users';
import Payments from './pages/Payments';
import Login from './pages/Login';
import {
  HOME_ROUTE,
  USERS_ROUTE,
  PAYMENTS_ROUTE,
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
