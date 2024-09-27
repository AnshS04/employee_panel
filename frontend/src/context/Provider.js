import React, { useState } from 'react';
import MyContext from './MyContext';

const MyProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("admin") !== null);

    return (
        <MyContext.Provider value={{ isAdmin, setIsAdmin }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyProvider;
