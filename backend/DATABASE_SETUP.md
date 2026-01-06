# Database Setup Guide

## SQLite Database

The application now uses **SQLite** for permanent data storage. SQLite is a lightweight, file-based database that provides:

- ✅ Permanent data storage
- ✅ Better performance than JSON files
- ✅ Data integrity and transactions
- ✅ No separate database server required
- ✅ Easy backup (just copy the .db file)

## Installation

1. Install the new dependency:
```bash
cd backend
npm install
```

This will install `better-sqlite3` which is the SQLite driver.

## Database Location

The database file is located at:
```
backend/data/worldtrip.db
```

## Automatic Migration

When you start the server for the first time after upgrading:
- The system will automatically create the SQLite database
- If you have an existing `database.json` file, it will be automatically migrated to SQLite
- Default packages will be inserted if the database is empty

## Database Schema

### Packages Table
- id (Primary Key)
- name
- destination
- duration
- price
- image
- description
- included (JSON array stored as TEXT)
- created_at
- updated_at

### Customers Table
- id (Primary Key)
- name
- email (Unique)
- registered_at

### Orders Table
- id (Primary Key)
- package_id (Foreign Key)
- package_name
- destination
- price
- customer_name
- customer_email
- customer_phone
- travel_date
- number_of_travelers
- special_requests
- address
- city
- country
- passport_number
- total_amount
- status
- order_date

## Backup

To backup your database, simply copy the `worldtrip.db` file:
```bash
cp backend/data/worldtrip.db backend/data/worldtrip.db.backup
```

## Restore

To restore from a backup:
```bash
cp backend/data/worldtrip.db.backup backend/data/worldtrip.db
```

## Notes

- The old `database.json` file will remain but won't be used after migration
- You can safely delete `database.json` after confirming the migration worked
- The database file is automatically created in the `data/` directory
- All data is now permanently stored and persists across server restarts

