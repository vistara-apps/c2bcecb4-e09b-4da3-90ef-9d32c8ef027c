'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { formatAddress } from '@/lib/utils'

interface WalletConnectorProps {
  variant?: 'default' | 'compact'
}

export function WalletConnector({ variant = 'default' }: WalletConnectorProps) {
  const { address, isConnected, chain } = useAccount()
  const { connectors, connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  const handleConnect = () => {
    // For Base Mini App, we'll use the injected connector
    const connector = connectors.find(c => c.id === 'injected') || connectors[0]
    if (connector) {
      connect({ connector })
    }
  }

  if (isConnected && address) {
    if (variant === 'compact') {
      return (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {chain?.name || 'Unknown'}
          </Badge>
          <span className="text-sm font-mono">{formatAddress(address)}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => disconnect()}
            className="text-xs"
          >
            Disconnect
          </Button>
        </div>
      )
    }

    return (
      <div className="flex items-center gap-4 p-4 glass-card">
        <div className="flex flex-col">
          <span className="text-sm text-text-secondary">Connected Wallet</span>
          <span className="font-mono text-sm">{formatAddress(address)}</span>
        </div>
        <Badge variant="secondary">{chain?.name || 'Unknown'}</Badge>
        <Button variant="outline" size="sm" onClick={() => disconnect()}>
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6 glass-card">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
        <p className="text-sm text-text-secondary mb-4">
          Connect your wallet to analyze your on-chain reputation and mint badges
        </p>
      </div>
      <Button
        onClick={handleConnect}
        disabled={isPending}
        className="btn-primary"
      >
        {isPending ? 'Connecting...' : 'Connect Wallet'}
      </Button>
      <p className="text-xs text-text-secondary text-center">
        Supports Base, Ethereum, Polygon, and other EVM chains
      </p>
    </div>
  )
}

