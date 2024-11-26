import React from 'react';
import Footer from '../../../components/User/Footer/Footer';
import Navigation from '../../../components/User/Navigation/Navigation';
import PurchaseCard from '../../../components/User/PurchaseCard/PurchaseCard';
import PurchaseHeader from '../../../components/User/PurchaseHeader/PurchaseHeader';

const PurchaseHistory = () => {
    return (
        <div style={styles.pageContainer}>
            <Navigation />
            <div style={styles.contentWrap}>
                <PurchaseHeader />
            </div>
            <div style={styles.ticketCardContainer}>
                <PurchaseCard />
            </div>

            <Footer />
        </div>
    );
};

const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    contentWrap: {
        flex: 1, // This makes the main content area expand to fill space
    },
    ticketCardContainer: {
        display: 'flex',
        flexDirection: 'row', // Stack TicketCards vertically
        gap: '20px', // Space between each TicketCard
        marginTop: '20px',
        justifyContent: 'center', // Center TicketCard horizontally

    },
};

export default PurchaseHistory;
