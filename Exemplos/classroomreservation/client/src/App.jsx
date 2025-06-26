import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  const session = JSON.parse(localStorage.getItem('sessionId'));

  return (
      <Routes>
        <Route
          path="/"
          element={session ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={session ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
  );
}

export default App;


