import React from 'react';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom'; // If you're using react-router for navigation

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
    console.log('Login Success:', values);
};

const LoginForm = () => (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {/* Form Heading */}
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

            {/* Password Input */}
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

            {/* Submit Button - Aligned to the right */}
            <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                    Login
                </Button>
            </Form.Item>
        </Form>

        {/* Register link */}
        <p>
            Don't have an account? <Link to="/sign-up">Sign up here</Link>
        </p>
    </div>
);

export default LoginForm;
