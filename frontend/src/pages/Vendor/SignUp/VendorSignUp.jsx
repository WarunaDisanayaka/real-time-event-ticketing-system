import React from 'react';
import Footer from '../../../components/User/Footer/Footer';
import Navigation from '../../../components/User/Navigation/Navigation';
import VendorSignUpForm from '../../../components/Vendor/SignUpForm/VendorSignUpForm';

const VendorSignUp = () => {
    return (
        <div style={styles.pageContainer}>
            <Navigation />
            <div style={styles.contentWrap}>
                <div style={styles.formContainer}>
                    <VendorSignUpForm />
                </div>
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
    formContainer: {
        display: 'flex',
        justifyContent: 'center', // Centers the form container
        alignItems: 'center', // Centers the form vertically within the container
        flexDirection: 'column',
        padding: '20px',
    },
};

export default VendorSignUp;
