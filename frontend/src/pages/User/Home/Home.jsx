import React from 'react';
import Footer from '../../../components/User/Footer/Footer';
import HeroSection from '../../../components/User/HeroSection/HeroSection';
import Navigation from '../../../components/User/Navigation/Navigation';

const Home = () => {
    return (
        <div style={styles.pageContainer}>
            <Navigation />
            <div style={styles.contentWrap}>
                <HeroSection />
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
};

export default Home;
