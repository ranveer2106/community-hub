import { createContext } from 'react';

export const UrlContext = createContext();

const UrlProvider = ({ children }) => {
    // const url = 'http://localhost:4000'; // Backend base URL
    const url = 'https://community-hub-backend.onrender.com'; // Backend base URL

    return (
        <UrlContext.Provider value={{ url }}>
            {children}
        </UrlContext.Provider>
    );
};

export default UrlProvider;