# 🔧 Manual API Testing Guide

Since the direct fetch test is failing, let's manually test the API connectivity using your browser's developer console.

## 🧪 Step-by-Step Manual Testing

### 1. **Open Browser Developer Console**
- Press `F12` or right-click and select "Inspect"
- Go to the "Console" tab

### 2. **Test Basic Connectivity**

Copy and paste these commands one by one into the console:

```javascript
// Test 1: Basic fetch to the API domain
console.log('Testing basic connectivity...');
fetch('https://engineering-calc-api.vercel.app')
  .then(response => {
    console.log('✅ Basic connectivity successful');
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
  })
  .catch(error => {
    console.log('❌ Basic connectivity failed:', error);
  });
```

```javascript
// Test 2: Test the health endpoint with no-cors mode
console.log('Testing health endpoint with no-cors...');
fetch('https://engineering-calc-api.vercel.app/api/health', {
  method: 'GET',
  mode: 'no-cors'
})
.then(response => {
  console.log('✅ Health endpoint accessible (no-cors)');
  console.log('Status:', response.status);
})
.catch(error => {
  console.log('❌ Health endpoint failed (no-cors):', error);
});
```

```javascript
// Test 3: Test with CORS mode
console.log('Testing health endpoint with CORS...');
fetch('https://engineering-calc-api.vercel.app/api/health', {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Accept': 'application/json'
  }
})
.then(response => {
  console.log('✅ Health endpoint accessible (CORS)');
  console.log('Status:', response.status);
  return response.json();
})
.then(data => {
  console.log('✅ Data received:', data);
})
.catch(error => {
  console.log('❌ Health endpoint failed (CORS):', error);
});
```

```javascript
// Test 4: Test OPTIONS preflight
console.log('Testing OPTIONS preflight...');
fetch('https://engineering-calc-api.vercel.app/api/health', {
  method: 'OPTIONS',
  mode: 'cors',
  headers: {
    'Access-Control-Request-Method': 'GET',
    'Access-Control-Request-Headers': 'content-type'
  }
})
.then(response => {
  console.log('✅ OPTIONS preflight successful');
  console.log('Status:', response.status);
  console.log('CORS Headers:', {
    'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
    'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
    'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
  });
})
.catch(error => {
  console.log('❌ OPTIONS preflight failed:', error);
});
```

## 🔍 Expected Results

### If API is Working:
- ✅ Basic connectivity should succeed
- ✅ Health endpoint should be accessible with no-cors
- ✅ CORS requests should work (if CORS is configured)
- ✅ OPTIONS preflight should return proper CORS headers

### If API is Down:
- ❌ All tests will fail with network errors
- ❌ You'll see "Failed to fetch" errors

### If CORS is Misconfigured:
- ✅ Basic connectivity works
- ✅ Health endpoint accessible with no-cors
- ❌ CORS requests fail
- ❌ OPTIONS preflight fails or returns no CORS headers

## 🚨 Common Error Patterns

### "Failed to fetch" Error
- **Cause**: Network connectivity issue or API server is down
- **Solution**: Check if the API domain exists and is accessible

### CORS Error
- **Cause**: Backend doesn't return proper CORS headers
- **Solution**: Backend needs to be configured for CORS

### 404 Error
- **Cause**: API endpoint doesn't exist
- **Solution**: Check if the API routes are correct

### 500 Error
- **Cause**: Server-side error
- **Solution**: Backend needs to be fixed

## 📋 What to Look For

1. **Check the Network Tab**: Look for the actual HTTP requests and responses
2. **Check Response Headers**: Look for CORS headers in the response
3. **Check Response Status**: HTTP status codes tell you what's happening
4. **Check Error Messages**: Specific error messages help identify the issue

## 🎯 Next Steps Based on Results

### If All Tests Fail:
- The API server is down or the domain doesn't exist
- Contact the backend developer immediately

### If Basic Tests Pass but CORS Fails:
- The API is working but CORS is not configured
- Share the CORS troubleshooting guide with the backend developer

### If Some Endpoints Work:
- The API is partially functional
- Check which specific endpoints are failing

---

**Run these tests and share the console output to help diagnose the exact issue!** 