import 'normalize.css';
import { Routes, Route } from 'react-router-dom';
import Authorization from './pages/Authorization';
import Users from './pages/Users';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
