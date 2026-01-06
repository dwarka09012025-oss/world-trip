import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import './AdminHeader.css'

const AdminHeader = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useApp()

  const isActive = (path) => location.pathname === path

  const handleSignOut = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="admin-header">
      <div className="admin-header-container">
        <div className="admin-logo">
          <span className="admin-logo-icon">✈️</span>
          <span className="admin-logo-text">World Trip</span>
        </div>
        
        <nav className="admin-nav-menu">
          <Link to="/admin/packages" className={`admin-nav-link ${isActive('/admin/packages') ? 'active' : ''}`}>
            Packages
          </Link>
          <Link to="/admin/orders" className={`admin-nav-link ${isActive('/admin/orders') ? 'active' : ''}`}>
            Orders
          </Link>
          <Link to="/admin/customers" className={`admin-nav-link ${isActive('/admin/customers') ? 'active' : ''}`}>
            Customers
          </Link>
        </nav>

        <button onClick={handleSignOut} className="admin-sign-out">
          Sign Out
        </button>
      </div>
    </header>
  )
}

export default AdminHeader

