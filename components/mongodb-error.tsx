'use client';

import { AlertCircle, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function MongoDBErrorAlert() {
  return (
    <Alert className="mb-6 border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950">
      <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
      <AlertTitle className="text-orange-900 dark:text-orange-100">MongoDB Connection Required</AlertTitle>
      <AlertDescription className="text-orange-800 dark:text-orange-200 mt-2">
        <p className="mb-3">Your MongoDB Atlas IP address needs to be whitelisted to use database features.</p>
        <ol className="list-decimal list-inside space-y-2 mb-4 text-sm">
          <li>Go to <a href="https://cloud.mongodb.com/" target="_blank" rel="noopener noreferrer" className="underline font-medium">MongoDB Atlas</a></li>
          <li>Navigate to your cluster → <strong>Network Access</strong></li>
          <li>Click <strong>"Add IP Address"</strong></li>
          <li>Click <strong>"Add Current IP Address"</strong> or add <code className="bg-orange-100 dark:bg-orange-900 px-1 rounded">0.0.0.0/0</code> for development</li>
          <li>Wait 1-2 minutes, then refresh this page</li>
        </ol>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.open('https://cloud.mongodb.com/', '_blank')}
            className="border-orange-300 text-orange-900 hover:bg-orange-100 dark:border-orange-700 dark:text-orange-100 dark:hover:bg-orange-900"
          >
            Open MongoDB Atlas
            <ExternalLink className="ml-2 h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.location.reload()}
            className="border-orange-300 text-orange-900 hover:bg-orange-100 dark:border-orange-700 dark:text-orange-100 dark:hover:bg-orange-900"
          >
            Retry Connection
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}

export function MongoDBSetupGuide() {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-orange-600" />
          MongoDB Atlas Setup Required
        </CardTitle>
        <CardDescription>
          Follow these steps to configure your MongoDB Atlas connection
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Step 1: Whitelist Your IP Address</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Go to <a href="https://cloud.mongodb.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">MongoDB Atlas Dashboard</a></li>
            <li>Select your cluster</li>
            <li>Click <strong>"Network Access"</strong> in the left sidebar</li>
            <li>Click <strong>"Add IP Address"</strong> button</li>
            <li>Click <strong>"Add Current IP Address"</strong> (recommended) or enter <code className="bg-muted px-1 rounded">0.0.0.0/0</code> for development</li>
            <li>Click <strong>"Confirm"</strong></li>
            <li>Wait 1-2 minutes for changes to propagate</li>
          </ol>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Step 2: Verify Connection String</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Make sure your <code className="bg-muted px-1 rounded">.env.local</code> has the correct connection string:
          </p>
          <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/netiva?retryWrites=true&w=majority`}
          </pre>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Step 3: Restart Development Server</h3>
          <p className="text-sm text-muted-foreground">
            After updating MongoDB Atlas, restart your Next.js dev server:
          </p>
          <pre className="bg-muted p-3 rounded text-xs mt-2">
{`# Stop the server (Ctrl+C)
# Then restart:
npm run dev`}
          </pre>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
            <div>
              <p className="font-medium text-green-900 dark:text-green-100">Quick Tip</p>
              <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                For development, you can temporarily whitelist <code className="bg-green-100 dark:bg-green-900 px-1 rounded">0.0.0.0/0</code> to allow all IPs. 
                Remember to restrict this in production!
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 flex-col sm:flex-row">
          <Button
            onClick={() => window.open('https://cloud.mongodb.com/', '_blank')}
            className="flex-1"
          >
            Open MongoDB Atlas
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open('https://docs.atlas.mongodb.com/security-whitelist/', '_blank')}
          >
            View Documentation
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Retry Connection
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
