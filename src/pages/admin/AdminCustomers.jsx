import { useApp } from '../../context/AppContext'
import './AdminCustomers.css'

const AdminCustomers = () => {
  const { customers } = useApp()

  return (
    <div className="admin-customers">
      <div className="admin-page-header">
        <h1>Customers</h1>
        <span className="customers-count">Total Customers: {customers.length}</span>
      </div>

      <div className="customers-table-container">
        {customers.length === 0 ? (
          <div className="no-customers">
            <div className="no-customers-icon">👥</div>
            <h2>No Customers Yet</h2>
            <p>Registered customers will appear here.</p>
          </div>
        ) : (
          <table className="customers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Registration Date</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id}>
                  <td>#{customer.id}</td>
                  <td>
                    <div className="customer-name">
                      <span className="customer-avatar">{customer.name.charAt(0).toUpperCase()}</span>
                      <strong>{customer.name}</strong>
                    </div>
                  </td>
                  <td>{customer.email}</td>
                  <td>{new Date(customer.registeredAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AdminCustomers

