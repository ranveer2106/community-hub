import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-options">
                <NavLink to="/reports" className="sidebar-option">
                    <div><ion-icon name="alert-circle-outline"></ion-icon></div>
                    <p>Reports</p>
                </NavLink>
                <NavLink to="/users" className="sidebar-option">
                    <div><ion-icon name="people-outline"></ion-icon></div>
                    <p>Users</p>
                </NavLink>
                <NavLink to="/stats" className="sidebar-option">
                    <div><ion-icon name="stats-chart-outline"></ion-icon></div>
                    <p>Stats</p>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;