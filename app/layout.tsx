import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ThemeProvider } from './components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RepVouch DAO - Verify Your On-Chain Reputation',
  description: 'Transform your on-chain activity into verifiable reputation badges and unlock exclusive Web3 opportunities.',
  keywords: ['Web3', 'DeFi', 'Reputation', 'NFT', 'DAO', 'Base', 'Blockchain'],
  authors: [{ name: 'RepVouch DAO' }],
  openGraph: {
    title: 'RepVouch DAO',
    description: 'Verify your on-chain reputation, unlock exclusive opportunities.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Providers>
            <div className="min-h-screen bg-gradient-to-br from-bg via-surface to-bg">
              {children}
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
