import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import './ClientHeader.css'

const ClientHeader = () => {
  const location = useLocation()
  const { user, logout } = useApp()

  const isActive = (path) => location.pathname === path

  return (
    <header className="client-header">
      <div className="header-container">
        <Link to="/home" className="logo">
          <span className="logo-icon">✈️</span>
          <span className="logo-text">World Trip</span>
        </Link>

        <nav className="nav-menu">
          <Link to="/home" className={`nav-link ${isActive('/home') || isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/destinations" className={`nav-link ${isActive('/destinations') ? 'active' : ''}`}>
            Destinations
          </Link>
          <Link to="/packages" className={`nav-link ${isActive('/packages') ? 'active' : ''}`}>
            Packages
          </Link>
          {user && (
            <Link to="/my-orders" className={`nav-link ${isActive('/my-orders') ? 'active' : ''}`}>
              My Booking
            </Link>
          )}
          <Link to="/about-us" className={`nav-link ${isActive('/about-us') ? 'active' : ''}`}>
            About Us
          </Link>
        </nav>

        <div className="header-actions">
          {user ? (
            <>
              <span className="user-name">Welcome, {user.name}</span>
              <button onClick={logout} className="btn-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-login">Login</Link>
              <Link to="/register" className="btn-register">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default ClientHeader

