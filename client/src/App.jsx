import { useEffect } from 'react';
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
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

function App() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  const {theme} = useSelector((store)=>store.config);

  if (isLoading) return <div className='flex items-center justify-center h-screen'>
    <Loader className='size-10 animate-spin'/>
  </div>;

  return (
    <div className="" data-theme={theme}>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />

        {/* Protected Routes */}
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path="/settings" element={ <SettingsPage /> } />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      
      <Toaster/>
    </div>
  );
}

export default App;
