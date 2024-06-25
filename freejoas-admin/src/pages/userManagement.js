import React, { useState, useEffect } from 'react';
import axios from '../service/axios';
import SessionStorageManager from '../service/SessionStorageManager';
import { USER } from '../service/storageKeys';
import './userManagement.css';

function UserManagement() {

    const [users, setUsers] = useState([]);

    const deleteUser = (id) => {
        alert(`Delete user with id: ${id}`);
        // setUsers(users.filter(user => user.id !== id));
    };

    const fetchUsersFromAPI = async () => {
        // fetch users from the server
        try {
            const response = await axios.get('/user/all');
            if (response.data.data === null || response.data.data === undefined || response.data.data.length === 0) {
                console.log('No data');
                return;
            }
            console.log("API: /user/all called successfully");
            setUsers(()=>(response.data.data));
            SessionStorageManager().setItem(USER, response.data.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const cachedUsers = SessionStorageManager().getItem(USER);
        if (cachedUsers) {
          setUsers(()=>(cachedUsers));
          console.log("cachedUsers");
        } else {
          fetchUsersFromAPI();
        }

    }, []);

    return (
        <div className="user-management">
            <h2>User Data</h2>

            <div style={{display:'flex', columnGap:'16px', paddingBottom: '16px'}}>
                <button onClick={()=>(fetchUsersFromAPI)}>
                    Refresh
                </button>

                <input
                    type="text"
                    placeholder="Search..."
                />
            </div>


            {users.length !== 0 ?
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Uploads</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.username}</td>
                                <td>{user.firstname} {user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.accountType}</td>
                                <td>{user.uploads.length}</td>
                                <td>{user.createdAt}</td>
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

export default UserManagement;