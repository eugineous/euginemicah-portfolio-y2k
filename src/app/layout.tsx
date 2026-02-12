import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eugine Micah - Journalist, TV Host, Media Personality",
  description: "Official website of Eugine Micah - Award-winning Kenyan journalist, TV presenter, and digital media strategist. Host of Urban News, Campus Xposure, and The Nairobi Podcast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
