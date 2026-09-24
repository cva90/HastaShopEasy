import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminLoggedIn', 'true')
      navigate('/admin/orders')
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <main className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-login-icon">
          🔐
        </div>

        <span className="admin-login-label">
          ADMIN PANEL
        </span>

        <h1>Welcome Back</h1>

        <p>
          Login to manage your HastaShopEasy store.
        </p>

        <form onSubmit={handleLogin}>

          <div className="admin-login-group">
            <label>Username</label>

            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError('')
              }}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="admin-login-group">
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="admin-login-error">
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            className="admin-login-btn"
          >
            🔓 Login to Admin
          </button>

        </form>

        <div className="admin-login-hint">
          <strong>Demo Login</strong>
          <span>Username: admin</span>
          <span>Password: admin123</span>
        </div>

      </div>

    </main>
  )
}

export default AdminLogin