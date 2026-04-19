import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import WeddingStructuredData from "@/components/WeddingStructuredData";
import { RootClientWrapper } from "@/components/RootClientWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sugar & Mark's Wedding",
  description: "Join us for the celebration of Sugar & Mark's wedding. View the schedule, venue details, and share your favorite moments in our guest gallery.",
  keywords: "wedding, celebration, gallery, schedule, venue, Sugar, Mark",
  authors: [{ name: "Sugar & Mark" }],
  openGraph: {
    title: "Sugar & Mark's Wedding Celebration",
    description: "Join us for a special day of love and celebration",
    type: "website",
    locale: "en_US",
    siteName: "Sugar & Mark Wedding",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sugar & Mark's Wedding",
    description: "Join us for the celebration of our special day",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const skipLink = (
    <a
      href="#main-content"
      className="absolute top-0 left-0 -translate-y-full bg-primary-600 text-white px-4 py-2 rounded focus:translate-y-0 focus:relative focus:z-50 transition-transform"
    >
      Skip to main content
    </a>
  );

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <WeddingStructuredData />
      </head>
      <body className="min-h-full flex flex-col">
        <RootClientWrapper skipLink={skipLink}>
          {children}
        </RootClientWrapper>
      </body>
    </html>
  );
}
