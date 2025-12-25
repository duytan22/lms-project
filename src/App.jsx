import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'
import { Layout, Button } from 'antd'
import Login from './pages/Login'
import CourseList from './pages/CourseList'
import AddCourse from './pages/AddCourse'
import EditCourse from './pages/EditCourse'
import ProtectedRoute from './routes/ProtectedRoute'
import { useAuth } from './context/AuthContext'

const { Header, Content } = Layout

const App = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#fff', fontWeight: 700 }}>LMS</div>

          {user ? (
            <Button
              danger
              onClick={() => {
                logout()
                navigate('/login')
              }}
            >
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button type="primary">Login</Button>
            </Link>
          )}
        </div>
      </Header>

      <Content style={{ padding: 24 }}>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <CourseList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/courses/add"
            element={
              <ProtectedRoute>
                <AddCourse />
              </ProtectedRoute>
            }
          />

          <Route
            path="/courses/edit/:id"
            element={
              <ProtectedRoute>
                <EditCourse />
              </ProtectedRoute>
            }
          />

          {/* Default route */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navigate to="/courses" replace />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Content>
    </Layout>
  )
}

export default App
