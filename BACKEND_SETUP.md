# Backend Setup Instructions

## How to Run the Backend Server

### Step 1: Navigate to Backend Folder
```bash
cd D:\react\world-trip\backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Server
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

### Step 4: Verify Server is Running
You should see:
```
🚀 Server running on http://localhost:5000
📦 Database initialized at [path]
```

## Database

The backend uses a JSON file-based database located at:
```
backend/data/database.json
```

This file is automatically created when you first run the server.

## API Endpoints

### Packages
- `GET /api/packages` - Get all packages
- `GET /api/packages/:id` - Get single package
- `POST /api/packages` - Add new package (Admin)
- `PUT /api/packages/:id` - Update package (Admin)
- `DELETE /api/packages/:id` - Delete package (Admin)

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/user/:email` - Get user's orders
- `POST /api/orders` - Place new order
- `PUT /api/orders/:id/status` - Update order status

### Customers
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Register new customer

## Running Both Frontend and Backend

### Terminal 1 - Backend:
```bash
cd D:\react\world-trip\backend
npm install
npm start
```

### Terminal 2 - Frontend:
```bash
cd D:\react\world-trip
npm install
npm run dev
```

Now you can access:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Important Notes

1. **Backend must be running** before using the frontend
2. The database file is created automatically
3. All data persists in `backend/data/database.json`
4. Orders placed from client panel will appear in admin panel
5. Registered users automatically appear in customers list

