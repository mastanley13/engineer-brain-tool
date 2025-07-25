// API service functions for Engineering Calculator Backend
// Based on FRONTEND_HANDOFF.md specifications

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://engineering-calc-api.vercel.app';

// Generic API request function
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
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