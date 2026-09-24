
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Admin() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    // Admin login details
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminLoggedIn', 'true')
      navigate('/admin-dashboard')
    } else {
      setError('❌ Invalid username or password')
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">

        <div className="admin-icon">🔐</div>

        <h1>Admin Login</h1>
        <p>Login to manage HastaShopEasy</p>

        <form onSubmit={handleLogin}>

          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div className="admin-error">
              {error}
            </div>
          )}

          <button type="submit" className="admin-login-btn">
            🔑 Login
          </button>

        </form>

        <button
          className="admin-back-btn"
          onClick={() => navigate('/')}
        >
          ← Back to Website
        </button>

      </div>
    </div>
  )
}

export default Admin

