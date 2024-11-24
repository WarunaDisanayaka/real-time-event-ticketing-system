import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

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

const onFinish = (values) => {
    console.log(values);
};

const VendorSignUpForm = () => (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {/* Form Heading */}
        <h2>Register as Vendor</h2>
        <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
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
                name={['user', 'password']}
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
                name={['user', 'confirmPassword']}
                label="Confirm Password"
                dependencies={['user', 'password']}
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('user.password') === value) {
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

            {/* Submit Button - Aligned to the right */}
            <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                    Submit
                </Button>
            </Form.Item>
        </Form>

        {/* Login link */}
        <Typography.Text>
            Already have an account? <Link to="/login">Login here</Link>
        </Typography.Text>
    </div>
);

export default VendorSignUpForm;
