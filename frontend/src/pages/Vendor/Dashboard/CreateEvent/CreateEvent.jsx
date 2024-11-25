import React, { useState } from 'react';
import SideBar from '../../../../components/Vendor/Dashboard/SideBar';
import TopBar from '../../../../components/Vendor/Dashboard/TopBar';

const CreateEvent = () => {
    const [name, setName] = useState('');
    const [totalTickets, setTotalTickets] = useState('');
    const [ticketReleaseRate, setTicketReleaseRate] = useState('');
    const [customerRetrievalRate, setCustomerRetrievalRate] = useState('');
    const [image, setImage] = useState(null); // For image file
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (
            !name.trim() ||
            !totalTickets ||
            !ticketReleaseRate ||
            !customerRetrievalRate ||
            !image
        ) {
            setErrorMessage('All fields are required.');
            setSuccessMessage('');
            return;
        }

        // Clear error and success messages
        setErrorMessage('');
        setSuccessMessage('');

        // Prepare the data to be sent to the backend
        const formData = new FormData();
        formData.append('name', name);
        formData.append('totalTickets', totalTickets);
        formData.append('ticketReleaseRate', ticketReleaseRate);
        formData.append('customerRetrievalRate', customerRetrievalRate);
        formData.append('image', image);


    };

    return (
        <div>
            <body id="page-top">
                <div id="wrapper">
                    <SideBar />
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <TopBar />
                            <div className="container-fluid">
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Create Event</h1>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-primary">Event Details</h6>
                                            </div>
                                            <div className="card-body">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="form-group">
                                                        <label htmlFor="name">Event Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="name"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            placeholder="Enter Event Name"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="totalTickets">Total Tickets</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            id="totalTickets"
                                                            value={totalTickets}
                                                            onChange={(e) => setTotalTickets(e.target.value)}
                                                            placeholder="Enter Total Tickets"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="ticketReleaseRate">Ticket Release Rate</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="ticketReleaseRate"
                                                            value={ticketReleaseRate}
                                                            onChange={(e) => setTicketReleaseRate(e.target.value)}
                                                            placeholder="Enter Ticket Release Rate"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="customerRetrievalRate">Customer Retrieval Rate</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="customerRetrievalRate"
                                                            value={customerRetrievalRate}
                                                            onChange={(e) => setCustomerRetrievalRate(e.target.value)}
                                                            placeholder="Enter Customer Retrieval Rate"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="image">Upload Image</label>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            id="image"
                                                            onChange={handleImageUpload}
                                                        />
                                                    </div>

                                                    {errorMessage && (
                                                        <div className="alert alert-danger">
                                                            {errorMessage}
                                                        </div>
                                                    )}
                                                    {successMessage && (
                                                        <div className="alert alert-success">
                                                            {successMessage}
                                                        </div>
                                                    )}

                                                    <button type="submit" className="btn btn-primary">
                                                        Create Event
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto"></div>
                            </div>
                        </footer>
                    </div>
                </div>
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>
            </body>
        </div>
    );
};

export default CreateEvent;
