import { useState } from "react"
import { Button, Card, Input, message } from "antd"
import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Login = () => {
  const { user, login } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  if (user) {
    return <Navigate to="/courses" replace />
  }

  const handleLogin = () => {
  if (!username) {
    message.error("Username is required")
    return
  }

  if (!password || password.length < 6) {
    message.error("Password must be at least 6 characters")
    return
  }

  login({ username })
  navigate("/courses")
}


  return (
    <Card title="Login" style={{ maxWidth: 360, margin: "100px auto" }}>
      <Input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ marginBottom: 12 }}
      />

      <Input.Password
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <Button type="primary" block onClick={handleLogin}>
        Login
      </Button>
    </Card>
  )
}

export default Login
