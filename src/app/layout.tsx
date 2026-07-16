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

export const metadata: Metadata = {
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
    "Netiva",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://netiva.studio",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.className} ${dmSans.variable} antialiased`}>
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
