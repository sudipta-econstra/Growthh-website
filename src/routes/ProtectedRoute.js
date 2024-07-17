import React, { createContext, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Loader from '../pages/landing/loder/Loader';
const Header = React.lazy(() => import('../layouts/Header'));
const Sidebar = React.lazy(() => import('../layouts/Sidebar'));
const Footer = React.lazy(() => import('../layouts/Footer'));


export const UserContext = createContext();

function ProtectedRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState(true)
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <UserContext.Provider value={isAuthenticated}>
            {/* <Loader/> */}
            <div className="wrapper">
                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    <div className="content">
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </div>
        </UserContext.Provider>
    )
};

export default ProtectedRoute