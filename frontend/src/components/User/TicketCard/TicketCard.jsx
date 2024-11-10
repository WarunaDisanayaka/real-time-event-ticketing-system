import React from 'react';
import { Card, Button } from 'antd';
const { Meta } = Card;

const TicketCard = () => {
    return (
        <Card
            hoverable
            style={{
                width: 240,
            }}
            cover={<img alt="event" src="https://assets.mytickets.lk/images/events/ABBA%20-%20Arrival%20from%20Sweden/My-Tickets-web-1729217132982.jpg" />}
        >
            <Meta title="ABBA - Arrival from Sweden" />

            {/* Additional Details */}
            <div style={styles.ticketDetails}>
                <p><strong>Date:</strong> 2024-11-20</p>
                <p><strong>Location:</strong> Colombo, Sri Lanka</p>
                <p><strong>Price:</strong> $50</p>

                {/* Buy Button */}
                <Button type="primary" style={styles.buyButton}>
                    Buy Ticket
                </Button>
            </div>
        </Card>
    );
};

const styles = {
    ticketDetails: {
        marginTop: '10px',
        fontSize: '14px',
    },
    buyButton: {
        marginTop: '10px',
        width: '100%',
    },
};

export default TicketCard;
