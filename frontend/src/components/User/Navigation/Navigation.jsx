import React, { useState, useEffect } from "react";
import { Button, Grid, Menu, Space, theme, Dropdown, Avatar } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const { useToken } = theme;
const { useBreakpoint } = Grid;

const Navigation = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const { token } = useToken();
    const screens = useBreakpoint();

    // Mock the logged-in state (use real authentication check in production)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in by checking localStorage or sessionStorage
        const user = localStorage.getItem("role");
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    const menuItems = [
        {
            label: "Events",
            key: "events",
        },
        // More menu items can be added here
    ];

    const [current, setCurrent] = useState("events");
    const onClick = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('id');
        window.location.href = '/';
    };

    const handlePurchase = () => {
        console.log("Go to Purchase page");
        navigate("/my-purchases"); // Use navigate to go to the "my-purchases" page

    };

    const profileMenu = (
        <Menu>
            <Menu.Item key="1" onClick={handlePurchase}>
                Purchase
            </Menu.Item>
            <Menu.Item key="2" onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );

    const styles = {
        container: {
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            margin: "0 auto",
            maxWidth: token.screenXL,
            padding: screens.md ? `0px ${token.paddingLG}px` : `0px ${token.padding}px`,
        },
        header: {
            backgroundColor: token.colorBgContainer,
            borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
            position: "relative",
        },
        logo: {
            display: "block",
            height: token.sizeLG,
            left: "50%",
            position: screens.md ? "static" : "absolute",
            top: "50%",
            transform: screens.md ? " " : "translate(-50%, -50%)",
        },
        menu: {
            backgroundColor: "transparent",
            borderBottom: "none",
            lineHeight: screens.sm ? "4rem" : "3.5rem",
            marginLeft: screens.md ? "0px" : `-${token.size}px`,
            width: screens.md ? "inherit" : token.sizeXXL,
        },
        menuContainer: {
            alignItems: "center",
            display: "flex",
            gap: token.size,
            width: "100%",
        },
    };

    return (
        <nav style={styles.header}>
            <div style={styles.container}>
                <div style={styles.menuContainer}>
                    <a style={styles.logo} href="/">
                        <i className="fas fa-ticket-alt" style={{ marginRight: "8px" }}></i>
                        <p style={{ display: "inline", margin: 0 }}></p>
                    </a>

                    <Menu
                        style={styles.menu}
                        mode="horizontal"
                        items={menuItems}
                        onClick={onClick}
                        selectedKeys={screens.md ? [current] : ""}
                        overflowedIndicator={<Button type="text" icon={<MenuOutlined />} />}
                    />
                </div>
                <Space>
                    {isLoggedIn ? (
                        <Dropdown overlay={profileMenu} trigger={["click"]}>
                            <Avatar
                                size="large"
                                icon={<UserOutlined />}
                                style={{ cursor: "pointer" }}
                            />
                        </Dropdown>
                    ) : (
                        <>
                            {screens.md ? <Button type="text" href="/login">Log in</Button> : ""}
                            <Button type="primary" href="/sign-up">Sign up</Button>
                        </>
                    )}
                </Space>
            </div>
        </nav>
    );
};

export default Navigation;
