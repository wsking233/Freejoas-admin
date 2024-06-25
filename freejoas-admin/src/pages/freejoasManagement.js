import React, { useState, useEffect } from 'react';
import axios from '../service/axios';
import SessionStorageManager from '../service/SessionStorageManager';
import { FREEJOAS } from '../service/storageKeys';
import './userManagement.css';

function FreejoasManagement() {

    const [freejoas, setfreejoas] = useState([]);

    const deleteUser = (id) => {
        alert(`Delete user with id: ${id}`);
        // setfreejoas(freejoas.filter(user => user.id !== id));
    };

    const fetchfreejoasFromAPI = async () => {
        // fetch freejoas from the server
        try {
            const response = await axios.get('/freejoa/all');
            if (response.data.data === null || response.data.data === undefined || response.data.data.length === 0) {
                console.log('No data');
                return;
            }
            console.log("API: /freejoa/all called successfully");
            setfreejoas(()=>(response.data.data));
            SessionStorageManager().setItem(FREEJOAS, response.data.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const cachedFreejoas = SessionStorageManager().getItem(FREEJOAS);
        if (cachedFreejoas) {
            setfreejoas(()=>(cachedFreejoas));
          console.log("Cached Freejoas");
        } else {
            fetchfreejoasFromAPI();
        }
    }, []);

    return (
        <div className="user-management">
            <h2>Freejoas Data</h2>

            <input
                type="text"
                placeholder="Search..."
            />

            {freejoas.length !== 0 ?
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Title</th>
                            <th>Active</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Uploader ID</th>
                            <th>Updated By</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {freejoas.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.latitude}</td>
                                <td>{user.longitude}</td>
                                <td>{user.title}</td>
                                <td>{user.isActive}</td>
                                <td>{user.status}</td>
                                <td>{user.amount}</td>
                                <td>{user.uploader}</td>
                                <td>{user.updatedBy}</td>
                                <td>
                                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                : <p>No Data found</p>}
        </div>
    );
}

export default FreejoasManagement;