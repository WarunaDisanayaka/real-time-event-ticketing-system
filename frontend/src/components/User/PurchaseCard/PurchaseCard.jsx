import React, { useEffect, useState } from "react";
import axios from "axios";
import './purchaseCard.css';

const PurchaseCard = () => {
    const [purchaseDetails, setPurchaseDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const customerId = localStorage.getItem("id");

        if (!customerId) {
            setError("Customer ID not found in local storage.");
            setLoading(false);
            return;
        }

        const fetchPurchases = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/event/customers/${customerId}/purchases`
                );
                setPurchaseDetails(response.data);
            } catch (err) {
                setError("Failed to fetch purchase details.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchases();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!purchaseDetails || purchaseDetails.length === 0) {
        return <div>No purchases found.</div>;
    }

    return (
        <div className="list-container">
            {purchaseDetails.map((purchase, index) => (
                <div key={index} className="ticket-card">
                    {/* Ticket Header */}
                    <div className="ticket-header">
                        <h2 className="event-name">{purchase.eventName}</h2>
                    </div>

                    {/* Ticket Body */}
                    <div className="ticket-body">
                        <div className="ticket-details">
                            <p>
                                <strong>Event Date:</strong>{" "}
                                {new Date(purchase.eventDate).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>Tickets:</strong> {purchase.ticketsPurchased}
                            </p>
                        </div>
                        <div className="ticket-price">
                            <p>
                                <strong>Total:</strong> ${purchase.totalPrice}
                            </p>
                            <p>
                                <strong>Purchased:</strong>{" "}
                                {new Date(purchase.purchaseTime).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Ticket Footer */}
                    <div className="ticket-footer">
                        <p className="purchase-id">Purchase ID: #{index + 1}</p>
                        <p className="thank-you">Thank you for your purchase!</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PurchaseCard;
