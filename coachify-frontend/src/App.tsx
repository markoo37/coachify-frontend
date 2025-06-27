import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AthletesPage from './pages/AthletesPage';
import LandingPage from './pages/LandingPage';
import MyTeamsPage from './pages/MyTeamsPage';
import ProfilePage from './pages/ProfilePage'; // ÚJ import
import Navbar from './components/Navbar';
import { useAuthStore } from './store/authStore';
import Dashboard from './pages/Dashboard';
import TrainingPlansPage from './pages/TrainingPlansPage';

function App() {
  const expiry = useAuthStore(state => state.expiry);
  const logout = useAuthStore(state => state.logout);
  const token = useAuthStore(state => state.token);

  useEffect(() => {
    if (expiry) {
      const timeout = expiry - Date.now();
      if (timeout > 0) {
        const timer = setTimeout(() => {
          logout();
          window.location.href = '/login';
        }, timeout);
        return () => clearTimeout(timer);
      } else {
        logout();
        window.location.href = '/login';
      }
    }
  }, [expiry, logout]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={!token ? <LandingPage /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/register" element={!token ? <RegisterPage /> : <Navigate to="/athletes" />} />
        <Route path="/athletes" element={token ? <AthletesPage /> : <Navigate to="/login" />} />
        <Route path="/my-teams" element={token ? <MyTeamsPage /> : <Navigate to="/login" />} />
        <Route path="/training-plans" element={token ? <TrainingPlansPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={token ? <ProfilePage /> : <Navigate to="/login" />} /> {/* ÚJ route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;