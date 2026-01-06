import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import ClientLayout from './layouts/ClientLayout'
import AdminLayout from './layouts/AdminLayout'
import Home from './pages/client/Home'
import Destinations from './pages/client/Destinations'
import Packages from './pages/client/Packages'
import MyOrders from './pages/client/MyOrders'
import AboutUs from './pages/client/AboutUs'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminPackages from './pages/admin/AdminPackages'
import AdminOrders from './pages/admin/AdminOrders'
import AdminCustomers from './pages/admin/AdminCustomers'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/home" element={<ClientLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/destinations" element={<ClientLayout />}>
            <Route index element={<Destinations />} />
          </Route>
          <Route path="/packages" element={<ClientLayout />}>
            <Route index element={<Packages />} />
          </Route>
          <Route path="/my-orders" element={<ClientLayout />}>
            <Route index element={<MyOrders />} />
          </Route>
          <Route path="/about-us" element={<ClientLayout />}>
            <Route index element={<AboutUs />} />
          </Route>

          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/admin/packages" replace />} />
            <Route path="packages" element={<AdminPackages />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App

