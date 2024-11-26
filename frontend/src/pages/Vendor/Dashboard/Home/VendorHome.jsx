import React, { useState, useEffect } from "react";
import LogoutModal from "../../../../components/Vendor/Dashboard/LogoutModal";
import SideBar from "../../../../components/Vendor/Dashboard/SideBar";
import TopBar from "../../../../components/Vendor/Dashboard/TopBar";
import "./vendorHome.css";

function VendorHome() {
  const [style, setStyle] = useState(
    "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
  );

  const [activeUserCount, setActiveUserCount] = useState(0);  // Active user count

  const [events, setEvents] = useState([]);

  // Fetch events data from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/event/events");
        const data = await response.json();
        setEvents(data); // Set the fetched events to state
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Real-time WebSocket setup for active user count updates
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000"); // WebSocket connection

    // Handle incoming messages from WebSocket server
    ws.onmessage = (event) => {
      const newUserCountData = JSON.parse(event.data);
      console.log(newUserCountData)
      if (newUserCountData && newUserCountData.userCount) {
        setActiveUserCount(newUserCountData.userCount);  // Update active user count
      }
    };

    // Clean up WebSocket connection when component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div id="page-top">
      <div id="wrapper">
        <SideBar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <TopBar />
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
              </div>

              {/* Real-time Active Users Section */}
              <div className="row">
                <div className="col-lg-12 mb-4">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Active Users Purchasing Tickets
                      </h6>
                    </div>
                    <div className="card-body">
                      <h3>{activeUserCount} Active Users</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Events Data */}
              <div className="row">
                {events.map((event) => (
                  <div className="col-lg-3 col-md-6 mb-4" key={event.id}>
                    <div className="card shadow h-100 py-2">
                      <div className="card-body">
                        <h5 className="card-title">{event.name}</h5>
                        <p className="card-text">Tickets Sold: {event.ticketsSold}</p>
                        <p className="card-text">Tickets Available: {event.ticketsAvailable}</p>
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

      <LogoutModal />
    </div>
  );
}

export default VendorHome;
