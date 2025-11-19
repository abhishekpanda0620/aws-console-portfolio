import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import ClientLayout from './components/ClientLayout';
import { LocaleProvider } from './context/LocaleContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { portfolioData } from './data/portfolio';

export const metadata = {
  title: portfolioData?.personal?.name 
    ? `${portfolioData.personal.name} | ${portfolioData.personal.title}`
    : 'AWS Console Portfolio',
  description: portfolioData?.personal?.bio || 'Portfolio presented in an AWS Console style with interactive terminal',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LocaleProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </LocaleProvider>
      </body>
    </html>
  );
}
