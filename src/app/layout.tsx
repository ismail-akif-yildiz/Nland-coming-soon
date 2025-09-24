// app/layout.tsx
import "./globals.css";
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export const metadata = {
  title: "Nland BV – Coming Soon",
  description: "A clean, natural coming-soon page.",
  metadataBase: new URL("https://n-land.nl"),
  openGraph: {
    title: "Nland BV – Coming Soon",
    description: "A clean, natural coming-soon page.",
    url: "/",
    siteName: "Nland BV",
    images: [{ url: "/background.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nland BV – Coming Soon",
    description: "A clean, natural coming-soon page.",
    images: ["/background.jpg"],
  },
  icons: { icon: "/favicon.ico" },
  robots: { index: false, follow: false }, // yayına alana kadar
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
