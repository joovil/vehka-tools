import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const circular = localFont({
  src: [
    {
      path: "../fonts/CircularStd-Black.woff",
      style: "black",
      weight: "900",
    },
    {
      path: "../fonts/CircularStd-Bold.woff",
      style: "bold",
      weight: "700",
    },
    {
      path: "../fonts/CircularStd-Medium.woff",
      style: "medium",
      weight: "500",
    },
    {
      path: "../fonts/CircularStd-Book.woff",
      style: "normal",
      weight: "400",
    },
  ],
  variable: "--font-circular",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${circular.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="page-container">
          <div className="page-content">{children}</div>
        </div>
      </body>
    </html>
  );
}
