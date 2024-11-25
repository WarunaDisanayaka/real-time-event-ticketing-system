import React from "react";
import { Card, Button } from "antd";

const { Meta } = Card;

const TicketCard = ({ event }) => {
    console.log("TicketCard props:", event); // Debug log for props

    return (
        <Card
            hoverable
            style={{
                width: 240,
            }}
            cover={<img alt="event" src={`http://localhost:3000/${event.image}`} />}
        >
            <Meta title={event.name} />
            <div style={styles.ticketDetails}>
                <p>
                    <strong>Date:</strong> {new Date(event.startDate).toLocaleDateString()}
                </p>
                <p>
                    <strong>Tickets Available:</strong> {event.ticketsAvailable}
                </p>
                <p>
                    <strong>Price:</strong> ${event.price}
                </p>
                <Button
                    type="primary"
                    href="/ticket-card-details"
                    style={styles.buyButton}
                >
                    Buy Ticket
                </Button>
            </div>
        </Card>
    );
};

const styles = {
    ticketDetails: {
        marginTop: "10px",
        fontSize: "14px",
    },
    buyButton: {
        marginTop: "10px",
        width: "100%",
    },
};

export default React.memo(TicketCard); // Add memoization for better performance
