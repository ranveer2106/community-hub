import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('/api/admin/users');
            if (response.data.success) {
                setUsers(response.data.users);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Manage Users</h1>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Credits: {user.credits}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;