import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

import { AuthProvider } from '@/context/auth';
import { Header } from '@/components/header';
import { MainLayoutWrapper } from '@/components/main-layout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'EmberSync',
  description: 'Login and save your profile with EmberSync',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-700 dark:to-emerald-700`}
      >
        <AuthProvider>
          <MainLayoutWrapper>{children}</MainLayoutWrapper>
          <Toaster position='top-right' richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
