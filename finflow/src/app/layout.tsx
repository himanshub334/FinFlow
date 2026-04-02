import type { Metadata } from 'next';
import { Syne, DM_Mono } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700'],
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'FinFlow — Finance Dashboard',
  description: 'Track and understand your financial activity',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              var stored = localStorage.getItem('finflow-storage');
              var data = stored ? JSON.parse(stored) : null;
              var dark = data && data.state && typeof data.state.darkMode !== 'undefined' ? data.state.darkMode : true;
              if (dark) document.documentElement.classList.add('dark');
            } catch(e) {
              document.documentElement.classList.add('dark');
            }
          `
        }} />
      </head>
      <body className={`${syne.variable} ${dmMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
