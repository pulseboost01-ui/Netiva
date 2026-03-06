import { MongoDBSetupGuide } from '@/components/mongodb-error';
import { PremiumHeader } from '@/components/landing/premium-header';
import { PremiumFooter } from '@/components/landing/premium-footer';

export default function MongoDBSetupPage() {
  return (
    <>
      <PremiumHeader />
      <main className="pt-16 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <MongoDBSetupGuide />
        </div>
      </main>
      <PremiumFooter />
    </>
  );
}
