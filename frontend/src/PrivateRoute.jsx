import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
    // Fetch the token and role from localStorage or context
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // Assume role is stored in localStorage

    // If no token or role doesn't match, redirect to login
    if (!token || userRole !== role) {
        return <Navigate to="/login" replace />;
    }

    // If authenticated and role matches, render the children
    return children;
};

export default PrivateRoute;
