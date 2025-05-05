import 
// React,
 { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const url = 'https://oauth.reddit.com'; // Reddit API base URL
    const [token, setToken] = useState('fwL0r61OK08i9djWUdLV_3q0iJpRzw'); // Replace with your actual token

    const contextValue = {
        url,
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