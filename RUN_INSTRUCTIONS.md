# How to Run World Trip Project

## Step-by-Step Instructions for Command Prompt

### Step 1: Open Command Prompt
- Press `Windows + R`
- Type `cmd` and press Enter
- Or search for "Command Prompt" in Windows search

### Step 2: Navigate to the Project Folder
```bash
cd D:\react\world-trip
```

### Step 3: Install Dependencies (First Time Only)
```bash
npm install
```
This will install all required packages. Wait for it to complete.

### Step 4: Start the Development Server
```bash
npm run dev
```

### Step 5: Open in Browser
After running `npm run dev`, you will see output like:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open your browser and go to: **http://localhost:5173**

## Quick Commands Summary

```bash
# Navigate to project
cd D:\react\world-trip

# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# To stop the server, press Ctrl + C
```

## Troubleshooting

### If npm is not recognized:
- Install Node.js from https://nodejs.org/
- Restart Command Prompt after installation

### If port 5173 is already in use:
- The terminal will show an error
- Press `Ctrl + C` to stop
- Or use a different port by modifying vite.config.js

### To build for production:
```bash
npm run build
```

### To preview production build:
```bash
npm run preview
```

