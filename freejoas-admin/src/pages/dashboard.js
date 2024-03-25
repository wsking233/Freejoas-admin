import React, { useEffect } from "react";
import CookieManager from "../components/cookieManager";
import { useNavigate } from 'react-router-dom';

function Dashboard() {

    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        console.log('logout');
        const cookieManager = CookieManager();
        cookieManager.removeCookie('token');
        navigate('/login');
    }

    return (
        <div>
            <h1>Dashboard pages</h1>

            <div>
                <form onSubmit={handleLogout}>
                    <button type="submit">Logout</button>
                </form>
            </div>

        </div>
    );
}
export default Dashboard;