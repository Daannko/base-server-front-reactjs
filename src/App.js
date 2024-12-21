import React from 'react';
import NavBar from './components/NavBar/NavBar';
import "@fontsource/rubik";
import styles from './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/Login/Auth';
import NotistackWrapper from './components/CustomSnackBar/NotistackSnackBar';
import Dashboard from './pages/Dashboard/DashBoard';
import Home from './pages/Home/Home';

function App() {
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
