// API service functions for Engineering Calculator Backend
// Based on FRONTEND_HANDOFF.md specifications and enhanced backend CORS configuration

// Use local backend in development, production API in production
const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:3001' // Local backend for development
  : (import.meta.env.VITE_API_BASE_URL || 'https://engineering-calc-api.vercel.app');

// Enhanced API request function with better error handling and CORS support
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Enhanced config with CORS support
  const config: RequestInit = {
    method: 'GET',
    credentials: 'include', // Support credentials as backend now handles this
    headers: {
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...options.headers,
    },
    ...options,
  };

  // Remove Content-Type for GET requests to avoid preflight
  if (config.method === 'GET' && config.headers) {
    delete (config.headers as any)['Content-Type'];
  }

  try {
    console.log(`🌐 API Request: ${config.method} ${url}`);
    const response = await fetch(url, config);
    
    console.log(`📡 Response Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`✅ API Response:`, data);
    return data;
  } catch (error) {
    console.error('❌ API request failed:', error);
    console.error('Request details:', { url, config });
    throw error;
  }
}

// Health check function
export async function checkApiHealth() {
  try {
    const response = await apiRequest('/api/health');
    return {
      success: true,
      data: response
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// CORS test function
export async function testCors() {
  try {
    const response = await apiRequest('/api/test');
    return {
      success: true,
      data: response
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Slope calculation function
export async function calculateSlope(rise: number, run: number) {
  try {
    const response = await apiRequest(`/api/slope?rise=${rise}&run=${run}`);
    
    if (response.status === 'success') {
      return {
        success: true,
        data: response.result,
        workShown: response.workShown
      };
    } else {
      return {
        success: false,
        error: response.message
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Get API information
export async function getApiInfo() {
  try {
    const response = await apiRequest('/');
    return {
      success: true,
      data: response
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Enhanced direct fetch test function
export async function testDirectFetch() {
  try {
    console.log('🧪 Testing direct fetch with enhanced CORS support...');
    
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-Custom-Header': 'frontend-test'
      }
    });
    
    console.log('📡 Direct fetch response status:', response.status);
    console.log('📋 Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Direct fetch successful:', data);
    
    return {
      success: true,
      data: data,
      status: response.status,
      headers: Object.fromEntries(response.headers.entries())
    };
  } catch (error) {
    console.error('❌ Direct fetch failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
} 