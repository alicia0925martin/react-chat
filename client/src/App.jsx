import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import SignupPage from './components/pages/SignupPage';
import LoginPage from './components/pages/LoginPage';
import SettingsPage from './components/pages/SettingsPage';
import ProfilePage from './components/pages/ProfilePage';
import Navbar from './components/Navbar';
import useAuth from './hooks/useAuth';
import { Loader } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { THEMES } from './utils/constants';
import OtpPage from './components/OtpPage';

function App() {
  const { user, isLoading } = useAuth(); // Removed signupData check here
  const location = useLocation();

  const { theme } = useSelector((store) => store.config);


  
  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        {/* ✅ Pass signupData via route state instead of Redux */}
        <Route path="/verify-otp" element={!user ? <OtpPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />

        {/* Protected Routes */}
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
