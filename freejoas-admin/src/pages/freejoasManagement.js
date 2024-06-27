import React, { useState, useEffect } from 'react';
import './userManagement.css';
import axios from '../service/axios';
import SessionStorageManager from '../service/SessionStorageManager';
import { FREEJOAS } from '../service/storageKeys';
import { useNavigate } from 'react-router-dom';


function FreejoasManagement() {

    const [freejoas, setfreejoas] = useState([]);
    const navigate = useNavigate();


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

    const handleRowClick = (freejoa) => {
        navigate(`/detail/${freejoa._id}`, { state: { freejoa } });

    };

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
            <h2>Verified Freejoas Data</h2>

            <input
                type="text"
                placeholder="Search..."
            />

            {freejoas.length !== 0 ?
                <table>
                    <thead>
                        <tr>
                            <th>Freejoa ID</th>
                            <th>Title</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Active</th>
                            <th>Uploader ID</th>
                            <th>Updated By</th>
                            <th>Description</th>
                            <th>Images</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {freejoas.map(freejoa => (
                            <tr key={freejoa._id}>
                                <td>{freejoa._id}</td>
                                <td>{freejoa.title}</td>
                                <td>{freejoa.latitude}</td>
                                <td>{freejoa.longitude}</td>
                                <td>{freejoa.status}</td>
                                <td>{freejoa.amount}</td>
                                <td>{freejoa.isActive}</td>
                                <td>{freejoa.uploader}</td>
                                <td>{freejoa.updatedBy}</td>
                                <td>{freejoa.description}</td>
                                <td><img src={freejoa.image[0].data}></img></td>
                                <td>
                                    <button onClick={() => handleRowClick(freejoa)}>View</button>
                                    <button onClick={() => deleteUser(freejoa.id)}>Delete</button>
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