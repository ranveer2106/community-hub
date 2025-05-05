import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Reports from './pages/Reports/Reports';
import Users from './pages/Users/Users';
import Stats from './pages/Stats/Stats';
import { Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <>
            <Navbar />
            <div className="app-component">
                <Sidebar />
                <Routes>
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/stats" element={<Stats />} />
                </Routes>
            </div>
        </>
    );
};

export default App;