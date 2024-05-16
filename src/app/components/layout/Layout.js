import React from 'react';
import Header from '../header/Header'; 
import Sidebar from '../sidebar/Sidebar';

const Layout = ({ children }) => {
    return (
        <div id='wrapper'>
            <Header />
            <Sidebar/>
            {children} 
        </div>
    );
};

export default Layout;