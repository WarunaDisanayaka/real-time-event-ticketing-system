import React, { useEffect, useState } from "react";
import Footer from "../../../components/User/Footer/Footer";
import HeroSection from "../../../components/User/HeroSection/HeroSection";
import Navigation from "../../../components/User/Navigation/Navigation";
import TicketCard from "../../../components/User/TicketCard/TicketCard";

const Home = () => {
    const [events, setEvents] = useState([]);

    // Fetch events data from API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/event/events");
                const data = await response.json();
                console.log("Fetched events:", data); // Debug log
                setEvents(data); // Set the fetched events to state
            } catch (error) {
                console.error("Failed to fetch events:", error);
            }
        };

        fetchEvents();
    }, []);

    // Establish WebSocket connection for real-time updates
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3000"); // Replace with your WebSocket server URL

        ws.onopen = () => {
            console.log("WebSocket connected");
        };

        ws.onmessage = (message) => {
            try {
                const update = JSON.parse(message.data);
                // console.log("WebSocket message received:", update); // Debug log

                // Update the specific event's ticket count in the state
                setEvents((prevEvents) => {
                    const updatedEvents = prevEvents.map((event) =>
                        event.id === Number(update.eventId) // Ensure IDs match correctly
                            ? { ...event, ticketsAvailable: update.ticketsAvailable }
                            : event
                    );
                    // console.log("Updated events state:", updatedEvents); // Debug log
                    return updatedEvents;
                });
            } catch (error) {
                console.error("Error processing WebSocket message:", error);
            }
        };

        ws.onclose = () => {
            console.log("WebSocket disconnected");
        };

        return () => {
            ws.close(); // Clean up WebSocket on component unmount
        };
    }, []);

    return (
        <div style={styles.pageContainer}>
            <Navigation />
            <div style={styles.contentWrap}>
                <HeroSection />
            </div>
            <div style={styles.ticketCardContainer}>
                {/* Render TicketCard for each event */}
                {events.map((event) => (
                    <TicketCard key={event.id} event={event} />
                ))}
            </div>
            <Footer />
        </div>
    );
};

const styles = {
    pageContainer: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
    },
    contentWrap: {
        flex: 1,
    },
    ticketCardContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "20px",
        marginTop: "20px",
        padding: "0 20px",
        justifyItems: "center",
    },
};

export default Home;
