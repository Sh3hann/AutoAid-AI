import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'AutoAid AI – Intelligent Roadside Vehicle Assistant',
    template: '%s | AutoAid AI',
  },
  description:
    'AI-powered roadside vehicle assistant. Diagnose vehicle problems, get step-by-step repair guides, find nearby mechanics, and get emergency roadside assistance instantly.',
  keywords: [
    'vehicle diagnosis',
    'roadside assistance',
    'car repair',
    'AI mechanic',
    'vehicle faults',
    'warning lights',
    'auto repair guide',
    'emergency roadside',
    'EV repair',
    'motorcycle repair',
  ],
  authors: [{ name: 'AutoAid AI' }],
  openGraph: {
    title: 'AutoAid AI – Intelligent Roadside Vehicle Assistant',
    description:
      'AI-powered roadside vehicle assistant. Diagnose problems, repair guides, and find nearby help instantly.',
    type: 'website',
    locale: 'en_US',
    siteName: 'AutoAid AI',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-white dark:bg-primary text-text-primary dark:text-text-dark-primary font-sans antialiased transition-colors duration-300">
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
