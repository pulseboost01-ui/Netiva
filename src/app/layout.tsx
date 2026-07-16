import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import SpeakToMeBar from "@/components/layout/SpeakToMeBar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import PageTransition from "@/components/ui/PageTransition";
import { ContactDrawerProvider } from "@/components/contact/ContactDrawerContext";
import ContactDrawer from "@/components/contact/ContactDrawer";
import QuoteDrawer from "@/components/quote/QuoteDrawer";
import BookingDrawer from "@/components/booking/BookingDrawer";
import { siteConfig } from "@/data";

export const metadata: Metadata = {
  metadataBase: new URL("https://netiva.tech"),
  title: {
    default: "Netiva — Web Design & Engineering Studio",
    template: "%s | Netiva",
  },
  description:
    "Netiva crafts campaigns, interfaces, and web systems that provoke, perform, and persuade—brand design, UX, Next.js builds, headless CMS.",
  keywords: [
    "digital agency Kampala",
    "Next.js studio",
    "brand design agency",
    "headless CMS",
    "UX research",
    "payments integration Uganda",
    "Netiva",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://netiva.tech",
    siteName: "Netiva",
    title: "Netiva — Web Design & Engineering Studio",
    description:
      "Digital alchemy across brand, UX, engineered web surfaces, and future-proof content architecture.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Netiva — Web Design & Engineering Studio",
    description:
      "Digital nervous systems spanning brand identity, UX, React/Next.js development, CMS architecture.",
  },
};

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  legalName: siteConfig.legalName ?? siteConfig.name,
  url: "https://netiva.tech",
  email: siteConfig.email,
  telephone: siteConfig.phone.tel,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kampala",
    addressCountry: "UG",
  },
  sameAs: Object.values(siteConfig.socials),
  areaServed: "Worldwide",
  knowsAbout: [
    "Web application development",
    "Brand design",
    "UI/UX design",
    "Headless CMS architecture",
    "Payments and financial integrations",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.className} ${dmSans.variable} antialiased`}>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ContactDrawerProvider>
          <SmoothScroll />
          <CustomCursor />
          <Navbar />
          <PageTransition>
            <main className="pb-20 md:pb-24">{children}</main>
          </PageTransition>
          <SpeakToMeBar />
          <Footer />
          <QuoteDrawer />
          <ContactDrawer />
          <BookingDrawer />
        </ContactDrawerProvider>
      </body>
    </html>
  );
}
