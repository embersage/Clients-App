import 'normalize.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { check } from './http/userApi';
import { setIsAuth, setUser } from './redux/slices/userSlice';
import Authorization from './pages/Authorization';
import { Routes, Route } from 'react-router-dom';

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
      <Routes>
        <Route path="/authorization" element={<Authorization />} />
      </Routes>
    </div>
  );
}

export default App;
