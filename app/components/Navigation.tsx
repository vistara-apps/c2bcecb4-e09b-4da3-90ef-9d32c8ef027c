'use client';

import { useState } from 'react';
import { Home, Award, Coins, Search, Vote, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    description: 'Overview of your reputation and activity',
  },
  {
    id: 'badges',
    label: 'Badges',
    icon: Award,
    description: 'Mint and manage your reputation badges',
  },
  {
    id: 'staking',
    label: 'Staking',
    icon: Coins,
    description: 'Stake tokens and earn rewards',
  },
  {
    id: 'opportunities',
    label: 'Opportunities',
    icon: Search,
    description: 'Discover exclusive opportunities',
  },
  {
    id: 'governance',
    label: 'Governance',
    icon: Vote,
    description: 'Participate in DAO governance',
  },
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block glass-card p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 hover:bg-surface/80',
                  isActive
                    ? 'bg-accent/20 border border-accent/30 text-accent'
                    : 'text-text-secondary hover:text-fg'
                )}
              >
                <Icon className={cn('w-5 h-5', isActive ? 'text-accent' : '')} />
                <div className="flex-1">
                  <div className={cn('font-medium', isActive ? 'text-accent' : '')}>
                    {item.label}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {item.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 right-4 z-50 glass-card p-2"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-bg/80 backdrop-blur-sm">
            <div className="fixed top-16 left-4 right-4 glass-card p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onTabChange(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 hover:bg-surface/80',
                        isActive
                          ? 'bg-accent/20 border border-accent/30 text-accent'
                          : 'text-text-secondary hover:text-fg'
                      )}
                    >
                      <Icon className={cn('w-5 h-5', isActive ? 'text-accent' : '')} />
                      <div className="flex-1">
                        <div className={cn('font-medium', isActive ? 'text-accent' : '')}>
                          {item.label}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {item.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-30 glass-card border-t border-gray-700/50">
          <div className="flex justify-around py-2">
            {navigationItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200',
                    isActive
                      ? 'text-accent'
                      : 'text-text-secondary hover:text-fg'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

