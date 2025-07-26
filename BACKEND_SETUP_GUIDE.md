# 🔧 Backend Setup Guide

## 🚨 Current Issue: Local Backend Server Not Running

Your tests are showing "Failed to fetch" errors from `http://localhost:3001`, which means the backend server is not running or not properly configured.

## 📋 Step-by-Step Backend Setup

### **Step 1: Verify Backend Directory Structure**

Make sure you have a backend project with this structure:
```
backend/
├── package.json
├── index.js (or app.js)
├── node_modules/
└── .env (optional)
```

### **Step 2: Install Dependencies**

```bash
# Navigate to your backend directory
cd backend

# Install dependencies
npm install

# Install CORS middleware (if not already installed)
npm install cors
```

### **Step 3: Basic Backend Server Setup**

Create or update your `index.js` file:

```javascript
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration
app.use(cors({
  origin: [
    'http://localhost:5173',  // Vite dev server
    'http://localhost:3000',  // Alternative dev port
    'http://localhost:4173',  // Vite preview
    'https://engineer-brain-tool-mpds6q7ln-mastanley13s-projects.vercel.app',
    'https://engineer-brain-tool.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle OPTIONS preflight requests
app.options('*', cors());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    message: 'Engineering Calculator API is running'
  });
});

// CORS test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    message: 'CORS works! Backend is running successfully.'
  });
});

// Slope calculation endpoint
app.get('/api/slope', (req, res) => {
  const { rise, run } = req.query;
  
  if (!rise || !run) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing rise or run'
    });
  }
  
  const riseNum = parseFloat(rise);
  const runNum = parseFloat(run);
  
  if (isNaN(riseNum) || isNaN(runNum) || runNum === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid rise or run values'
    });
  }
  
  const slope = ((riseNum / runNum) * 100).toFixed(2);
  const angle = (Math.atan(riseNum / runNum) * 180 / Math.PI).toFixed(2);
  
  const workShown = `Given:
• Rise = ${riseNum} ft
• Run = ${runNum} ft

Calculations:
• Slope (%) = (Rise ÷ Run) × 100 = ${slope}%
• Angle = arctan(Rise ÷ Run) = ${angle}°`;
  
  res.json({
    status: 'success',
    result: {
      slope: slope,
      angle: angle
    },
    workShown: workShown
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Engineering Calculator API',
    version: '1.0.0',
    endpoints: {
      test: '/api/test',
      slope: '/api/slope?rise=<value>&run=<value>',
      health: '/api/health'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   - GET /api/health`);
  console.log(`   - GET /api/test`);
  console.log(`   - GET /api/slope?rise=<value>&run=<value>`);
  console.log(`   - GET /`);
});

module.exports = app;
```

### **Step 4: Package.json Configuration**

Make sure your `package.json` has the correct scripts:

```json
{
  "name": "engineering-calc-backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

### **Step 5: Start the Backend Server**

```bash
# Start the server
npm start

# Or for development with auto-restart
npm run dev
```

### **Step 6: Test the Backend**

Once the server is running, test it directly:

```bash
# Test health endpoint
curl http://localhost:3001/api/health

# Test CORS endpoint
curl http://localhost:3001/api/test

# Test slope calculation
curl "http://localhost:3001/api/slope?rise=10&run=100"
```

Or open these URLs in your browser:
- `http://localhost:3001/api/health`
- `http://localhost:3001/api/test`
- `http://localhost:3001/api/slope?rise=10&run=100`

## 🧪 Testing Your Backend

### **Manual Testing in Browser Console**

Once your backend is running, test it from your frontend:

```javascript
// Test health endpoint
fetch('http://localhost:3001/api/health')
  .then(response => response.json())
  .then(data => console.log('Health:', data))
  .catch(error => console.error('Error:', error));

// Test CORS endpoint
fetch('http://localhost:3001/api/test')
  .then(response => response.json())
  .then(data => console.log('CORS:', data))
  .catch(error => console.error('Error:', error));

// Test slope calculation
fetch('http://localhost:3001/api/slope?rise=10&run=100')
  .then(response => response.json())
  .then(data => console.log('Slope:', data))
  .catch(error => console.error('Error:', error));
```

## 🚨 Common Issues and Solutions

### **Issue 1: Port Already in Use**
```bash
# Check what's using port 3001
lsof -i :3001

# Kill the process or use a different port
kill -9 <PID>
```

### **Issue 2: Missing Dependencies**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### **Issue 3: CORS Still Not Working**
Make sure your CORS configuration includes all necessary origins and headers.

### **Issue 4: Server Won't Start**
Check for syntax errors in your `index.js` file and make sure all dependencies are installed.

## ✅ Success Criteria

Your backend is working correctly when:

1. ✅ Server starts without errors
2. ✅ `http://localhost:3001/api/health` returns JSON response
3. ✅ `http://localhost:3001/api/test` returns CORS confirmation
4. ✅ `http://localhost:3001/api/slope?rise=10&run=100` returns slope calculation
5. ✅ Frontend can successfully make requests to the backend

## 🎯 Next Steps

1. **Start the backend server** using the steps above
2. **Test the endpoints** manually in browser or with curl
3. **Update your frontend** to use `http://localhost:3001` for local development
4. **Test the integration** using your frontend API test component

---

**Once your backend is running, your frontend should be able to connect successfully!** 