import React, {useEffect} from 'react';
import NavBar from './components/NavBar/NavBar';
import "@fontsource/rubik";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/Login/Auth';
import NotistackWrapper from './components/CustomSnackBar/NotistackSnackBar';
import Dashboard from './pages/Dashboard/DashBoard';
import Home from './pages/Home/Home';
import { initializeSessionStorageSync } from './helpers/SyncSessionStorage';

function App() {




  useEffect(() => {
    // Initialize sessionStorage sync logic
    initializeSessionStorageSync();

    return () => {
      window.removeEventListener('storage', initializeSessionStorageSync);
    };
  }, []);

  return (
    <NotistackWrapper>
      <NavBar />
      
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Router>
    </NotistackWrapper>
  );
}

export default App;
