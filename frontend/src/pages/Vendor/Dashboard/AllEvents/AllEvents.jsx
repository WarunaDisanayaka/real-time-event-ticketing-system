import React, { useState } from "react";
import SideBar from "../../../../components/Vendor/Dashboard/SideBar";
import TopBar from "../../../../components/Vendor/Dashboard/TopBar";

const AllEvents = () => {
    // Mock data for events
    const [events, setEvents] = useState([
        {
            id: 1,
            name: "Music Festival",
            image: "https://via.placeholder.com/150",
            isActive: false,
        },
        {
            id: 2,
            name: "Tech Conference",
            image: "https://via.placeholder.com/150",
            isActive: false,
        },
        {
            id: 3,
            name: "Art Exhibition",
            image: "https://via.placeholder.com/150",
            isActive: false,
        },
    ]);

    // Toggle event start/stop
    const toggleEventStatus = (id) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === id ? { ...event, isActive: !event.isActive } : event
            )
        );
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
                                    <h1 className="h3 mb-0 text-gray-800">All Events</h1>
                                </div>
                                <div className="row">
                                    {events.map((event) => (
                                        <div key={event.id} className="col-lg-4 col-md-6 mb-4">
                                            <div className="card shadow h-100 d-flex flex-column">
                                                <div className="card-header py-3">
                                                    <h6 className="m-0 font-weight-bold text-primary">
                                                        {event.name}
                                                    </h6>
                                                </div>
                                                <div className="card-body d-flex flex-column align-items-center">
                                                    <img
                                                        src={event.image}
                                                        alt={event.name}
                                                        className="img-fluid mb-3 rounded"
                                                        style={{ maxHeight: "200px" }}
                                                    />
                                                    <div className="mt-auto w-100 text-center">
                                                        <button
                                                            className={`btn ${event.isActive
                                                                ? "btn-danger"
                                                                : "btn-success"
                                                                } w-100`}
                                                            onClick={() => toggleEventStatus(event.id)}
                                                        >
                                                            {event.isActive ? "Stop Event" : "Start Event"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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

export default AllEvents;
