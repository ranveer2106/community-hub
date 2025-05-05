import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UrlContext } from '../../UrlContext'; // Import the UrlContext

const Users = () => {
    const [users, setUsers] = useState([]);
    const { url } = useContext(UrlContext); // Access the URL from the context

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${url}/api/admin/users`);
                if (response.data.success) {
                    setUsers(response.data.users);
                }
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };

        fetchUsers();
    }, [url]);

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