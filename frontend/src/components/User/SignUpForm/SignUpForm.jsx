import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Typography, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { useUser } from '../../../ContextAPI/UserContext';  // Import the custom hook

// Layout configuration
const layout = {
    labelCol: {
        span: 24,  // Set label to take full width
    },
    wrapperCol: {
        span: 24,  // Set wrapper to take full width
    },
};

// Validation messages configuration
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
    },
};

const SignUpForm = () => {
    const [form] = Form.useForm();
    const { registerUser, loading, error, message: apiMessage } = useUser();
    const [responseMessage, setResponseMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);  // Track if the form is being submitted
    const navigate = useNavigate();

    // Effect to handle response state and prevent premature form reset
    useEffect(() => {
        if (apiMessage) {
            setResponseMessage(apiMessage);  // Set success message after API call
            form.resetFields();  // Clear the form fields after a successful response
            navigate('/login');  // Redirect to login page after successful registration
        } else if (error) {
            setResponseMessage(error);  // Set error message if there's an error
        }
    }, [apiMessage, error, form, navigate]);

    // Async onFinish to handle the form submission and API response
    const onFinish = async (values) => {
        const { name, email, phone, password, confirmPassword } = values.user;
        const userData = {
            name,
            email,
            password,
            phone, // Add phone if required by the API
            role: 'user', // Assuming the role is always 'vendor'
        };

        setIsSubmitting(true);  // Set submitting state to true

        try {
            // Call the registerUser function from context (ensure it's async)
            await registerUser(userData);  // Await API call to complete

            // No need to do anything else since useEffect handles response message updates
        } catch (err) {
            // Handle any fallback errors
            setResponseMessage('Something went wrong. Please try again!');
        } finally {
            setIsSubmitting(false);  // Reset submitting state
        }
    };

    return (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            {/* Form Heading */}
            <h2>Register</h2>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                form={form}
                style={{
                    maxWidth: 600,
                    width: '100%',
                }}
                validateMessages={validateMessages}
                labelAlign="top" // Set the label alignment to top
            >
                {/* Name Input */}
                <Form.Item
                    name={['user', 'name']}
                    label="Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder="Enter your full name" />
                </Form.Item>

                {/* Email Input */}
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

                {/* Phone Number Input */}
                <Form.Item
                    name={['user', 'phone']}
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                        {
                            pattern: /^[0-9]{10}$/, // Simple pattern for 10-digit phone number
                            message: 'Please enter a valid phone number!',
                        },
                    ]}
                >
                    <Input placeholder="Enter your phone number" />
                </Form.Item>

                {/* Password Input */}
                <Form.Item
                    name={['user', 'password']}  // Ensuring it's correct path for password
                    label="Password"
                    rules={[
                        {
                            required: true,
                            min: 6,
                            message: 'Password must be at least 6 characters!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>

                {/* Confirm Password Input */}
                <Form.Item
                    name={['user', 'confirmPassword']}  // Ensuring it's correct path for confirm password
                    label="Confirm Password"
                    dependencies={['user', 'password']} // Make sure it watches the password field
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                const password = getFieldValue(['user', 'password']);  // Get password value

                                if (!value || password === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords do not match!'));
                            },
                        }),
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Confirm your password" />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                    <Button type="primary" htmlType="submit" style={{ float: 'right' }} loading={loading || isSubmitting}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>

            {/* Show API response message below the form */}
            {responseMessage && (
                <div style={{ marginTop: '20px' }}>
                    <Typography.Text type={error ? 'danger' : 'success'}>
                        {responseMessage}
                    </Typography.Text>
                </div>
            )}

            {/* Login link */}
            <Typography.Text>
                Already have an account? <Link to="/login">Login here</Link>
            </Typography.Text>
        </div>
    );
};

export default SignUpForm;
