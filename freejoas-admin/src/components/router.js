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

function Router() {

  const PrivateRoute = ({ element }) => {
    const token = CookieManager().getCookie('token');

    return token ?
      <div className='layout'>
        <div className='sidebar'>
          <Sidebar />
        </div>
        <div className='main_container'>
          {element}
        </div>
      </div>
      :
      <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/all" element={<PrivateRoute element={<UserManagement />} />} />
        <Route path="/freejoa/verified" element={<PrivateRoute element={<FreejoasManagement />} />} />
        <Route path="/freejoa/pending" element={<PrivateRoute element={<PendingFreejoas />} />} />

        {/* 404 Page */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
