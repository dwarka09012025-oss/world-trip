import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import './Auth.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState('')
  const { login } = useApp()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('') // Clear previous errors
    
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    const loginResult = login(email, password, isAdmin)
    if (loginResult) {
      if (isAdmin) {
        navigate('/admin')
      } else {
        navigate('/home')
      }
    } else {
      if (isAdmin) {
        setError('Invalid admin credentials. Please check your email and password.')
      } else {
        setError('User not found. Please register first.')
      }
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo">✈️</span>
          <h1>World Trip</h1>
          <p>Welcome back! Please login to your account.</p>
        </div>
        {error && (
          <div className="auth-error" style={{
            backgroundColor: '#fee',
            color: '#c33',
            padding: '0.75rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="auth-form" autoComplete="off">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              required
              placeholder="Enter your email"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              required
              placeholder="Enter your password"
              autoComplete="new-password"
              autoCapitalize="off"
              autoCorrect="off"
            />
          </div>
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => {
                  setIsAdmin(e.target.checked)
                  setError('')
                }}
              />
              Login as Admin
            </label>
          </div>
          <button type="submit" className="auth-submit-btn">Login</button>
          <p className="auth-footer">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login

