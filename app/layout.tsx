import type { Metadata } from 'next';
import { Bentham, Space_Mono, Crimson_Pro } from 'next/font/google';
import './globals.css';

const bentham = Bentham({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bentham',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
});

const crimson = Crimson_Pro({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-crimson',
});

export const metadata: Metadata = {
  title: 'Sutharsika Kumar',
  description: 'Personal portfolio and selected works',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bentham.variable} ${spaceMono.variable} ${crimson.variable}`}
    >

      <body className="font-serif">
        {children}
      </body>
    </html>
  );
}
