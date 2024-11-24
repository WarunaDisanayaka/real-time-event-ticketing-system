import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/User/Home/Home';
import Login from './pages/User/Login/Login';
import SignUp from './pages/User/SignUp/SignUp';


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/login" element={<Login />} />

            </Routes>
        </Router>
    );
};

export default AppRoutes;
