import React, { useState } from "react";
import { Card, Button, InputNumber } from "antd";
import { useLocation } from "react-router-dom";

const TicketCardDetails = () => {
    const location = useLocation();
    const { event } = location.state || {};
    const [quantity, setQuantity] = useState(1);

    if (!event) {
        return <div>No event details available.</div>;
    }

    // Handle quantity change
    const handleQuantityChange = (value) => {
        setQuantity(value || 1);
    };

    // Handle Buy Now action
    const handleBuyNow = () => {
        alert(`You have purchased ${quantity} ticket(s) for $${event.price * quantity}.`);
    };

    return (
        <div style={styles.checkoutContainer}>
            <div style={styles.imageContainer}>
                <img
                    src={`http://localhost:3000/${event.image}`}
                    alt="event"
                    style={styles.eventImage}
                />
            </div>
            <div style={styles.detailsContainer}>
                <h2 style={styles.eventTitle}>{event.name}</h2>
                <p style={styles.eventDescription}>
                    {/* Optionally, add a description if your event model includes one */}
                </p>

                <div style={styles.eventDetails}>
                    <p>
                        <strong>Date:</strong> {new Date(event.startDate).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>Tickets Available:</strong> {event.ticketsAvailable}
                    </p>
                    <p>
                        <strong>Price per ticket:</strong> ${event.price}
                    </p>
                </div>

                <div style={styles.purchaseDetails}>
                    <div style={styles.quantityContainer}>
                        <span>Quantity:</span>
                        <InputNumber
                            min={1}
                            max={event.ticketsAvailable}
                            defaultValue={1}
                            onChange={handleQuantityChange}
                            style={styles.quantityInput}
                        />
                    </div>
                    <div style={styles.totalPrice}>
                        <strong>Total Price:</strong> ${event.price * quantity}
                    </div>
                </div>

                <Button
                    type="primary"
                    style={styles.buyNowButton}
                    onClick={handleBuyNow}
                >
                    Buy Now
                </Button>
            </div>
        </div>
    );
};

const styles = {
    checkoutContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: '20px',
        padding: '20px',
        border: '1px solid #e8e8e8',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: 'auto',
        marginBottom: '10px'
    },
    imageContainer: {
        flex: '1',
    },
    eventImage: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
    },
    detailsContainer: {
        flex: '2',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    eventTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    eventDescription: {
        fontSize: '14px',
        color: '#555',
        lineHeight: '1.6',
    },
    eventDetails: {
        marginTop: '10px',
        fontSize: '14px',
    },
    purchaseDetails: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    quantityContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    quantityInput: {
        width: '60px',
    },
    totalPrice: {
        fontSize: '16px',
        fontWeight: 'bold',
    },
    buyNowButton: {
        marginTop: '20px',
        width: '100%',
        backgroundColor: '#1890ff',
        color: '#fff',
        fontWeight: 'bold',
        borderRadius: '8px',
        padding: '10px 0',
    },
};

export default TicketCardDetails;
