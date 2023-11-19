import 'normalize.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Authorization from './pages/Login';
import Users from './pages/Users';
import AppRouter from './components/AppRouter';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  //return (
  //  <div>
  //    <Routes>
  //      <Route path="/authorization" element={<Authorization />} />
  //      <Route path="/users" element={<Users />} />
  //    </Routes>
  //  </div>
  //);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
