const API_BASE_URL = 'http://localhost:5000/api'

export const api = {
  // Packages
  getPackages: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/packages`)
      if (!response.ok) {
        throw new Error('Failed to fetch packages')
      }
      return response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  addPackage: async (packageData) => {
    const response = await fetch(`${API_BASE_URL}/packages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(packageData)
    })
    return response.json()
  },

  updatePackage: async (id, packageData) => {
    const response = await fetch(`${API_BASE_URL}/packages/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(packageData)
    })
    return response.json()
  },

  deletePackage: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/packages/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to delete package' }))
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }
      return response.json()
    } catch (error) {
      console.error('API Error deleting package:', error)
      throw error
    }
  },

  // Orders
  getOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/orders`)
    return response.json()
  },

  getUserOrders: async (email) => {
    const response = await fetch(`${API_BASE_URL}/orders/user/${email}`)
    return response.json()
  },

  placeOrder: async (orderData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to place order' }))
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }
      return response.json()
    } catch (error) {
      console.error('API Error placing order:', error)
      throw error
    }
  },

  updateOrderStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    return response.json()
  },

  // Customers
  getCustomers: async () => {
    const response = await fetch(`${API_BASE_URL}/customers`)
    return response.json()
  },

  registerCustomer: async (customerData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData)
      })
      if (!response.ok) {
        throw new Error('Failed to register customer')
      }
      return response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }
}

