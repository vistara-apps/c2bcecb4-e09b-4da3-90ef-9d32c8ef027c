'use client';

import { useState } from 'react';
import { Home, Award, Search, Vote, Menu, X } from 'lucide-react';
import { WalletConnector } from './WalletConnector';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Award, label: 'Badges', href: '/badges' },
  { icon: Search, label: 'Opportunities', href: '/opportunities' },
  { icon: Vote, label: 'Governance', href: '/governance' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-surface/80 backdrop-blur-sm border-b border-gray-700/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-accent to-yellow-500 rounded-lg flex items-center justify-center">
            <Award className="w-5 h-5 text-black" />
          </div>
          <span className="font-bold text-lg gradient-text">RepVouch</span>
        </div>
        
        <div className="flex items-center gap-2">
          <WalletConnector variant="compact" />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-bg/95 backdrop-blur-sm">
          <div className="p-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-yellow-500 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-black" />
                </div>
                <span className="font-bold text-lg gradient-text">RepVouch</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-surface rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-4 hover:bg-surface rounded-lg transition-colors"
                >
                  <item.icon className="w-5 h-5 text-accent" />
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-surface/80 lg:backdrop-blur-sm lg:border-r lg:border-gray-700/50">
        <div className="flex items-center gap-3 p-6 border-b border-gray-700/50">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-yellow-500 rounded-lg flex items-center justify-center">
            <Award className="w-6 h-6 text-black" />
          </div>
          <div>
            <div className="font-bold text-lg gradient-text">RepVouch</div>
            <div className="text-xs text-text-secondary">DAO Platform</div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 p-3 hover:bg-surface rounded-lg transition-colors group"
            >
              <item.icon className="w-5 h-5 text-accent group-hover:text-yellow-400 transition-colors" />
              <span className="font-medium group-hover:text-fg transition-colors">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700/50">
          <WalletConnector />
        </div>
      </div>
    </>
  );
}
