# 🔧 API Setup Guide

This guide explains how to configure the frontend to connect to the Engineering Calculator API backend.

## 📋 Environment Configuration

### 1. Create Environment File

Create a `.env.local` file in the project root with the following content:

```bash
# API Configuration
# Production API URL (default)
VITE_API_BASE_URL=https://engineering-calc-api.vercel.app

# For local development, uncomment the line below:
# VITE_API_BASE_URL=http://localhost:3001
```

### 2. Environment Variables

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `VITE_API_BASE_URL` | Base URL for the API backend | `https://engineering-calc-api.vercel.app` |

## 🚀 API Endpoints

The frontend is configured to work with these backend endpoints:

### Health Check
- **URL**: `GET /api/health`
- **Purpose**: Verify API connectivity
- **Response**: API status and timestamp

### CORS Test
- **URL**: `GET /api/test`
- **Purpose**: Test CORS configuration
- **Response**: CORS confirmation message

### Slope Calculator
- **URL**: `GET /api/slope?rise=<value>&run=<value>`
- **Purpose**: Calculate slope percentage and angle
- **Parameters**: 
  - `rise` (number): Rise in feet
  - `run` (number): Run in feet
- **Response**: Slope percentage, angle, and work shown

### API Information
- **URL**: `GET /`
- **Purpose**: Get API version and available endpoints
- **Response**: API metadata

## 🔧 API Service Functions

The frontend includes these API service functions in `src/lib/api.ts`:

### `checkApiHealth()`
Tests the API health endpoint.

### `testCors()`
Tests CORS configuration.

### `calculateSlope(rise: number, run: number)`
Calculates slope with the provided rise and run values.

### `getApiInfo()`
Retrieves API information and version.

## 🧪 Testing API Connection

### 1. Use the API Test Component

The frontend includes an API test component accessible from the dashboard:

1. Click the "API Test" button in the top-right corner of the dashboard
2. Test each endpoint individually
3. Verify CORS is working correctly
4. Check environment configuration

### 2. Manual Testing

You can also test the API manually in the browser console:

```javascript
// Test API health
fetch('https://engineering-calc-api.vercel.app/api/health')
  .then(response => response.json())
  .then(data => console.log('Health:', data));

// Test CORS
fetch('https://engineering-calc-api.vercel.app/api/test')
  .then(response => response.json())
  .then(data => console.log('CORS:', data));

// Test slope calculation
fetch('https://engineering-calc-api.vercel.app/api/slope?rise=10&run=100')
  .then(response => response.json())
  .then(data => console.log('Slope:', data));
```

## 🚨 Troubleshooting

### CORS Issues

If you encounter CORS errors:

1. **Check the API URL**: Ensure you're using the correct production URL
2. **Verify Environment Variables**: Make sure `VITE_API_BASE_URL` is set correctly
3. **Check Network Tab**: Look for CORS preflight requests in browser dev tools
4. **Test with API Test Component**: Use the built-in test component to verify connectivity

### Common Error Messages

- **"Failed to fetch"**: Network connectivity issue or incorrect API URL
- **"CORS error"**: Backend CORS configuration issue
- **"Missing rise or run"**: Invalid parameters sent to slope endpoint

### Development vs Production

- **Development**: Use `http://localhost:3001` for local backend testing
- **Production**: Use `https://engineering-calc-api.vercel.app` for deployed backend

## 📱 Frontend Integration

The frontend automatically:

- ✅ Handles API errors gracefully
- ✅ Shows loading states during API calls
- ✅ Displays user-friendly error messages
- ✅ Validates input before sending to API
- ✅ Supports both development and production environments

## 🔄 Updates Made

Based on the FRONTEND_HANDOFF.md, the following updates were implemented:

1. ✅ Created `src/lib/api.ts` with proper API service functions
2. ✅ Updated `CalculationInterface.tsx` to use the new API service
3. ✅ Added API test component for connectivity verification
4. ✅ Integrated API test into the dashboard
5. ✅ Added proper error handling and loading states
6. ✅ Configured environment variable support
7. ✅ Updated API URL to use the correct production endpoint

## 🎯 Next Steps

1. Create `.env.local` file with API configuration
2. Test API connectivity using the API Test component
3. Verify slope calculations work correctly
4. Deploy frontend to production
5. Test in production environment

---

**✅ The frontend is now properly configured to connect to the Engineering Calculator API backend!** 