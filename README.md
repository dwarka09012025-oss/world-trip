# World Trip - Travel & Tourism Website

A professional travel and tourism website built with React, featuring separate client and admin panels.

## Features

### Client Panel
- **Home**: Beautiful landing page with featured packages
- **Destinations**: Browse amazing travel destinations
- **Packages**: View and book travel packages
- **My Orders**: Track your bookings
- **Contact Us**: Get in touch with support

### Admin Panel
- **Packages Management**: Add, edit, and delete travel packages
- **Orders Management**: View and manage customer orders
- **Customers**: View all registered customers
- **Sign Out**: Secure logout functionality

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation & Running

**IMPORTANT: You need to run both Frontend and Backend servers!**

#### Step 1: Start the Backend Server

Open **Terminal 1** (Command Prompt):

```bash
cd D:\react\world-trip\backend
npm install
npm start
```

You should see:
```
🚀 Server running on http://localhost:5000
📦 Database initialized at [path]
```

#### Step 2: Start the Frontend Server

Open **Terminal 2** (New Command Prompt):

```bash
cd D:\react\world-trip
npm install
npm run dev
```

You should see:
```
➜  Local:   http://localhost:5173/
```

#### Step 3: Access the Website

Open your browser and go to: **http://localhost:5173**

**Note:** Keep both terminals open while using the website!

## Usage

### Client Access
- Register a new account or login as a regular user
- Browse packages and destinations
- Place orders for travel packages
- View your order history

### Admin Access
- Login with admin checkbox checked
- Manage packages, orders, and view customers
- All registered users appear in the customers list
- All orders placed by clients appear in the orders panel

## Technology Stack

- React 18
- React Router DOM
- Vite
- Context API for state management
- Modern CSS with gradients and animations

## Project Structure

```
world-trip/
├── src/
│   ├── components/
│   │   ├── client/      # Client panel components
│   │   ├── admin/       # Admin panel components
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── client/      # Client pages
│   │   ├── admin/       # Admin pages
│   │   └── auth/        # Authentication pages
│   ├── layouts/         # Layout components
│   ├── context/         # App context for state management
│   └── App.jsx
└── package.json
```

## Features Highlights

- ✅ Professional and modern UI design
- ✅ Responsive layout for all devices
- ✅ Separate client and admin panels
- ✅ Order management system
- ✅ Customer registration and management
- ✅ Package management
- ✅ Protected admin routes
- ✅ Local storage persistence

## Database

The backend uses a JSON file-based database located at:
```
backend/data/database.json
```

This file is automatically created when you first run the backend server. All data (packages, orders, customers) is stored here and persists between server restarts.

## Important Notes

- **Backend must be running** before using the frontend
- Admin login: Check "Login as Admin" checkbox on login page
- All registered users automatically appear in admin customers panel
- All orders placed from client panel appear in admin orders panel
- Orders are synced in real-time (refreshes every 3 seconds)
- Data persists in the database file even after closing the server

## Features

✅ **Packages Page**: Grid layout like Destinations with "Book Now" button on each package  
✅ **Real-time Order Sync**: Orders placed appear immediately in both client and admin panels  
✅ **Database Integration**: Proper backend with JSON database  
✅ **API-based**: All data operations use REST API  
✅ **Professional UI**: Modern design with smooth animations

