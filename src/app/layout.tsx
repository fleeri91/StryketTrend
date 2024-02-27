import Script from 'next/script';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import ReduxProvider from '@store/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stryket Trend',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <Script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1299064064705433'
          crossOrigin='anonymous'
        ></Script>
      </head>
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
