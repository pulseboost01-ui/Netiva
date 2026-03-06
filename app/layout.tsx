import * as React from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from '@/components/providers/session-provider';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { PwaRegister } from '@/components/pwa-register';
import Script from 'next/script';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Netiva – Unified Ecosystem for Education, Careers & Growth',
  description: 'EdTech SMS, ResumeRocket, Bid Pro, Affiliates Omega. One ecosystem, four products, unlimited scale.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KJW8EY92W3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-KJW8EY92W3');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} min-h-screen font-sans antialiased`}>
        <SessionProvider>
          <ThemeProvider>
            <Navbar />
            {children}
            <Footer />
            <Toaster richColors position="top-right" />
            <PwaRegister />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
