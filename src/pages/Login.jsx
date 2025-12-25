import { Button, Card } from 'antd'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const { user, login } = useAuth()
  const navigate = useNavigate()

  // Đã login thì không cho vào lại trang login
  if (user) {
    return <Navigate to="/courses" replace />
  }

  const handleLogin = () => {
    login({ username: 'admin' }) // demo user
    navigate('/courses')
  }

  return (
    <Card title="Login" style={{ maxWidth: 360, margin: '100px auto' }}>
      <Button type="primary" block onClick={handleLogin}>
        Login
      </Button>
    </Card>
  )
}

export default Login
