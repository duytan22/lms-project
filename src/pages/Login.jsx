import React, { useState } from 'react'
import { Card, Form, Input, Button, Alert } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const onFinish = async (values) => {
        setError(null)
        setLoading(true)

        const res = await login(values)
        setLoading(false)

        if (res.ok) {
            navigate('/courses', { replace: true })
        } else {
            setError(res.message || 'Login failed')
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <Card title="Login" style={{ width: 400 }}>
                {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 12 }} />}

                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please input a valid email' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="password" label="Password" rules={[{ required: true, min: 6, message: 'Password min 6 characters' }]}>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            Login
                        </Button>
                    </Form.Item>

                    <div style={{ fontSize: 12 }}>
                        Demo account: <b>demo@lms.com</b> – password bất kỳ ≥ 6 ký tự
                    </div>
                </Form>
            </Card>
        </div>
    )
}
