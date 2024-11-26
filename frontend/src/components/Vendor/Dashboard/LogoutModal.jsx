import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutModal = () => {
    const navigate = useNavigate(); // React Router's navigation hook

    const handleLogout = () => {
        // Clear localStorage (or any other storage used for authentication)
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('id');


        // Redirect to the login page
        window.location.href = '/login';
    };

    return (
        <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Ready to Leave?
                        </h5>
                        <button
                            className="close"
                            type="button"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Select "Logout" below if you are ready to end your current
                        session.
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            type="button"
                            data-dismiss="modal"
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleLogout} // Call the logout handler
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
