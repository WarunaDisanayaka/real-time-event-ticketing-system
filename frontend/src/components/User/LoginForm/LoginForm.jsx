import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

// Layout configuration
const layout = {
    labelCol: {
        span: 24, // Set label to take full width
    },
    wrapperCol: {
        span: 24, // Set wrapper to take full width
    },
};

// Validation messages configuration
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
    },
};

const LoginForm = () => {
    const navigate = useNavigate(); // For navigation

    const onFinish = async (values) => {
        const { email, password } = values.user; // Extract email and password from form values
        try {
            // API request
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            // Parse the response
            const result = await response.json();
            if (response.ok) {
                message.success(result.message); // Display success message

                // Store the token in localStorage (or any preferred storage)
                localStorage.setItem('token', result.token);
                localStorage.setItem('role', result.role);
                localStorage.setItem('id', result.id);

                // Redirect based on role
                if (result.role === 'vendor') {
                    navigate('/vendor-home');
                } else if (result.role === 'user') {
                    navigate('/');
                } else {
                    message.warning('Unrecognized role.');
                }
            } else {
                // Handle error response
                message.error(result.message || 'Login failed. Please try again.');
            }
        } catch (err) {
            message.error('An error occurred. Please try again later.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2>Login</h2>
            <Form
                {...layout}
                name="login-form"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                    width: '100%',
                }}
                validateMessages={validateMessages}
                labelAlign="top" // Set the label alignment to top
            >
                <Form.Item
                    name={['user', 'email']}
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder="Enter your email address" />
                </Form.Item>

                <Form.Item
                    name={['user', 'password']}
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                    <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                        Login
                    </Button>
                </Form.Item>
            </Form>

            <p>
                Don't have an account? <a href="/sign-up">Sign up here</a>
            </p>
        </div>
    );
};

export default LoginForm;
