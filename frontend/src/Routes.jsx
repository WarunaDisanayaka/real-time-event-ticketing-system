import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './ContextAPI/UserContext';
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
                    <Route path="/" element={<Home />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/vendor-sign-up" element={<VendorSignUp />} />
                    <Route path="/vendor-home" element={<VendorHome />} />
                    <Route path="/create-event" element={<CreateEvent />} />
                    <Route path="/all-events" element={<AllEvents />} />
                    <Route path="/ticket-card-details" element={<TicketDetails />} />

                </Routes>
            </Router>
        </UserProvider>
    );
};

export default AppRoutes;
