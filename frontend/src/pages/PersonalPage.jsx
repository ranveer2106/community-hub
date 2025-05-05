import 
// React,
 { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const PersonalPage = () => {
    const { token, url } = useContext(StoreContext);
    const [userData, setUserData] = useState({});
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await axios.post(`${url}/api/user/profile`, {}, {
                headers: { token },
            });
            if (response.data.success) setUserData(response.data.user);
        };

        const fetchTransactions = async () => {
            const response = await axios.post(`${url}/api/credits/history`, {}, {
                headers: { token },
            });
            if (response.data.success) setTransactions(response.data.transactions);
        };

        fetchUserData();
        fetchTransactions();
    }, [token, url]);

    return (
        <div>
            <h1>Welcome, {userData.name}</h1>
            <p>Credits: {userData.credits}</p>
            <h2>Transaction History</h2>
            <ul>
                {transactions.map((txn, index) => (
                    <li key={index}>
                        {txn.purpose}: {txn.amount} points ({txn.type})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PersonalPage;