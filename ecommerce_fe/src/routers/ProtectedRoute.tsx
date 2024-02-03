import React, { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const currentUser=true;

    return currentUser? <Outlet/> : <Navigate to={"/login"}/>;
};

export default ProtectedRoute;