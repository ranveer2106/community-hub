import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setshowLogin }) => {
    const { token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    return (
        <div className='navbar'>
            <Link to="/feed">Feed</Link>
            <Link to="/personal">Personal</Link>
            {!token ? (
                <button onClick={() => setshowLogin(true)}>Login</button>
            ) : (
                <button onClick={logOut}>Logout</button>
            )}
        </div>
    );
};

export default Navbar;