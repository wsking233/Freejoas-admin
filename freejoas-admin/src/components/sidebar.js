// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {

  return (
      <div className={"sidebar"}>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/usermanagement">Profile</Link></li>
        </ul>
      </div>
  );
};

export default Sidebar;
