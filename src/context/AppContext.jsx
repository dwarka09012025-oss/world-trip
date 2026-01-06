import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/api'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

// Default packages fallback
const defaultPackages = [
  {
    id: 1,
    name: 'Paris Dream',
    destination: 'Paris, France',
    duration: '7 Days',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    description: 'Experience the romance of Paris with visits to Eiffel Tower, Louvre, and charming cafes.',
    included: ['Hotel', 'Breakfast', 'City Tour', 'Museum Tickets']
  },
  {
    id: 2,
    name: 'Tokyo Adventure',
    destination: 'Tokyo, Japan',
    duration: '10 Days',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    description: 'Discover the blend of traditional and modern in Tokyo with cultural experiences.',
    included: ['Hotel', 'Breakfast', 'Temple Visits', 'Bullet Train']
  },
  {
    id: 3,
    name: 'Bali Paradise',
    destination: 'Bali, Indonesia',
    duration: '8 Days',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    description: 'Relax on beautiful beaches and explore tropical paradise in Bali.',
    included: ['Resort', 'All Meals', 'Beach Activities', 'Spa Session']
  },
  {
    id: 4,
    name: 'New York City',
    destination: 'New York, USA',
    duration: '6 Days',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    description: 'Explore the Big Apple with Broadway shows, museums, and iconic landmarks.',
    included: ['Hotel', 'Breakfast', 'Broadway Show', 'City Pass']
  },
  {
    id: 5,
    name: 'Santorini Escape',
    destination: 'Santorini, Greece',
    duration: '5 Days',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
    description: 'Enjoy stunning sunsets and white-washed buildings in this Greek island paradise.',
    included: ['Boutique Hotel', 'Breakfast', 'Wine Tasting', 'Sunset Cruise']
  },
  {
    id: 6,
    name: 'Dubai Luxury',
    destination: 'Dubai, UAE',
    duration: '7 Days',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    description: 'Experience luxury in Dubai with desert safaris and world-class shopping.',
    included: ['5-Star Hotel', 'All Meals', 'Desert Safari', 'Burj Khalifa']
  }
]

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [packages, setPackages] = useState(defaultPackages)
  const [orders, setOrders] = useState([])
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)

  // Load initial data from API
  useEffect(() => {
    const loadData = async () => {
      // Load local packages from localStorage first
      const savedPackages = localStorage.getItem('localPackages')
      const localPackages = savedPackages ? JSON.parse(savedPackages) : []
      
      // Load local customers from localStorage
      const savedCustomers = localStorage.getItem('localCustomers')
      const localCustomers = savedCustomers ? JSON.parse(savedCustomers) : []
      
      try {
        const [packagesData, ordersData, customersData] = await Promise.all([
          api.getPackages().catch(() => defaultPackages),
          api.getOrders().catch(() => []),
          api.getCustomers().catch(() => [])
        ])
        // Merge API packages with local packages
        const apiPackages = packagesData && packagesData.length > 0 ? packagesData : defaultPackages
        const mergedPackages = [...apiPackages, ...localPackages.filter(local => 
          !apiPackages.some(api => api.id === local.id)
        )]
        setPackages(mergedPackages)
        setOrders(ordersData || [])
        // Merge API customers with local customers
        const apiCustomers = customersData || []
        const mergedCustomers = [...apiCustomers, ...localCustomers.filter(local => 
          !apiCustomers.some(api => api.email === local.email)
        )]
        setCustomers(mergedCustomers)
      } catch (error) {
        console.error('Error loading data:', error)
        // Use default packages and local packages if API fails
        const mergedPackages = [...defaultPackages, ...localPackages]
        setPackages(mergedPackages)
        setOrders([])
        // Use local customers if API fails
        setCustomers(localCustomers)
      } finally {
        setLoading(false)
      }
    }
    loadData()

    // Load user from localStorage
    const savedUser = localStorage.getItem('user')
    const savedIsAdmin = localStorage.getItem('isAdmin')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    if (savedIsAdmin) {
      setIsAdmin(savedIsAdmin === 'true')
    }
  }, [])

  // Refresh orders periodically (only if backend is available)
  useEffect(() => {
    const refreshOrders = async () => {
      try {
        const ordersData = await api.getOrders()
        // Merge with local orders
        const savedOrders = localStorage.getItem('localOrders')
        const localOrders = savedOrders ? JSON.parse(savedOrders) : []
        const mergedOrders = [...ordersData, ...localOrders.filter(local => 
          !ordersData.some(api => api.id === local.id)
        )]
        setOrders(mergedOrders)
      } catch (error) {
        // If API fails, just use local orders
        const savedOrders = localStorage.getItem('localOrders')
        const localOrders = savedOrders ? JSON.parse(savedOrders) : []
        setOrders(localOrders)
      }
    }
    const interval = setInterval(refreshOrders, 3000) // Refresh every 3 seconds
    return () => clearInterval(interval)
  }, [])

  // Save orders to localStorage whenever orders change
  useEffect(() => {
    // Only save local orders (those without orderDate from API or marked as local)
    const localOrders = orders.filter(order => {
      // Check if it's a local order (no orderDate means it was created locally, or has a local flag)
      return !order.orderDate || order.isLocal
    })
    if (localOrders.length > 0) {
      localStorage.setItem('localOrders', JSON.stringify(localOrders))
    } else {
      localStorage.removeItem('localOrders')
    }
  }, [orders])

  // Save customers to localStorage whenever customers change
  useEffect(() => {
    // Only save local customers (those marked as local or not from API)
    const localCustomers = customers.filter(customer => {
      // Check if it's a local customer (has isLocal flag or no registeredAt from API)
      return customer.isLocal || !customer.registeredAt || customer.registeredAt.includes('T')
    })
    if (localCustomers.length > 0) {
      localStorage.setItem('localCustomers', JSON.stringify(localCustomers))
    } else {
      localStorage.removeItem('localCustomers')
    }
  }, [customers])

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
    localStorage.setItem('isAdmin', isAdmin.toString())
  }, [user, isAdmin])

  const login = (email, password, admin = false) => {
    // Admin login requires specific credentials
    if (admin) {
      // Check for admin credentials
      const adminEmail = 'meet@gmail.com'
      const adminPassword = '123456'
      
      if (email.toLowerCase() === adminEmail.toLowerCase() && password === adminPassword) {
        const userData = { email: adminEmail, name: 'Admin' }
        setUser(userData)
        setIsAdmin(true)
        return true
      } else {
        // Invalid admin credentials
        return false
      }
    }

    // For regular users, check if they exist in customers
    // Check in current customers state
    const existingCustomer = customers.find(customer => 
      customer.email.toLowerCase() === email.toLowerCase()
    )

    // Also check in localStorage for local customers
    if (!existingCustomer) {
      const savedCustomers = localStorage.getItem('localCustomers')
      if (savedCustomers) {
        const localCustomers = JSON.parse(savedCustomers)
        const foundCustomer = localCustomers.find(customer => 
          customer.email.toLowerCase() === email.toLowerCase()
        )
        if (foundCustomer) {
          const userData = { email: foundCustomer.email, name: foundCustomer.name }
          setUser(userData)
          setIsAdmin(false)
          return true
        }
      }
    }

    // If customer found in state
    if (existingCustomer) {
      const userData = { email: existingCustomer.email, name: existingCustomer.name }
      setUser(userData)
      setIsAdmin(false)
      return true
    }

    // User not found
    return false
  }

  const register = async (name, email, password) => {
    try {
      // Check if user already exists in current customers state
      const existingCustomer = customers.find(customer => 
        customer.email.toLowerCase() === email.toLowerCase()
      )
      
      // Also check localStorage for local customers
      const savedCustomers = localStorage.getItem('localCustomers')
      if (savedCustomers) {
        try {
          const localCustomers = JSON.parse(savedCustomers)
          const foundCustomer = localCustomers.find(customer => 
            customer.email.toLowerCase() === email.toLowerCase()
          )
          if (foundCustomer) {
            throw new Error('User already exists with this email')
          }
        } catch (parseError) {
          console.error('Error parsing local customers:', parseError)
        }
      }

      if (existingCustomer) {
        throw new Error('User already exists with this email')
      }

      // Try to register via API
      let newCustomer
      try {
        newCustomer = await api.registerCustomer({ name, email })
        setCustomers([...customers, newCustomer])
      } catch (apiError) {
        // If API fails, still allow registration locally
        console.warn('API registration failed, using local registration:', apiError)
        newCustomer = {
          id: Date.now(),
          name,
          email,
          registeredAt: new Date().toISOString(),
          isLocal: true
        }
        setCustomers([...customers, newCustomer])
      }
      
      // Set user and allow login
      const userData = { email, name }
      setUser(userData)
      setIsAdmin(false)
      return true
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setIsAdmin(false)
  }

  const addPackage = async (packageData) => {
    try {
      try {
        const newPackage = await api.addPackage(packageData)
        setPackages([...packages, newPackage])
        return newPackage
      } catch (apiError) {
        // If API fails, save locally
        console.warn('API add package failed, saving locally:', apiError)
        const localPackage = {
          id: Date.now(),
          ...packageData
        }
        setPackages([...packages, localPackage])
        
        // Save to localStorage
        const savedPackages = localStorage.getItem('localPackages')
        const existingPackages = savedPackages ? JSON.parse(savedPackages) : []
        localStorage.setItem('localPackages', JSON.stringify([...existingPackages, localPackage]))
        
        return localPackage
      }
    } catch (error) {
      console.error('Error adding package:', error)
      throw error
    }
  }

  const updatePackage = async (id, packageData) => {
    try {
      try {
        const updatedPackage = await api.updatePackage(id, packageData)
        setPackages(packages.map(pkg => pkg.id === id ? updatedPackage : pkg))
        return updatedPackage
      } catch (apiError) {
        // If API fails, update locally
        console.warn('API update package failed, updating locally:', apiError)
        const updatedPackage = {
          id,
          ...packageData
        }
        setPackages(packages.map(pkg => pkg.id === id ? updatedPackage : pkg))
        
        // Update localStorage
        const savedPackages = localStorage.getItem('localPackages')
        const existingPackages = savedPackages ? JSON.parse(savedPackages) : []
        const updatedPackages = existingPackages.map(pkg => pkg.id === id ? updatedPackage : pkg)
        localStorage.setItem('localPackages', JSON.stringify(updatedPackages))
        
        return updatedPackage
      }
    } catch (error) {
      console.error('Error updating package:', error)
      throw error
    }
  }

  const deletePackage = async (id) => {
    try {
      try {
        // Try to delete via API
        await api.deletePackage(id)
        // Update state
        setPackages(packages.filter(pkg => pkg.id !== id))
        
        // Update localStorage - remove from local packages
        const savedPackages = localStorage.getItem('localPackages')
        if (savedPackages) {
          const existingPackages = JSON.parse(savedPackages)
          const updatedPackages = existingPackages.filter(pkg => pkg.id !== id)
          if (updatedPackages.length > 0) {
            localStorage.setItem('localPackages', JSON.stringify(updatedPackages))
          } else {
            localStorage.removeItem('localPackages')
          }
        }
      } catch (apiError) {
        // If API fails, delete locally
        console.warn('API delete package failed, deleting locally:', apiError)
        
        // Check if package exists
        const packageExists = packages.find(pkg => pkg.id === id)
        if (!packageExists) {
          throw new Error('Package not found')
        }
        
        // Update state
        setPackages(packages.filter(pkg => pkg.id !== id))
        
        // Update localStorage - remove from local packages
        const savedPackages = localStorage.getItem('localPackages')
        if (savedPackages) {
          const existingPackages = JSON.parse(savedPackages)
          const updatedPackages = existingPackages.filter(pkg => pkg.id !== id)
          if (updatedPackages.length > 0) {
            localStorage.setItem('localPackages', JSON.stringify(updatedPackages))
          } else {
            localStorage.removeItem('localPackages')
          }
        }
      }
    } catch (error) {
      console.error('Error deleting package:', error)
      throw error
    }
  }

  const placeOrder = async (packageId, packageData, customerInfo) => {
    try {
      const orderData = {
        packageId,
        packageName: packageData.name,
        destination: packageData.destination,
        price: packageData.price,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        travelDate: customerInfo.travelDate,
        numberOfTravelers: customerInfo.numberOfTravelers,
        specialRequests: customerInfo.specialRequests || '',
        address: customerInfo.address || '',
        city: customerInfo.city || '',
        country: customerInfo.country || '',
        passportNumber: customerInfo.passportNumber || '',
        totalAmount: packageData.price * (customerInfo.numberOfTravelers || 1)
      }
      
      try {
        const order = await api.placeOrder(orderData)
        setOrders([...orders, order])
        return order
      } catch (apiError) {
        // If API fails, create order locally and save to localStorage
        console.warn('API order placement failed, creating local order:', apiError)
        const localOrder = {
          id: Date.now(),
          ...orderData,
          status: 'Pending',
          orderDate: new Date().toISOString(),
          isLocal: true // Mark as local order
        }
        const updatedOrders = [...orders, localOrder]
        setOrders(updatedOrders)
        
        // Save to localStorage immediately
        const savedOrders = localStorage.getItem('localOrders')
        const existingLocalOrders = savedOrders ? JSON.parse(savedOrders) : []
        localStorage.setItem('localOrders', JSON.stringify([...existingLocalOrders, localOrder]))
        
        return localOrder
      }
    } catch (error) {
      console.error('Error placing order:', error)
      throw error
    }
  }

  const updateOrderStatus = async (orderId, status) => {
    try {
      try {
        // Try to update via API first
        const updatedOrder = await api.updateOrderStatus(orderId, status)
        setOrders(orders.map(order => 
          order.id === orderId || order.id === parseInt(orderId) ? updatedOrder : order
        ))
        return updatedOrder
      } catch (apiError) {
        // If API fails, update locally
        console.warn('API update order status failed, updating locally:', apiError)
        
        // Find the order (handle both string and number IDs)
        const orderToUpdate = orders.find(order => 
          order.id === orderId || order.id === parseInt(orderId) || String(order.id) === String(orderId)
        )
        if (!orderToUpdate) {
          throw new Error(`Order not found with ID: ${orderId}`)
        }
        
        // Update the order locally
        const updatedOrder = {
          ...orderToUpdate,
          status: status
        }
        
        // Update state
        const updatedOrders = orders.map(order => 
          (order.id === orderId || order.id === parseInt(orderId) || String(order.id) === String(orderId))
            ? updatedOrder 
            : order
        )
        setOrders(updatedOrders)
        
        // Update localStorage for local orders
        const savedOrders = localStorage.getItem('localOrders')
        if (savedOrders) {
          try {
            const localOrders = JSON.parse(savedOrders)
            const updatedLocalOrders = localOrders.map(order => 
              (order.id === orderId || order.id === parseInt(orderId) || String(order.id) === String(orderId))
                ? updatedOrder 
                : order
            )
            localStorage.setItem('localOrders', JSON.stringify(updatedLocalOrders))
          } catch (parseError) {
            console.error('Error parsing local orders:', parseError)
            // If parsing fails, just save the updated order
            if (orderToUpdate.isLocal) {
              localStorage.setItem('localOrders', JSON.stringify([updatedOrder]))
            }
          }
        } else if (orderToUpdate.isLocal) {
          // If it's a local order but not in localStorage yet, add it
          localStorage.setItem('localOrders', JSON.stringify([updatedOrder]))
        }
        
        return updatedOrder
      }
    } catch (error) {
      console.error('Error updating order status:', error)
      throw error
    }
  }

  const value = {
    user,
    isAdmin,
    packages,
    orders,
    customers,
    loading,
    login,
    register,
    logout,
    addPackage,
    updatePackage,
    deletePackage,
    placeOrder,
    updateOrderStatus
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

