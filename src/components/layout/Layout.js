'use client';
import React, { useState } from 'react';
import Header from '../header/Header'; 
import Sidebar from '../sidebar/Sidebar';
import ScrollTop from '../footer/ScrollTop';

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    
    return (
        <div id='wrapper'>
            <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            {children} 
            <ScrollTop/>
        </div>
    );
};

export default Layout;