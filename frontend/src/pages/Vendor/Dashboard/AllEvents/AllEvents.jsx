import React, { useState, useEffect, useContext } from "react";
import SideBar from "../../../../components/Vendor/Dashboard/SideBar";
import TopBar from "../../../../components/Vendor/Dashboard/TopBar";
// Uncomment and use AuthContext when ready
// import { AuthContext } from "../../../../context/AuthContext";

const AllEvents = () => {
    // Replace with context logic once AuthContext is implemented
    const vendorId = 1; // Example value, replace with `const { vendorId } = useContext(AuthContext);`

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch events for the specific vendor
    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/api/event/vendor/${vendorId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch events. Please try again later.");
                }
                const data = await response.json();
                console.log(data); // Log the response to ensure it contains the expected data
                setEvents(data || []); // Directly use `data` if it's an array
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [vendorId]);


    // Toggle event active status
    const toggleEventStatus = (id) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === id ? { ...event, isActive: !event.isActive } : event
            )
        );
    };

    // Loading state
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div>Loading events...</div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    // Main render
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
                                    <h1 className="h3 mb-0 text-gray-800">All Events</h1>
                                </div>
                                <div className="row">
                                    {events.length > 0 ? (
                                        events.map((event) => (
                                            <div key={event.id} className="col-lg-4 col-md-6 mb-4">
                                                <div className="card shadow h-100 d-flex flex-column">
                                                    <div className="card-header py-3">
                                                        <h6 className="m-0 font-weight-bold text-primary">
                                                            {event.name}
                                                        </h6>
                                                    </div>
                                                    <div className="card-body d-flex flex-column align-items-center">
                                                        <img
                                                            src={`http://localhost:3000/${event.image}`}
                                                            alt={event.name}
                                                            className="img-fluid mb-3 rounded"
                                                            style={{ maxHeight: "200px", objectFit: "cover" }}
                                                        />
                                                        <p className="text-muted">
                                                            Tickets Available: {event.ticketsAvailable} / {event.totalTickets}
                                                        </p>
                                                        <div className="mt-auto w-100 text-center">
                                                            <button
                                                                className={`btn ${event.isActive ? "btn-danger" : "btn-success"} w-100`}
                                                                onClick={() => toggleEventStatus(event.id)}
                                                            >
                                                                {event.isActive ? "Stop Event" : "Start Event"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-12">
                                            <div className="alert alert-info" role="alert">
                                                No events found.
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="text-center my-auto">
                                    <span>&copy; Your Company 2024</span>
                                </div>
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

export default AllEvents;
