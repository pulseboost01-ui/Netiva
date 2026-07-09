import type { Metadata } from "next";
import { Instrument_Sans, IBM_Plex_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/ui/PageTransition";
import FirstLoadFade from "@/components/ui/FirstLoadFade";
import { ContactDrawerProvider } from "@/components/contact/ContactDrawerContext";
import ContactDrawer from "@/components/contact/ContactDrawer";
import QuoteDrawer from "@/components/quote/QuoteDrawer";
import BookingDrawer from "@/components/booking/BookingDrawer";
import { siteConfig } from "@/data";

const siteUrl = siteConfig.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Netiva — Full-stack Web Developer | netiva.tech",
    template: "%s | Netiva",
  },
  description: siteConfig.description,
  keywords: [
    "full-stack developer Kampala",
    "Next.js developer Uganda",
    "marketplace developer",
    "school management software",
    "payment integration developer",
    "Netiva",
    "Mitala",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Netiva",
    title: "Netiva — Full-stack Web Developer",
    description: siteConfig.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: "Netiva — Full-stack Web Developer",
    description: siteConfig.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: false,
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: siteConfig.legalName,
      alternateName: siteConfig.name,
      jobTitle: siteConfig.title,
      email: siteConfig.email,
      url: siteUrl,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kampala",
        addressCountry: "UG",
      },
      knowsAbout: [
        "Next.js",
        "React",
        "Node.js",
        "MongoDB",
        "PostgreSQL",
        "Payment integrations",
        "School management software",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: siteConfig.name,
      url: siteUrl,
      email: siteConfig.email,
      description: siteConfig.description,
      areaServed: "Worldwide",
      founder: { "@id": `${siteUrl}/#person` },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kampala",
        addressCountry: "UG",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${instrumentSans.variable} ${newsreader.variable} ${ibmPlexMono.variable} ${instrumentSans.className} antialiased bg-background text-foreground`}
      >
        <ContactDrawerProvider>
          <FirstLoadFade>
            <Navbar />
            <PageTransition>
              <main className="pb-20 md:pb-24">{children}</main>
            </PageTransition>
            <Footer />
            <QuoteDrawer />
            <ContactDrawer />
            <BookingDrawer />
          </FirstLoadFade>
        </ContactDrawerProvider>
      </body>
    </html>
  );
}
