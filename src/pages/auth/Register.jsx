import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import './Auth.css'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const { register } = useApp()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (!name || !email || !password) {
      setError('Please fill all fields')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }
    
    try {
      const success = await register(name, email, password)
      if (success) {
        navigate('/home')
      }
    } catch (error) {
      console.error('Registration error:', error)
      setError(error.message || 'Registration failed. Please try again.')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo">✈️</span>
          <h1>World Trip</h1>
          <p>Create your account to start your journey.</p>
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
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError('')
              }}
              required
              placeholder="Enter your full name"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
            />
          </div>
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
              placeholder="Create a password"
              minLength="6"
              autoComplete="new-password"
              autoCapitalize="off"
              autoCorrect="off"
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                setError('')
              }}
              required
              placeholder="Confirm your password"
              minLength="6"
              autoComplete="new-password"
              autoCapitalize="off"
              autoCorrect="off"
            />
          </div>
          <button type="submit" className="auth-submit-btn">Register</button>
          <p className="auth-footer">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register

