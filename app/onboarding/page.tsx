'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, FileText, MessageSquare, Users, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MongoDBErrorAlert, MongoDBSetupGuide } from '@/components/mongodb-error';
import { triggerConfetti } from '@/lib/confetti';

const products = [
  { id: 'edtech', name: 'EdTech SMS', icon: GraduationCap, description: 'School management & parent app', color: 'from-blue-500/20 to-blue-600/10' },
  { id: 'resume', name: 'ResumeRocket AI', icon: FileText, description: 'AI resume & job tracker', color: 'from-green-500/20 to-green-600/10' },
  { id: 'bidai', name: 'BidAI Pro', icon: MessageSquare, description: 'AI freelance proposals', color: 'from-purple-500/20 to-purple-600/10' },
  { id: 'affiliates', name: 'Affiliates Omega', icon: Users, description: 'Lead-gen & affiliate tracking', color: 'from-orange-500/20 to-orange-600/10' },
];

export default function OnboardingPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMongoError, setShowMongoError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSelectProduct = async () => {
    if (!selectedProduct) return;

    setIsLoading(true);
    try {
      // Always persist selection into the user's session (JWT) so onboarding works
      // even if MongoDB is temporarily unavailable.
      await update?.({ primaryProduct: selectedProduct } as any);

      const res = await fetch('/api/user/update-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ primaryProduct: selectedProduct }),
      });

      if (res.ok) {
        triggerConfetti();
        router.push(`/dashboard/${selectedProduct}`);
      } else {
        const errorData = await res.json().catch(() => ({}));
        const errorMsg = errorData.message || errorData.error || 'Failed to save product selection';
        setErrorMessage(errorMsg);
        setShowMongoError(true);
        console.error('Failed to save product selection:', errorData);

        // Even if MongoDB write failed, proceed using the session-stored selection.
        router.push(`/dashboard/${selectedProduct}`);
      }
    } catch (error: any) {
      console.error('Error saving product:', error);
      setErrorMessage(error.message || 'Unable to connect to database. Please check your MongoDB Atlas settings.');
      setShowMongoError(true);

      // Proceed using the session-stored selection.
      router.push(`/dashboard/${selectedProduct}`);
    } finally {
      setIsLoading(false);
    }
  };

  const name = session?.user?.name?.split(' ')[0] ?? 'there';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mx-auto"
      >
        {showMongoError && (
          <div className="mb-8">
            <MongoDBSetupGuide />
          </div>
        )}

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome, {name}!</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your primary product to get started. You can switch between products anytime.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 mb-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className={`cursor-pointer transition-all hover:border-primary/50 ${
                selectedProduct === product.id ? 'ring-2 ring-primary border-primary' : ''
              }`}
              onClick={() => setSelectedProduct(product.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${product.color} flex items-center justify-center`}>
                    <product.icon className="h-6 w-6 text-foreground" />
                  </div>
                  {selectedProduct === product.id && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                <CardDescription className="text-base">{product.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleSelectProduct}
            disabled={!selectedProduct || isLoading}
            className="px-8"
          >
            {isLoading ? 'Loading...' : 'Continue to Dashboard'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't worry, you can switch products or add more later from your dashboard.
        </p>
      </motion.div>
    </div>
  );
}
