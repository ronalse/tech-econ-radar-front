import type { Metadata } from "next";
import { Geist, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tech/Econ Radar",
  description: "Monitoreo en tiempo casi real de noticias de tecnologia y economia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geist.variable} ${hankenGrotesk.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-body bg-surface text-on-surface">
        {children}
      </body>
    </html>
  );
}
