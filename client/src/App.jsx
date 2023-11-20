import 'normalize.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import styles from './scss/App.module.scss';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className={styles.app}>
          <AppRouter />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
