import React, { useState } from "react";
import CookieManager from "../service/cookieManager";
import { useNavigate } from 'react-router-dom';
import ListingCard from "../components/listingCard";
import axios from '../service/axios';

function Dashboard() {

    const navigate = useNavigate();
    const cookieManager = CookieManager();
    const [error, setError] = useState('');
    const [freejoas, setFreejoas] = useState([]);

    const handleLogout = (e) => {
        e.preventDefault();
        console.log('logout');
        cookieManager.removeCookie('token');
        navigate('/login');
    }

    const handleGetAllFreejoas = async (e) => {
        e.preventDefault();
        console.log('get all freejoas');
        try {
            const response = await axios.get('/freejoa/all', { timeout: 5000 });
            console.log("data: ", response.data.data);
            console.log("response: ", response.data.message);
            setFreejoas(response.data.data);
        } catch (err) {
            setError(err.response.data.message);
            console.log(err.response.data.message);
        }
    }

    return (
        <div>

            <h1>Dashboard pages</h1>
            <div>
                <hr />

                <p>show all the freejoas</p>
                <form onSubmit={handleGetAllFreejoas}>
                    <button type="submit">Get All Freejoas</button>
                </form>

            </div>
            <div>
                <hr />
                <ul className="locations-list">
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    {freejoas.map((item, index) => (
                        <li key={index}>
                            <ListingCard item={item} />
                        </li>
                    ))}
                </ul>
            </div>



            <div>
                <hr />

                <form onSubmit={handleLogout}>
                    <button type="submit">Logout</button>
                </form>
            </div>
        </div>
    );
}
export default Dashboard;