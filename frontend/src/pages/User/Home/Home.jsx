import React from 'react';
import Footer from '../../../components/User/Footer/Footer';
import HeroSection from '../../../components/User/HeroSection/HeroSection';
import Navigation from '../../../components/User/Navigation/Navigation';
import TicketCard from '../../../components/User/TicketCard/TicketCard';

const Home = () => {
    return (
        <div style={styles.pageContainer}>
            <Navigation />
            <div style={styles.contentWrap}>
                <HeroSection />
            </div>
            <div style={styles.ticketCardContainer}>
                <TicketCard />
              
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

export default Home;
