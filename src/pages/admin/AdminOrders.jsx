import { useApp } from '../../context/AppContext'
import './AdminOrders.css'

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useApp()

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      // Show success message
      console.log(`Order ${orderId} status updated to ${newStatus}`)
    } catch (error) {
      console.error('Error updating order status:', error)
      alert(`Failed to update order status: ${error.message || 'Please try again.'}`)
    }
  }

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

  return (
    <div className="admin-orders">
      <div className="admin-page-header">
        <h1>Manage Orders</h1>
        <span className="orders-count">Total Orders: {orders.length}</span>
      </div>

      <div className="orders-table-container">
        {orders.length === 0 ? (
          <div className="no-orders">
            <div className="no-orders-icon">📦</div>
            <h2>No Orders Yet</h2>
            <p>Orders placed by customers will appear here.</p>
          </div>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Package</th>
                <th>Customer</th>
                <th>Travel Details</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>
                    <div className="order-package-info">
                      <strong>{order.packageName}</strong>
                      <span>📍 {order.destination}</span>
                    </div>
                  </td>
                  <td>
                    <div className="order-customer-info">
                      <strong>{order.customerName}</strong>
                      <span>📧 {order.customerEmail}</span>
                      <span>📞 {order.customerPhone}</span>
                    </div>
                  </td>
                  <td>
                    <div className="order-travel-info">
                      <span>📅 {order.travelDate ? new Date(order.travelDate).toLocaleDateString() : 'Not set'}</span>
                      <span>👥 {order.numberOfTravelers || 1} Traveler(s)</span>
                      {order.specialRequests && (
                        <span className="special-requests" title={order.specialRequests}>
                          📝 Special Requests
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="order-amount">
                      <strong>${order.totalAmount || order.price}</strong>
                      {order.numberOfTravelers > 1 && (
                        <span className="amount-detail">
                          (${order.price} × {order.numberOfTravelers})
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    {order.orderDate 
                      ? new Date(order.orderDate).toLocaleDateString() 
                      : 'N/A'}
                  </td>
                  <td>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status || 'Pending') }}
                    >
                      {order.status || 'Pending'}
                    </span>
                  </td>
                  <td>
                    <select
                      value={order.status || 'Pending'}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AdminOrders

