import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { checkApiHealth, testCors, getApiInfo } from '../lib/api';

interface TestResult {
  success: boolean;
  data?: any;
  error?: string;
  timestamp: string;
}

export default function ApiTest() {
  const [results, setResults] = useState<{
    health: TestResult | null;
    cors: TestResult | null;
    info: TestResult | null;
  }>({
    health: null,
    cors: null,
    info: null,
  });

  const [loading, setLoading] = useState<{
    health: boolean;
    cors: boolean;
    info: boolean;
  }>({
    health: false,
    cors: false,
    info: false,
  });

  const [connectivityResults, setConnectivityResults] = useState<{
    dns: boolean;
    ping: boolean;
    https: boolean;
    cors: boolean;
  } | null>(null);

  const runTest = async (testType: 'health' | 'cors' | 'info') => {
    setLoading(prev => ({ ...prev, [testType]: true }));
    
    try {
      let apiResult: any;
      
      switch (testType) {
        case 'health':
          apiResult = await checkApiHealth();
          break;
        case 'cors':
          apiResult = await testCors();
          break;
        case 'info':
          apiResult = await getApiInfo();
          break;
        default:
          throw new Error('Unknown test type');
      }
      
      const result: TestResult = {
        success: apiResult.success,
        data: apiResult.data,
        error: apiResult.error,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setResults(prev => ({
        ...prev,
        [testType]: result
      }));
    } catch (error) {
      setResults(prev => ({
        ...prev,
        [testType]: {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toLocaleTimeString()
        }
      }));
    } finally {
      setLoading(prev => ({ ...prev, [testType]: false }));
    }
  };

  const runDirectFetchTest = async () => {
    try {
      console.log('Starting direct fetch test...');
      
      // Test direct fetch without any headers
      const response = await fetch('https://engineering-calc-api.vercel.app/api/health', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Direct fetch test successful:', data);
      alert(`Direct fetch test successful! Status: ${response.status}\nCheck console for details.`);
    } catch (error) {
      console.error('Direct fetch test failed:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      let errorMessage = 'Direct fetch test failed!\n';
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        errorMessage += 'This suggests a network connectivity issue or the API is not accessible.\n';
        errorMessage += 'Possible causes:\n';
        errorMessage += '1. API server is down\n';
        errorMessage += '2. Network connectivity issues\n';
        errorMessage += '3. API URL is incorrect\n';
        errorMessage += '4. Firewall blocking the request';
      } else {
        errorMessage += `Error: ${error.message}`;
      }
      
      alert(errorMessage + '\nCheck console for detailed error information.');
    }
  };

  const runConnectivityTests = async () => {
    const results = {
      dns: false,
      ping: false,
      https: false,
      cors: false
    };

    try {
      // Test 1: DNS Resolution
      console.log('Testing DNS resolution...');
      const dnsTest = await fetch('https://engineering-calc-api.vercel.app', {
        method: 'HEAD',
        mode: 'no-cors'
      });
      results.dns = true;
      console.log('DNS resolution successful');
    } catch (error) {
      console.log('DNS resolution failed:', error);
    }

    try {
      // Test 2: HTTPS Connection
      console.log('Testing HTTPS connection...');
      const httpsTest = await fetch('https://engineering-calc-api.vercel.app', {
        method: 'GET',
        mode: 'no-cors'
      });
      results.https = true;
      console.log('HTTPS connection successful');
    } catch (error) {
      console.log('HTTPS connection failed:', error);
    }

    try {
      // Test 3: API Endpoint
      console.log('Testing API endpoint...');
      const apiTest = await fetch('https://engineering-calc-api.vercel.app/api/health', {
        method: 'GET',
        mode: 'no-cors'
      });
      results.ping = true;
      console.log('API endpoint accessible');
    } catch (error) {
      console.log('API endpoint failed:', error);
    }

    try {
      // Test 4: CORS
      console.log('Testing CORS...');
      const corsTest = await fetch('https://engineering-calc-api.vercel.app/api/health', {
        method: 'GET',
        mode: 'cors'
      });
      results.cors = true;
      console.log('CORS test successful');
    } catch (error) {
      console.log('CORS test failed:', error);
    }

    setConnectivityResults(results);
    console.log('Connectivity test results:', results);
  };

  const getEnvironmentInfo = () => {
    return {
      isDev: import.meta.env.DEV,
      apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://engineering-calc-api.vercel.app',
      currentOrigin: window.location.origin,
      userAgent: navigator.userAgent
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">API Connection Test</h2>
        <div className="space-x-2">
          <Button onClick={runDirectFetchTest} variant="outline">
            Test Direct Fetch
          </Button>
          <Button onClick={runConnectivityTests} variant="outline">
            Run Connectivity Tests
          </Button>
        </div>
      </div>

      {/* Connectivity Test Results */}
      {connectivityResults && (
        <Card>
          <CardHeader>
            <CardTitle>Connectivity Test Results</CardTitle>
            <CardDescription>Network connectivity diagnostics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="font-medium">DNS Resolution</div>
                <Badge variant={connectivityResults.dns ? "default" : "destructive"}>
                  {connectivityResults.dns ? "✓" : "✗"}
                </Badge>
              </div>
              <div className="text-center">
                <div className="font-medium">HTTPS Connection</div>
                <Badge variant={connectivityResults.https ? "default" : "destructive"}>
                  {connectivityResults.https ? "✓" : "✗"}
                </Badge>
              </div>
              <div className="text-center">
                <div className="font-medium">API Endpoint</div>
                <Badge variant={connectivityResults.ping ? "default" : "destructive"}>
                  {connectivityResults.ping ? "✓" : "✗"}
                </Badge>
              </div>
              <div className="text-center">
                <div className="font-medium">CORS Support</div>
                <Badge variant={connectivityResults.cors ? "default" : "destructive"}>
                  {connectivityResults.cors ? "✓" : "✗"}
                </Badge>
              </div>
            </div>
            {!connectivityResults.dns && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-sm">
                <strong>Critical Issue:</strong> DNS resolution failed. The API domain may not exist or there's a network connectivity problem.
              </div>
            )}
            {connectivityResults.dns && !connectivityResults.https && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-sm">
                <strong>HTTPS Issue:</strong> DNS works but HTTPS connection failed. This could be a server configuration issue.
              </div>
            )}
            {connectivityResults.https && !connectivityResults.ping && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
                <strong>API Issue:</strong> Server is reachable but API endpoint is not responding. The API may be down or misconfigured.
              </div>
            )}
            {connectivityResults.ping && !connectivityResults.cors && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                <strong>CORS Issue:</strong> API is working but CORS is not properly configured. This is a backend configuration issue.
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Health Check */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {results.health?.success ? (
                <Badge variant="default" className="bg-green-500">✓</Badge>
              ) : results.health ? (
                <Badge variant="destructive">✗</Badge>
              ) : (
                <Badge variant="secondary">?</Badge>
              )}
              Health Check
            </CardTitle>
            <CardDescription>Test API health endpoint</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => runTest('health')} 
              disabled={loading.health}
              className="w-full"
            >
              {loading.health ? 'Testing...' : 'Test Health'}
            </Button>
            {results.health && (
              <div className="text-sm">
                <div className="font-medium">Status: {results.health.success ? 'Success' : 'Failed'}</div>
                {results.health.error && (
                  <div className="text-red-600 mt-1">{results.health.error}</div>
                )}
                {results.health.data && (
                  <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-auto">
                    {JSON.stringify(results.health.data, null, 2)}
                  </pre>
                )}
                <div className="text-gray-500 mt-1">Time: {results.health.timestamp}</div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* CORS Test */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {results.cors?.success ? (
                <Badge variant="default" className="bg-green-500">✓</Badge>
              ) : results.cors ? (
                <Badge variant="destructive">✗</Badge>
              ) : (
                <Badge variant="secondary">?</Badge>
              )}
              CORS Test
            </CardTitle>
            <CardDescription>Test CORS configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => runTest('cors')} 
              disabled={loading.cors}
              className="w-full"
            >
              {loading.cors ? 'Testing...' : 'Test CORS'}
            </Button>
            {results.cors && (
              <div className="text-sm">
                <div className="font-medium">Status: {results.cors.success ? 'Success' : 'Failed'}</div>
                {results.cors.error && (
                  <div className="text-red-600 mt-1">{results.cors.error}</div>
                )}
                {results.cors.data && (
                  <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-auto">
                    {JSON.stringify(results.cors.data, null, 2)}
                  </pre>
                )}
                <div className="text-gray-500 mt-1">Time: {results.cors.timestamp}</div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* API Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {results.info?.success ? (
                <Badge variant="default" className="bg-green-500">✓</Badge>
              ) : results.info ? (
                <Badge variant="destructive">✗</Badge>
              ) : (
                <Badge variant="secondary">?</Badge>
              )}
              API Info
            </CardTitle>
            <CardDescription>Get API information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => runTest('info')} 
              disabled={loading.info}
              className="w-full"
            >
              {loading.info ? 'Testing...' : 'Get Info'}
            </Button>
            {results.info && (
              <div className="text-sm">
                <div className="font-medium">Status: {results.info.success ? 'Success' : 'Failed'}</div>
                {results.info.error && (
                  <div className="text-red-600 mt-1">{results.info.error}</div>
                )}
                {results.info.data && (
                  <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-auto">
                    {JSON.stringify(results.info.data, null, 2)}
                  </pre>
                )}
                <div className="text-gray-500 mt-1">Time: {results.info.timestamp}</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Environment Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Environment Configuration</CardTitle>
          <CardDescription>Current API configuration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div><strong>API Base URL:</strong> {getEnvironmentInfo().apiBaseUrl}</div>
            <div><strong>Environment:</strong> {getEnvironmentInfo().isDev ? 'development' : 'production'}</div>
            <div><strong>Current Origin:</strong> {getEnvironmentInfo().currentOrigin}</div>
            <div><strong>Node Environment:</strong> {import.meta.env.MODE}</div>
          </div>
        </CardContent>
      </Card>

      {/* CORS Troubleshooting */}
      <Card>
        <CardHeader>
          <CardTitle>CORS Troubleshooting</CardTitle>
          <CardDescription>Common solutions for CORS issues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
              <strong>Issue:</strong> CORS preflight requests failing
              <br />
              <strong>Solution:</strong> Backend needs to handle OPTIONS requests and return proper CORS headers
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <strong>Development:</strong> Using Vite proxy to avoid CORS during local development
              <br />
              <strong>Production:</strong> Backend must allow requests from your frontend domain
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <strong>Quick Fix:</strong> Try the "Test Direct Fetch" button to bypass frontend CORS handling
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 