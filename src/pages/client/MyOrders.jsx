import { useEffect, useState } from 'react'
import { useApp } from '../../context/AppContext'
import { api } from '../../services/api'
import './MyOrders.css'

const MyOrders = () => {
  const { user, orders } = useApp()
  const [myOrders, setMyOrders] = useState([])

  useEffect(() => {
    const loadOrders = async () => {
      if (user?.email) {
        try {
          // First try to get from API
          try {
            const apiOrders = await api.getUserOrders(user.email)
            setMyOrders(apiOrders)
          } catch (apiError) {
            // If API fails, filter orders from context (includes local orders)
            console.warn('API failed, using local orders:', apiError)
            const filteredOrders = orders.filter(order => 
              order.customerEmail === user.email
            )
            setMyOrders(filteredOrders)
          }
        } catch (error) {
          console.error('Error loading orders:', error)
          // Fallback to context orders
          const filteredOrders = orders.filter(order => 
            order.customerEmail === user.email
          )
          setMyOrders(filteredOrders)
        }
      } else {
        // If no user, clear orders
        setMyOrders([])
      }
    }
    loadOrders()
    
    // Also listen to orders changes in context
    if (user?.email) {
      const filteredOrders = orders.filter(order => 
        order.customerEmail === user.email
      )
      setMyOrders(filteredOrders)
    }
  }, [user, orders])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#ff9800'
      case 'Confirmed':
        return '#2196f3'
      case 'Completed':
        return '#4caf50'
      case 'Cancelled':
        return '#f44336'
      default:
        return '#666'
    }
  }

  if (!user) {
    return (
      <div className="my-orders">
        <div className="container">
          <div className="login-prompt">
            <h2>Please Login to View Your Orders</h2>
            <p>You need to be logged in to see your booking history.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="my-orders">
      <div className="orders-hero">
        <h1>My Booking</h1>
        <p>Track your bookings and travel plans</p>
      </div>
      <div className="container">
        {myOrders.length === 0 ? (
          <div className="no-orders">
            <div className="no-orders-icon">📦</div>
            <h2>No Booking Yet</h2>
            <p>You haven't placed any Booking yet. Start exploring our packages!</p>
          </div>
        ) : (
          <div className="orders-list">
            {myOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div>
                    <h3>{order.packageName}</h3>
                    <p className="order-destination">{order.destination}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                    <span 
                      className="order-status"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </span>
                    {order.isLocal && (
                      <span style={{ fontSize: '0.75rem', color: '#666', fontStyle: 'italic' }}>
                        {/* (Saved Locally) */}
                      </span>
                    )}
                  </div>
                </div>
                <div className="order-details">
                  <div className="order-detail-item">
                    <span className="detail-label">Booking ID:</span>
                    <span className="detail-value">#{order.id}</span>
                  </div>
                  <div className="order-detail-item">
                    <span className="detail-label">Booking Date:</span>
                    <span className="detail-value">
                      {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <div className="order-detail-item">
                    <span className="detail-label">Travel Date:</span>
                    <span className="detail-value">
                      {order.travelDate ? new Date(order.travelDate).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <div className="order-detail-item">
                    <span className="detail-label">Travelers:</span>
                    <span className="detail-value">{order.numberOfTravelers || 1}</span>
                  </div>
                  <div className="order-detail-item">
                    <span className="detail-label">Price per person:</span>
                    <span className="detail-value price">${order.price}</span>
                  </div>
                  <div className="order-detail-item">
                    <span className="detail-label">Total Amount:</span>
                    <span className="detail-value price">${order.totalAmount || order.price}</span>
                  </div>
                  <div className="order-detail-item">
                    <span className="detail-label">Contact:</span>
                    <span className="detail-value">{order.customerPhone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders

