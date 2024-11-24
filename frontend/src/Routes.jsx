import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './ContextAPI/UserContext';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/User/Home/Home';
import Login from './pages/User/Login/Login';
import SignUp from './pages/User/SignUp/SignUp';
import VendorSignUp from './pages/Vendor/SignUp/VendorSignUp';


const AppRoutes = () => {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/vendor-sign-up" element={<VendorSignUp />} />


                </Routes>
            </Router>
        </UserProvider>
    );
};

export default AppRoutes;
