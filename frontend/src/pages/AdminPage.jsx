import React, { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const AdminPage = () => {
    const { token, url } = useContext(StoreContext);
    const [reports, setReports] = useState([]);
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({});

    useEffect(() => {
        const fetchAdminData = async () => {
            const reportsResponse = await axios.get(`${url}/api/admin/reports`, {
                headers: { token },
            });
            const usersResponse = await axios.get(`${url}/api/admin/users`, {
                headers: { token },
            });
            const statsResponse = await axios.get(`${url}/api/admin/stats`, {
                headers: { token },
            });

            if (reportsResponse.data.success) setReports(reportsResponse.data.reports);
            if (usersResponse.data.success) setUsers(usersResponse.data.users);
            if (statsResponse.data.success) setStats(statsResponse.data.stats);
        };

        fetchAdminData();
    }, [token, url]);

    return (
        <div>
            <h1>Admin Panel</h1>
            <h2>Reported Content</h2>
            <ul>
                {reports.map((report, index) => (
                    <li key={index}>{report.title}</li>
                ))}
            </ul>
            <h2>Users</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user.name}</li>
                ))}
            </ul>
            <h2>Stats</h2>
            <p>Top Saved Content: {stats.topSavedContent?.length}</p>
            <p>Most Active Users: {stats.mostActiveUsers?.length}</p>
        </div>
    );
};

export default AdminPage;