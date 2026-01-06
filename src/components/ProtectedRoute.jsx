import { Navigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const ProtectedRoute = ({ children }) => {
  const { user, isAdmin } = useApp()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute

