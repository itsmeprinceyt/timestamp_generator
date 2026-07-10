import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const SITE_URL: string = "https://timestamp.itsmeprince.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Timestamp Generator | ItsMe Prince",
    template: "%s | ItsMe Prince",
  },
  description:
    "Generate precise, live-updating timestamps instantly in YYYYMMDDHHMMSSmmm format. Click to copy in one tap.",
  keywords: [
    "timestamp generator",
    "live timestamp",
    "unix timestamp",
    "timestamp format",
    "copy timestamp",
    "developer tools",
  ],
  authors: [{ name: "ItsMe Prince", url: "https://itsmeprince.com" }],
  creator: "ItsMe Prince",
  publisher: "ItsMe Prince",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Timestamp Generator",
    description:
      "Generate precise, live-updating timestamps instantly in YYYYMMDDHHMMSSmmm format. Click to copy in one tap.",
    url: SITE_URL,
    siteName: "Timestamp Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Timestamp Generator",
    description:
      "Generate precise, live-updating timestamps instantly in YYYYMMDDHHMMSSmmm format.",
    creator: "@itsmeprince",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black antialiased">
        <Toaster position="top-center" />
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
