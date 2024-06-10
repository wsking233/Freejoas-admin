import React, { useState, useEffect } from 'react';
import axios from '../service/axios';
import './userManagement.css';

function UserManagement() {

    const [users, setUsers] = useState([]);

    const deleteUser = (id) => {
        alert(`Delete user with id: ${id}`);
        // setUsers(users.filter(user => user.id !== id));
    };

    const fetchUsers = async () => {
        // fetch users from the server
        try {
            const response = await axios.get('/user/all');
            if (response.data.data === null || response.data.data === undefined || response.data.data.length === 0) {
                console.log('No data');
                return;
            }
            setUsers(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="user-management">
            <h2>User Management</h2>

            <input
                type="text"
                placeholder="Search..."
            />

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
                            <tr key={user.id}>
                                <td>{user._id}</td>
                                <td>{user.username}</td>
                                <td>{user.firstname} {user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.accountType}</td>
                                <td>{user.uploads}</td>
                                <td>{user.createdAt}</td>
                                <td>
                                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                : <p>No users found</p>}
        </div>
    );
}

export default UserManagement;