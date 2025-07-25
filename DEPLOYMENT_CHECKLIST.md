# 🚀 Deployment Checklist

## 📋 Pre-Deployment Checklist

### Frontend Deployment
- [ ] Deploy frontend to Vercel at: `https://engineer-brain-tool.vercel.app`
- [ ] Verify frontend is accessible and working
- [ ] Test all UI components function correctly

### Backend CORS Configuration Update
The backend agent needs to update the CORS configuration to include the new frontend URL:

**Current CORS Configuration** (from FRONTEND_HANDOFF.md):
```javascript
// Current allowed origins
- https://engineering-calc-api.vercel.app
- https://engineering-calc-api.vercel.app/
- https://engineering-calc-api-frontend.vercel.app
- Local development URLs (localhost:5173, 3000, 4173)
```

**Required CORS Configuration Update**:
```javascript
// Updated allowed origins
- https://engineering-calc-api.vercel.app
- https://engineering-calc-api.vercel.app/
- https://engineer-brain-tool.vercel.app  // ← ADD THIS LINE
- Local development URLs (localhost:5173, 3000, 4173)
```

### Environment Variables
- [ ] Set `VITE_API_BASE_URL=https://engineering-calc-api.vercel.app` in Vercel environment variables
- [ ] Verify environment variables are accessible in production

## 🧪 Post-Deployment Testing

### 1. API Connectivity Test
- [ ] Navigate to `https://engineer-brain-tool.vercel.app`
- [ ] Click "API Test" button in dashboard
- [ ] Test all three endpoints:
  - [ ] Health Check
  - [ ] CORS Test  
  - [ ] API Info
- [ ] Verify all tests pass with green checkmarks

### 2. Slope Calculator Test
- [ ] Go to Civil Engineering → Basic Slope Calculation
- [ ] Enter test values (e.g., Rise: 10, Run: 100)
- [ ] Click Calculate
- [ ] Verify results display correctly
- [ ] Check that work shown is displayed

### 3. Error Handling Test
- [ ] Test with invalid inputs (empty fields, negative numbers)
- [ ] Verify error messages display correctly
- [ ] Test network disconnection scenarios

## 🔧 Backend Agent Tasks

### CORS Configuration Update
The backend agent needs to update the CORS middleware in `index.js`:

```javascript
// Update the CORS configuration to include the new frontend URL
app.use(cors({
  origin: [
    'https://engineering-calc-api.vercel.app',
    'https://engineering-calc-api.vercel.app/',
    'https://engineer-brain-tool.vercel.app',  // ← ADD THIS LINE
    'http://localhost:5173',
    'http://localhost:3000', 
    'http://localhost:4173'
  ],
  credentials: true
}));
```

### Deploy Updated Backend
- [ ] Update CORS configuration
- [ ] Test locally with new frontend URL
- [ ] Deploy to Vercel
- [ ] Verify CORS works in production

## 🚨 Troubleshooting

### If CORS Errors Persist After Deployment:

1. **Check Backend CORS Configuration**:
   - Verify `https://engineer-brain-tool.vercel.app` is in the allowed origins
   - Ensure backend is redeployed with updated CORS settings

2. **Check Frontend Environment Variables**:
   - Verify `VITE_API_BASE_URL` is set correctly in Vercel
   - Check that environment variables are accessible in production

3. **Test API Directly**:
   ```bash
   # Test from deployed frontend domain
   curl -H "Origin: https://engineer-brain-tool.vercel.app" \
        -H "Access-Control-Request-Method: GET" \
        -H "Access-Control-Request-Headers: Content-Type" \
        -X OPTIONS \
        https://engineering-calc-api.vercel.app/api/health
   ```

4. **Check Browser Console**:
   - Look for CORS preflight request failures
   - Verify the exact error messages

## ✅ Success Criteria

The deployment is successful when:

- [ ] Frontend is accessible at `https://engineer-brain-tool.vercel.app`
- [ ] All API tests pass in the API Test component
- [ ] Slope calculator works with real API calls
- [ ] No CORS errors in browser console
- [ ] Error handling works correctly
- [ ] Loading states display properly

## 📞 Next Steps

1. **Deploy Frontend**: Deploy to `https://engineer-brain-tool.vercel.app`
2. **Update Backend CORS**: Add frontend URL to allowed origins
3. **Test Integration**: Use API Test component to verify connectivity
4. **Monitor**: Check for any CORS or API errors in production

---

**🎯 Once these steps are completed, the frontend and backend should be fully integrated and working in production!** 