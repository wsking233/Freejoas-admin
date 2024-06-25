import React, { useState, useEffect } from 'react';
import axios from '../service/axios';
import SessionStorageManager, {FREEJOAS} from '../service/SessionStorageManager';
import './userManagement.css';

function PendingFreejoas() {

    const [pendingFreejoas, setPendingFreejoas] = useState([]);

    const deleteUser = (id) => {
        alert(`Delete user with id: ${id}`);
        // setfreejoas(freejoas.filter(user => user.id !== id));
    };

    const fetchPendingFreejoasFromAPI = async () => {
        // fetch freejoas from the server
        try {
            const response = await axios.get('/admin/pending/freejoas/all');
            if (response.data.data === null || response.data.data === undefined || response.data.data.length === 0) {
                console.log('No data');
                return;
            }
            console.log("API: /admin/freejoa/all called successfully");
            setPendingFreejoas(()=>(response.data.data));
            SessionStorageManager().setItem(FREEJOAS, response.data.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const cachedFreejoas = SessionStorageManager().getItem(FREEJOAS);
        if (cachedFreejoas) {
            setPendingFreejoas(()=>(cachedFreejoas));
          console.log("Cached Freejoas");
        } else {
            fetchPendingFreejoasFromAPI();
        }
    }, []);

    return (
        <div className="user-management">
            <h2>Pending Data</h2>

            
            <div style={{display:'flex', columnGap:'16px', paddingBottom: '16px'}}>
                <button onClick={fetchPendingFreejoasFromAPI}>
                    Refresh
                </button>

                <input
                    type="text"
                    placeholder="Search..."
                />
            </div>


            {pendingFreejoas.length !== 0 ?
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
                        {pendingFreejoas.map(user => (
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

export default PendingFreejoas;