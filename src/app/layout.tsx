import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const noteSansJP = Noto_Sans_JP({ subsets: ['latin'], weight: ['400'] });
export const metadata: Metadata = {
  title: 'Pomodoro Timer',
  description: 'This app is a simple Pomodoro timer designed with Neumorphism',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#F5F7FA" />
      </head>
      <body className={`${noteSansJP.className} h-screen`}>{children}</body>
    </html>
  );
}
