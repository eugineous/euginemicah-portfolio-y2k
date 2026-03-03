import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Eugine Micah — TV Host, Journalist & Digital Strategist",
    template: "%s — Eugine Micah",
  },
  description: "Eugine Micah is a Kenyan TV host, journalist, and digital strategist. Host of Urban News on PPP TV. Head of Digital Operations reaching 20M+ monthly viewers.",
  keywords: ["Eugine Micah", "Urban News", "PPP TV", "Kenyan journalist", "TV host", "digital strategist", "Born Broke Built Loud"],
  authors: [{ name: "Eugine Micah" }],
  icons: {
    icon: "/eugine_micah_favicon.ico",
  },
  openGraph: {
    title: "Eugine Micah — TV Host, Journalist & Digital Strategist",
    description: "Host of Urban News on PPP TV. Head of Digital Operations. 20M+ monthly views.",
    url: "https://euginemicah.tech",
    siteName: "Eugine Micah",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eugine Micah — TV Host & Digital Strategist",
    description: "Host of Urban News on PPP TV. 20M+ monthly views.",
    creator: "@eugineroylandz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'DM Sans', sans-serif", background: "#000", color: "#fff" }}>
        {/* Scanline overlay */}
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, pointerEvents: "none",
          background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.03) 2px,rgba(0,0,0,.03) 4px)",
        }}/>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
