import React from 'react';
import './router.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import CookieManager from '../service/cookieManager';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import Sidebar from './sidebar';
import UserManagement from '../pages/userManagement';
import FreejoasManagement from '../pages/freejoasManagement';
import PendingFreejoas from '../pages/pendingFreejoas';
import FreejoasDetail from './FreejoasDetail';
import FreejoasPage from '../pages/freejoasPage';

function Router() {

  const PrivateRoute = ({ element }) => {
    const token = CookieManager().getCookie('token');
    
    return token ? <div className='layout'>
    <Sidebar />
    <div className='main_container'>
      {element}
    </div>

  </div> : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usermanagement" element={<PrivateRoute element={<UserManagement />} />} />
        <Route path="/freejoasmanagement" element={<PrivateRoute element={<FreejoasManagement />} />} />
        <Route path="/pendingfreejoas" element={<PrivateRoute element={<PendingFreejoas />} />} />
        <Route path="/detail/:id" element={<PrivateRoute element={<FreejoasDetail />} />} />
        <Route path="/freejoas" element={<PrivateRoute element={<FreejoasPage />} />} />

        {/* 404 Page */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
