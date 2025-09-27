'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { WalletConnector } from './WalletConnector'
import {
  Home,
  Award,
  Coins,
  Briefcase,
  Vote,
  Menu,
  X,
  Shield,
} from 'lucide-react'

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'badges', label: 'Badges', icon: Award },
  { id: 'staking', label: 'Staking', icon: Coins },
  { id: 'opportunities', label: 'Opportunities', icon: Briefcase },
  { id: 'governance', label: 'Governance', icon: Vote },
]

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const NavItem = ({ item, isActive, onClick }: {
    item: typeof navigationItems[0]
    isActive: boolean
    onClick: () => void
  }) => {
    const Icon = item.icon
    return (
      <button
        onClick={onClick}
        className={`nav-item ${
          isActive ? 'nav-item-active' : 'nav-item-inactive'
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="hidden md:inline">{item.label}</span>
      </button>
    )
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col h-full">
        <div className="flex items-center gap-3 p-6 mb-8">
          <Shield className="w-8 h-8 text-accent" />
          <div>
            <h1 className="text-xl font-bold gradient-text">RepVouch DAO</h1>
            <p className="text-xs text-text-secondary">Web3 Reputation Platform</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2 px-4">
          {navigationItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeTab === item.id}
              onClick={() => onTabChange(item.id)}
            />
          ))}
        </nav>

        <div className="p-4 mt-8">
          <WalletConnector variant="compact" />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-700 z-50">
        <div className="flex items-center justify-around py-2">
          {navigationItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeTab === item.id}
              onClick={() => onTabChange(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-surface border border-gray-600"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute top-16 right-4 bg-surface rounded-lg p-4 min-w-48 border border-gray-600">
            <div className="mb-4">
              <WalletConnector variant="compact" />
            </div>
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`w-full nav-item ${
                    activeTab === item.id ? 'nav-item-active' : 'nav-item-inactive'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

