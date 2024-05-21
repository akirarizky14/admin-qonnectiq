import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../views/Login/Login';
import '../css/routes/GlobalRoutes.css';
import Dashboard from '../views/Dashboard/Dashboard';
import { useAuthContext } from '../hooks/useAuthContext';

function GlobalRoutes() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <div className="BrowserRouter">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default GlobalRoutes;
