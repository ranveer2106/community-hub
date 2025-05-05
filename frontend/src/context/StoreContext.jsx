import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    // const url = 'http://localhost:4000'; 
    const url = 'https://community-hub-backend.onrender.com'; 
    const [token, setToken] = useState('');

    const contextValue = {
        url, // Pass the URL to the context
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

StoreContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default StoreContextProvider;