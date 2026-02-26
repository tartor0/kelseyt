import type { Metadata } from 'next';
import { Livvic } from 'next/font/google';
import './globals.css';

const livvic = Livvic({
  subsets: ['latin'],
  variable: '--font-livvic',
  weight: ['100', '200', '300', '400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KELSEYT | Under Construction',
  description: 'HealthTech · Payment Systems · Integrations · IT Consulting',
  keywords: 'HealthTech, Payment Systems, Integrations, IT Consulting',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${livvic.variable} antialiased bg-[#0A0A0F] text-white overflow-x-hidden`}
        style={{ fontFamily: 'var(--font-livvic), sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}