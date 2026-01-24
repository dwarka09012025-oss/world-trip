import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs-extra'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 5000
const DB_PATH = path.join(__dirname, 'data', 'worldtrip.db')
const OLD_DB_PATH = path.join(__dirname, 'data', 'database.json')

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Initialize SQLite database
const initDatabase = () => {
  const dataDir = path.dirname(DB_PATH)
  fs.ensureDirSync(dataDir)

  const db = new Database(DB_PATH)

  // Enable foreign keys
  db.pragma('foreign_keys = ON')

  // Create packages table
  db.exec(`
    CREATE TABLE IF NOT EXISTS packages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      destination TEXT NOT NULL,
      duration TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT,
      description TEXT,
      included TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Create customers table
  db.exec(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      registered_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Create orders table
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      package_id INTEGER,
      package_name TEXT NOT NULL,
      destination TEXT NOT NULL,
      price REAL NOT NULL,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT,
      travel_date TEXT,
      number_of_travelers INTEGER DEFAULT 1,
      special_requests TEXT,
      address TEXT,
      city TEXT,
      country TEXT,
      passport_number TEXT,
      total_amount REAL NOT NULL,
      status TEXT DEFAULT 'Pending',
      order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (package_id) REFERENCES packages(id)
    )
  `)

  // Create indexes for better performance
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
    CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
    CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
  `)

  // Check if we need to migrate from old JSON database
  if (fs.pathExistsSync(OLD_DB_PATH)) {
    try {
      const oldData = fs.readJSONSync(OLD_DB_PATH)
      migrateFromJSON(db, oldData)
      console.log('✅ Migrated data from JSON to SQLite database')
    } catch (error) {
      console.warn('⚠️  Could not migrate from JSON database:', error.message)
    }
  } else {
    // Insert default packages if database is empty
    const packageCount = db.prepare('SELECT COUNT(*) as count FROM packages').get()
    if (packageCount.count === 0) {
      insertDefaultPackages(db)
    }
  }

  return db
}

// Migrate data from JSON to SQLite
const migrateFromJSON = (db, oldData) => {
  const insertPackage = db.prepare(`
    INSERT INTO packages (id, name, destination, duration, price, image, description, included)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const insertCustomer = db.prepare(`
    INSERT OR IGNORE INTO customers (id, name, email, registered_at)
    VALUES (?, ?, ?, ?)
  `)

  const insertOrder = db.prepare(`
    INSERT INTO orders (
      id, package_id, package_name, destination, price, customer_name, customer_email,
      customer_phone, travel_date, number_of_travelers, special_requests, address,
      city, country, passport_number, total_amount, status, order_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const transaction = db.transaction(() => {
    // Migrate packages
    if (oldData.packages && oldData.packages.length > 0) {
      for (const pkg of oldData.packages) {
        try {
          insertPackage.run(
            pkg.id,
            pkg.name,
            pkg.destination,
            pkg.duration,
            pkg.price,
            pkg.image || null,
            pkg.description || null,
            JSON.stringify(pkg.included || [])
          )
        } catch (error) {
          console.warn(`Skipping package ${pkg.id}:`, error.message)
        }
      }
    }

    // Migrate customers
    if (oldData.customers && oldData.customers.length > 0) {
      for (const customer of oldData.customers) {
        try {
          insertCustomer.run(
            customer.id,
            customer.name,
            customer.email,
            customer.registeredAt || new Date().toISOString()
          )
        } catch (error) {
          console.warn(`Skipping customer ${customer.id}:`, error.message)
        }
      }
    }

    // Migrate orders
    if (oldData.orders && oldData.orders.length > 0) {
      for (const order of oldData.orders) {
        try {
          insertOrder.run(
            order.id,
            order.packageId || null,
            order.packageName,
            order.destination,
            order.price,
            order.customerName,
            order.customerEmail,
            order.customerPhone || null,
            order.travelDate || null,
            order.numberOfTravelers || 1,
            order.specialRequests || null,
            order.address || null,
            order.city || null,
            order.country || null,
            order.passportNumber || null,
            order.totalAmount || order.price,
            order.status || 'Pending',
            order.orderDate || new Date().toISOString()
          )
        } catch (error) {
          console.warn(`Skipping order ${order.id}:`, error.message)
        }
      }
    }
  })

  transaction()
}

// Insert default packages
const insertDefaultPackages = (db) => {
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

  const insert = db.prepare(`
    INSERT INTO packages (id, name, destination, duration, price, image, description, included)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const transaction = db.transaction(() => {
    for (const pkg of defaultPackages) {
      insert.run(
        pkg.id,
        pkg.name,
        pkg.destination,
        pkg.duration,
        pkg.price,
        pkg.image,
        pkg.description,
        JSON.stringify(pkg.included)
      )
    }
  })

  transaction()
}

// Initialize database
const db = initDatabase()

// Helper function to parse included items
const parseIncluded = (includedStr) => {
  try {
    return JSON.parse(includedStr || '[]')
  } catch {
    return []
  }
}

// Routes

// Get all packages
app.get('/api/packages', (req, res) => {
  try {
    const packages = db.prepare('SELECT * FROM packages ORDER BY id').all()
    const formattedPackages = packages.map(pkg => ({
      ...pkg,
      included: parseIncluded(pkg.included)
    }))
    res.json(formattedPackages)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single package
// app.get('/api/packages/:id', (req, res) => {
//   try {
//     const package = db.prepare('SELECT * FROM packages WHERE id = ?').get(parseInt(req.params.id))
//     if (!package) {
//       return res.status(404).json({ error: 'Package not found' })
//     }
//     res.json({
//       ...package,
//       included: parseIncluded(package.included)
//     })
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// })

// Get single package
app.get('/api/packages/:id', (req, res) => {
  try {
    // 1. Rename 'package' to 'pkg' to avoid reserved word conflict
    const pkg = db.prepare('SELECT * FROM packages WHERE id = ?').get(parseInt(req.params.id))

    if (!pkg) {
      return res.status(404).json({ error: 'Package not found' })
    }

    res.json({
      ...pkg,
      included: parseIncluded(pkg.included)
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Add new package (Admin)
app.post('/api/packages', (req, res) => {
  try {
    const { name, destination, duration, price, image, description, included } = req.body

    const result = db.prepare(`
      INSERT INTO packages (name, destination, duration, price, image, description, included, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).run(
      name,
      destination,
      duration,
      price,
      image || null,
      description || null,
      JSON.stringify(included || [])
    )

    const newPackage = db.prepare('SELECT * FROM packages WHERE id = ?').get(result.lastInsertRowid)
    res.json({
      ...newPackage,
      included: parseIncluded(newPackage.included)
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update package (Admin)
app.put('/api/packages/:id', (req, res) => {
  try {
    const { name, destination, duration, price, image, description, included } = req.body
    const id = parseInt(req.params.id)

    db.prepare(`
      UPDATE packages 
      SET name = ?, destination = ?, duration = ?, price = ?, image = ?, 
          description = ?, included = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      name,
      destination,
      duration,
      price,
      image || null,
      description || null,
      JSON.stringify(included || []),
      id
    )

    const updatedPackage = db.prepare('SELECT * FROM packages WHERE id = ?').get(id)
    if (!updatedPackage) {
      return res.status(404).json({ error: 'Package not found' })
    }

    res.json({
      ...updatedPackage,
      included: parseIncluded(updatedPackage.included)
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete package (Admin)
app.delete('/api/packages/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const result = db.prepare('DELETE FROM packages WHERE id = ?').run(id)

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Package not found' })
    }

    res.json({ message: 'Package deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all orders
app.get('/api/orders', (req, res) => {
  try {
    const orders = db.prepare('SELECT * FROM orders ORDER BY order_date DESC').all()
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get orders by user email
app.get('/api/orders/user/:email', (req, res) => {
  try {
    const orders = db.prepare('SELECT * FROM orders WHERE customer_email = ? ORDER BY order_date DESC')
      .all(req.params.email)
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Place new order
app.post('/api/orders', (req, res) => {
  try {
    const {
      packageId, packageName, destination, price, customerName, customerEmail,
      customerPhone, travelDate, numberOfTravelers, specialRequests, address,
      city, country, passportNumber, totalAmount
    } = req.body

    const result = db.prepare(`
      INSERT INTO orders (
        package_id, package_name, destination, price, customer_name, customer_email,
        customer_phone, travel_date, number_of_travelers, special_requests, address,
        city, country, passport_number, total_amount, status, order_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', CURRENT_TIMESTAMP)
    `).run(
      packageId || null,
      packageName,
      destination,
      price,
      customerName,
      customerEmail,
      customerPhone || null,
      travelDate || null,
      numberOfTravelers || 1,
      specialRequests || null,
      address || null,
      city || null,
      country || null,
      passportNumber || null,
      totalAmount || price
    )

    const newOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(result.lastInsertRowid)
    res.json(newOrder)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update order status
app.put('/api/orders/:id/status', (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { status } = req.body

    const result = db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, id)

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Order not found' })
    }

    const updatedOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(id)
    res.json(updatedOrder)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all customers
app.get('/api/customers', (req, res) => {
  try {
    const customers = db.prepare('SELECT * FROM customers ORDER BY registered_at DESC').all()
    res.json(customers)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Register new customer
app.post('/api/customers', (req, res) => {
  try {
    const { name, email } = req.body

    const result = db.prepare(`
      INSERT INTO customers (name, email, registered_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
    `).run(name, email)

    const newCustomer = db.prepare('SELECT * FROM customers WHERE id = ?').get(result.lastInsertRowid)
    res.json(newCustomer)
  } catch (error) {
    if (error.message.includes('UNIQUE constraint')) {
      return res.status(400).json({ error: 'Customer with this email already exists' })
    }
    res.status(500).json({ error: error.message })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📦 SQLite Database: ${DB_PATH}`)
  console.log(`✅ Database initialized and ready!`)
})

// Graceful shutdown
process.on('SIGINT', () => {
  db.close()
  console.log('\n📦 Database connection closed.')
  process.exit(0)
})
