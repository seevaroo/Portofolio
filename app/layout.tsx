import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#02050e",
};

export const metadata: Metadata = {
  title: "Alvaro Raka Pratama | Full Stack Developer",
  description:
    "Personal Developer Portfolio of Alvaro Raka Pratama. Full Stack Developer specializing in Next.js, React, TypeScript, and Three.js 3D web applications.",
  keywords: [
    "Alvaro Raka Pratama",
    "Full Stack Developer",
    "Next.js Portfolio",
    "Three.js 3D Portfolio",
    "React Developer",
    "TypeScript",
  ],
  authors: [{ name: "Alvaro Raka Pratama" }],
  icons: {
    icon: [
      { url: '/icon.png', sizes: '360x360', type: 'icon.png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'icon.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen bg-[#02050e] text-slate-100 antialiased flex flex-col selection:bg-sky-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
