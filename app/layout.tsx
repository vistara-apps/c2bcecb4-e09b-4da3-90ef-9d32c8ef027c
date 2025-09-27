import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RepVouch DAO - Web3 Reputation Platform',
  description: 'Transform your on-chain activity into verifiable reputation badges and unlock exclusive Web3 opportunities.',
  keywords: ['Web3', 'DAO', 'Reputation', 'NFT', 'Blockchain', 'Base', 'Mini App'],
  authors: [{ name: 'RepVouch DAO Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#D4AF37',
  openGraph: {
    title: 'RepVouch DAO - Web3 Reputation Platform',
    description: 'Transform your on-chain activity into verifiable reputation badges and unlock exclusive Web3 opportunities.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RepVouch DAO - Web3 Reputation Platform',
    description: 'Transform your on-chain activity into verifiable reputation badges and unlock exclusive Web3 opportunities.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-bg text-fg antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

