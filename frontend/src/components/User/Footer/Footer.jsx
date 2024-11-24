import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footerContainer}>
            <div style={styles.footerContent}>
                {/* About Section */}
                <div style={styles.section}>
                    <h4 style={styles.heading}>About Us</h4>
                    <p style={styles.text}>
                        We are dedicated to providing the best service and creating value for our customers.
                    </p>
                </div>

                {/* Links Section */}
                <div style={styles.section}>
                    <h4 style={styles.heading}>Quick Links</h4>
                    <ul style={styles.list}>
                        <li><a href="/about" style={styles.link}>About</a></li>
                        <li><a href="/services" style={styles.link}>Services</a></li>
                        <li><a href="/contact" style={styles.link}>Contact</a></li>
                        <li><a href="/privacy" style={styles.link}>Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div style={styles.section}>
                    <h4 style={styles.heading}>Contact Us</h4>
                    <p style={styles.text}>Email: info@example.com</p>
                    <p style={styles.text}>Phone: +1 (123) 456-7890</p>
                </div>

                {/* Social Media Section */}
                <div style={styles.section}>
                    <h4 style={styles.heading}>Follow Us</h4>
                    <div style={styles.socialIcons}>
                        <a href="https://facebook.com" style={styles.icon} aria-label="Facebook">🔗</a>
                        <a href="https://twitter.com" style={styles.icon} aria-label="Twitter">🔗</a>
                        <a href="https://instagram.com" style={styles.icon} aria-label="Instagram">🔗</a>
                        <a href="https://linkedin.com" style={styles.icon} aria-label="LinkedIn">🔗</a>
                    </div>
                </div>

                <div style={styles.section}>
                    <h4 style={styles.heading}>Become a vendor</h4>
                    <ul style={styles.list}>
                        <li><a href="/vendor-sign-up" style={styles.link}>Register </a></li>

                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div style={styles.footerBottom}>
                <p style={styles.bottomText}>© 2024 Your Company. All rights reserved.</p>
            </div>
        </footer>
    );
};

const styles = {
    footerContainer: {
        backgroundColor: '#333',
        color: '#fff',
        padding: '40px 20px',
    },
    footerContent: {
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto',
        flexWrap: 'wrap',
    },
    section: {
        flex: '1 1 200px',
        margin: '10px 20px',
    },
    heading: {
        fontSize: '18px',
        marginBottom: '10px',
        fontWeight: 'bold',
    },
    text: {
        fontSize: '14px',
        lineHeight: '1.6',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '14px',
        lineHeight: '2',
        transition: 'color 0.3s',
    },
    linkHover: {
        color: '#aaa',
    },
    socialIcons: {
        display: 'flex',
        gap: '10px',
        fontSize: '20px',
    },
    icon: {
        color: '#fff',
        textDecoration: 'none',
        transition: 'color 0.3s',
    },
    footerBottom: {
        textAlign: 'center',
        marginTop: '20px',
        borderTop: '1px solid #555',
        paddingTop: '10px',
    },
    bottomText: {
        fontSize: '14px',
    },
};

export default Footer;
