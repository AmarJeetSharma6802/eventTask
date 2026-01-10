import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {startAutoScrape} from "./api/utils/autoScrape.js"
import Nav from "./navbar/Nav.jsx"
import Footer from "./footer/Footer.jsx"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sydney Events 2026 | Concerts, Festivals, Parties & Live Shows ",
  description: "Discover the best Sydney events including concerts, festivals, live shows, parties, and weekend happenings. Get tickets and explore what's on in Sydney today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  startAutoScrape()
  return (
    <html lang="en">
       <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          />
        </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Nav/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
