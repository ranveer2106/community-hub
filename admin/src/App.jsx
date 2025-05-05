import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Reports from './components/Reports/Reports';
import Users from './components/Users/Users';
import Stats from './components/Stats/Stats';
import { Route, Routes } from 'react-router-dom';
import UrlProvider from './UrlContext'; // Import the UrlProvider

const App = () => {
    return (
        <UrlProvider>
            <Navbar />
            <div className="app-component">
                <Sidebar />
                <Routes>
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/stats" element={<Stats />} />
                </Routes>
            </div>
        </UrlProvider>
    );
};

export default App;