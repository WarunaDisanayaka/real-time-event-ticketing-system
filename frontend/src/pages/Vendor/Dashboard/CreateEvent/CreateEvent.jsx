import React, { useState, useEffect } from 'react';
import LogoutModal from '../../../../components/Vendor/Dashboard/LogoutModal';
import SideBar from '../../../../components/Vendor/Dashboard/SideBar';
import TopBar from '../../../../components/Vendor/Dashboard/TopBar';

const CreateEvent = () => {
    const [form, setForm] = useState({
        name: '',
        totalTickets: '',
        ticketReleaseRate: '',
        customerRetrievalRate: '',
        startDate: '',
        price: '',
        image: null,
        vendorId: '', // Vendor ID added here
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch or set vendorId (e.g., from user context or API)
    useEffect(() => {
        const fetchVendorId = async () => {
            try {
                // Simulate fetching vendorId (replace this with actual API or context logic)
                const fetchedVendorId = localStorage.getItem("id"); // Replace with real logic
                setForm((prevForm) => ({ ...prevForm, vendorId: fetchedVendorId }));
            } catch (error) {
                console.error('Failed to fetch vendor ID:', error);
            }
        };

        fetchVendorId();
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setForm({ ...form, [id]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, image: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, totalTickets, ticketReleaseRate, customerRetrievalRate, startDate, price, image, vendorId } = form;

        // Validation
        if (!name || !totalTickets || !ticketReleaseRate || !customerRetrievalRate || !startDate || !price || !image || !vendorId) {
            setErrorMessage('All fields are required.');
            setSuccessMessage('');
            return;
        }

        if (isNaN(totalTickets) || totalTickets <= 0) {
            setErrorMessage('Total Tickets must be a positive number.');
            return;
        }

        if (isNaN(price) || price <= 0) {
            setErrorMessage('Price must be a positive number.');
            return;
        }

        setErrorMessage('');
        setSuccessMessage('');

        // Prepare form data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('totalTickets', totalTickets);
        formData.append('ticketReleaseRate', ticketReleaseRate);
        formData.append('customerRetrievalRate', customerRetrievalRate);
        formData.append('startDate', startDate);
        formData.append('price', price);
        formData.append('image', image);
        formData.append('vendorId', vendorId);

        try {
            const response = await fetch('http://localhost:3000/api/event/create', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to create event.');
            }

            const data = await response.json();
            console.log('Event created:', data);
            setSuccessMessage('Event created successfully!');
            setErrorMessage('');
            setForm({
                name: '',
                totalTickets: '',
                ticketReleaseRate: '',
                customerRetrievalRate: '',
                startDate: '',
                price: '',
                image: null,
                vendorId,
            });
        } catch (error) {
            console.error('Error creating event:', error);
            setErrorMessage('Failed to create event. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div>
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
                                                        value={form.name}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Event Name"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="totalTickets">Total Tickets</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="totalTickets"
                                                        value={form.totalTickets}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Total Tickets"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="ticketReleaseRate">Ticket Release Rate</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="ticketReleaseRate"
                                                        value={form.ticketReleaseRate}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Ticket Release Rate"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="customerRetrievalRate">Customer Retrieval Rate</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="customerRetrievalRate"
                                                        value={form.customerRetrievalRate}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Customer Retrieval Rate"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="startDate">Start Date</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="startDate"
                                                        value={form.startDate}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="price">Price</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="price"
                                                        value={form.price}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Price"
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
                </div>
            </div>
            <LogoutModal />

        </div>
    );
};

export default CreateEvent;
