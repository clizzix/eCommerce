import Navbar from '../components/Navbar';
import React from 'react';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-4">
                <Outlet />
            </div>
        </>
    );
};

export default MainLayout;
