import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';

function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />

                {/* 404 Page */}
                <Route path="*" element={<h1>Page Not Found</h1>} />
            </Route>
        </Routes>
    </BrowserRouter>
  );
};

export default Router;
