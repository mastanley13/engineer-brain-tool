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
      // Test direct fetch without any headers
      const response = await fetch('https://engineering-calc-api.vercel.app/api/health');
      const data = await response.json();
      console.log('Direct fetch test successful:', data);
      alert('Direct fetch test successful! Check console for details.');
    } catch (error) {
      console.error('Direct fetch test failed:', error);
      alert('Direct fetch test failed! Check console for details.');
    }
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
        <Button onClick={runDirectFetchTest} variant="outline">
          Test Direct Fetch
        </Button>
      </div>

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