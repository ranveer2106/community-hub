import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UrlContext } from '../../UrlContext'; // Import the UrlContext

const Reports = () => {
    const [reports, setReports] = useState([]);
    const { url } = useContext(UrlContext); // Access the URL from the context

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get(`${url}/api/admin/reports`);
                if (response.data.success) {
                    setReports(response.data.reports);
                }
            } catch (error) {
                console.error('Error fetching reports:', error.message);
            }
        };

        fetchReports();
    }, [url]);

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