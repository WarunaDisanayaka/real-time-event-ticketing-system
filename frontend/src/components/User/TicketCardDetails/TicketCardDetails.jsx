import React, { useState } from 'react';
import { Card, Button, InputNumber } from 'antd';

const TicketCardDetails = () => {
    const [quantity, setQuantity] = useState(1); // State to manage quantity
    const ticketPrice = 50; // Price per ticket

    // Handle quantity change
    const handleQuantityChange = (value) => {
        setQuantity(value || 1); // Ensure the quantity is at least 1
    };

    // Handle Buy Now action
    const handleBuyNow = () => {
        alert(`You have purchased ${quantity} ticket(s) for $${ticketPrice * quantity}.`);
    };

    return (
        <div style={styles.checkoutContainer}>
            <div style={styles.imageContainer}>
                <img
                    src="https://assets.mytickets.lk/images/events/ABBA%20-%20Arrival%20from%20Sweden/My-Tickets-web-1729217132982.jpg"
                    alt="event"
                    style={styles.eventImage}
                />
            </div>
            <div style={styles.detailsContainer}>
                {/* Event Title and Description */}
                <h2 style={styles.eventTitle}>ABBA - Arrival from Sweden</h2>
                <p style={styles.eventDescription}>
                    Enjoy a spectacular live concert featuring the timeless music of ABBA, performed by
                    one of the world's most renowned tribute bands.
                </p>

                {/* Event Details */}
                <div style={styles.eventDetails}>
                    <p>
                        <strong>Date:</strong> 2024-11-20
                    </p>
                    <p>
                        <strong>Location:</strong> Colombo, Sri Lanka
                    </p>
                    <p>
                        <strong>Price per ticket:</strong> $50
                    </p>
                </div>

                {/* Quantity and Total Price */}
                <div style={styles.purchaseDetails}>
                    <div style={styles.quantityContainer}>
                        <span>Quantity:</span>
                        <InputNumber
                            min={1}
                            max={10}
                            defaultValue={1}
                            onChange={handleQuantityChange}
                            style={styles.quantityInput}
                        />
                    </div>
                    <div style={styles.totalPrice}>
                        <strong>Total Price:</strong> ${ticketPrice * quantity}
                    </div>
                </div>

                {/* Buy Now Button */}
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
        marginBottom:'10px'
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
