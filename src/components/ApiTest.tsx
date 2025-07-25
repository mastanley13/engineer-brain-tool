import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { checkApiHealth, testCors, getApiInfo } from "@/lib/api";
import { Wifi, WifiOff, CheckCircle, XCircle } from "lucide-react";

export default function ApiTest() {
  const [healthStatus, setHealthStatus] = useState<{
    loading: boolean;
    success?: boolean;
    data?: any;
    error?: string;
  }>({ loading: false });

  const [corsStatus, setCorsStatus] = useState<{
    loading: boolean;
    success?: boolean;
    data?: any;
    error?: string;
  }>({ loading: false });

  const [apiInfo, setApiInfo] = useState<{
    loading: boolean;
    success?: boolean;
    data?: any;
    error?: string;
  }>({ loading: false });

  const testHealth = async () => {
    setHealthStatus({ loading: true });
    const result = await checkApiHealth();
    setHealthStatus({
      loading: false,
      success: result.success,
      data: result.success ? result.data : undefined,
      error: result.success ? undefined : result.error,
    });
  };

  const testCorsConnection = async () => {
    setCorsStatus({ loading: true });
    const result = await testCors();
    setCorsStatus({
      loading: false,
      success: result.success,
      data: result.success ? result.data : undefined,
      error: result.success ? undefined : result.error,
    });
  };

  const getApiInformation = async () => {
    setApiInfo({ loading: true });
    const result = await getApiInfo();
    setApiInfo({
      loading: false,
      success: result.success,
      data: result.success ? result.data : undefined,
      error: result.success ? undefined : result.error,
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">API Connection Test</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Health Check */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {healthStatus.loading ? (
                <Wifi className="h-5 w-5 animate-pulse" />
              ) : healthStatus.success ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : healthStatus.error ? (
                <XCircle className="h-5 w-5 text-red-500" />
              ) : (
                <Wifi className="h-5 w-5 text-gray-400" />
              )}
              Health Check
            </CardTitle>
            <CardDescription>Test API health endpoint</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testHealth} 
              disabled={healthStatus.loading}
              className="w-full"
            >
              {healthStatus.loading ? "Testing..." : "Test Health"}
            </Button>
            {healthStatus.data && (
              <div className="mt-3 p-2 bg-green-50 rounded text-sm">
                <p><strong>Status:</strong> {healthStatus.data.status}</p>
                <p><strong>Message:</strong> {healthStatus.data.message}</p>
              </div>
            )}
            {healthStatus.error && (
              <div className="mt-3 p-2 bg-red-50 rounded text-sm text-red-600">
                <strong>Error:</strong> {healthStatus.error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* CORS Test */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {corsStatus.loading ? (
                <Wifi className="h-5 w-5 animate-pulse" />
              ) : corsStatus.success ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : corsStatus.error ? (
                <XCircle className="h-5 w-5 text-red-500" />
              ) : (
                <Wifi className="h-5 w-5 text-gray-400" />
              )}
              CORS Test
            </CardTitle>
            <CardDescription>Test CORS configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testCorsConnection} 
              disabled={corsStatus.loading}
              className="w-full"
            >
              {corsStatus.loading ? "Testing..." : "Test CORS"}
            </Button>
            {corsStatus.data && (
              <div className="mt-3 p-2 bg-green-50 rounded text-sm">
                <p><strong>Message:</strong> {corsStatus.data.message}</p>
              </div>
            )}
            {corsStatus.error && (
              <div className="mt-3 p-2 bg-red-50 rounded text-sm text-red-600">
                <strong>Error:</strong> {corsStatus.error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* API Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {apiInfo.loading ? (
                <Wifi className="h-5 w-5 animate-pulse" />
              ) : apiInfo.success ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : apiInfo.error ? (
                <XCircle className="h-5 w-5 text-red-500" />
              ) : (
                <Wifi className="h-5 w-5 text-gray-400" />
              )}
              API Info
            </CardTitle>
            <CardDescription>Get API information</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={getApiInformation} 
              disabled={apiInfo.loading}
              className="w-full"
            >
              {apiInfo.loading ? "Loading..." : "Get Info"}
            </Button>
            {apiInfo.data && (
              <div className="mt-3 p-2 bg-blue-50 rounded text-sm">
                <p><strong>Message:</strong> {apiInfo.data.message}</p>
                <p><strong>Version:</strong> {apiInfo.data.version}</p>
              </div>
            )}
            {apiInfo.error && (
              <div className="mt-3 p-2 bg-red-50 rounded text-sm text-red-600">
                <strong>Error:</strong> {apiInfo.error}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Environment Info */}
      <Card>
        <CardHeader>
          <CardTitle>Environment Configuration</CardTitle>
          <CardDescription>Current API configuration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>API Base URL:</strong> {import.meta.env.VITE_API_BASE_URL || 'https://engineering-calc-api.vercel.app'}</p>
            <p><strong>Environment:</strong> {import.meta.env.MODE}</p>
            <p><strong>Node Environment:</strong> {import.meta.env.NODE_ENV}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 