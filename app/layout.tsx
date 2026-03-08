import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spatialytics Reel Generator",
  description: "Generate promotional reels for GIS projects, business websites, and data dashboards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
