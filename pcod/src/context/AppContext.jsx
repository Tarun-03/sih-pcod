import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);

    return (
        <AppContext.Provider value={{ profile, setProfile }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);