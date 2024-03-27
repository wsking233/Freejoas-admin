import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import CookieManager from '../service/cookieManager';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';

function Router() {

  const PrivateRoute = ({ element }) => {
    const token = CookieManager().getCookie('token');
    
    return token ? element : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/login" element={<Login />} />

        {/* 404 Page */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
