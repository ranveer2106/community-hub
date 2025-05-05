import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reports = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            const response = await axios.get('/api/admin/reports');
            if (response.data.success) {
                setReports(response.data.reports);
            }
        };

        fetchReports();
    }, []);

    return (
        <div>
            <h1>Reported Content</h1>
            <ul>
                {reports.map((report, index) => (
                    <li key={index}>
                        <h2>{report.title}</h2>
                        <p>{report.preview}</p>
                        <a href={report.url} target="_blank" rel="noopener noreferrer">View Content</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Reports;