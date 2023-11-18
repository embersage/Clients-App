import 'normalize.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { check } from './http/userApi';
import { setIsAuth, setUser } from './redux/slices/userSlice';
import AuthorizationBlock from './components/AuthorizationBlock';

function App() {
  const dispatch = useDispatch();

  //useEffect(() => {
  //  const login = async () => {
  //    await check();
  //    dispatch(setUser(true));
  //    dispatch(setIsAuth(true));
  //  };
  //
  //  login();
  //}, []);
  return (
    <div className="App">
      <AuthorizationBlock />
    </div>
  );
}

export default App;
