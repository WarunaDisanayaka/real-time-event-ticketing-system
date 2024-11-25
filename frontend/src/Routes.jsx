import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './ContextAPI/UserContext';
import PrivateRoute from './PrivateRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/User/Home/Home';
import Login from './pages/User/Login/Login';
import SignUp from './pages/User/SignUp/SignUp';
import TicketDetails from './pages/User/TicketDetails/TicketDetails';
import AllEvents from './pages/Vendor/Dashboard/AllEvents/AllEvents';
import CreateEvent from './pages/Vendor/Dashboard/CreateEvent/CreateEvent';
import VendorHome from './pages/Vendor/Dashboard/Home/VendorHome';
import VendorSignUp from './pages/Vendor/SignUp/VendorSignUp';

const AppRoutes = () => {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/vendor-sign-up" element={<VendorSignUp />} />

                    {/* Vendor Protected Routes */}
                    <Route
                        path="/vendor-home"
                        element={
                            <PrivateRoute role="vendor">
                                <VendorHome />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/create-event"
                        element={
                            <PrivateRoute role="vendor">
                                <CreateEvent />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/all-events"
                        element={
                            <PrivateRoute role="vendor">
                                <AllEvents />
                            </PrivateRoute>
                        }
                    />

                    {/* User Protected Route (if any) */}
                    <Route
                        path="/ticket-card-details"
                        element={
                            <PrivateRoute role="user">
                                <TicketDetails />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default AppRoutes;
