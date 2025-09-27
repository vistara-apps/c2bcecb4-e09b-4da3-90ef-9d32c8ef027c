'use client';

import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { MintBadge } from './components/MintBadge';
import { StakingInterface } from './components/StakingInterface';
import { OpportunityMarketplace } from './components/OpportunityMarketplace';
import { GovernancePanel } from './components/GovernancePanel';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'badges':
        return <MintBadge />;
      case 'staking':
        return <StakingInterface />;
      case 'opportunities':
        return <OpportunityMarketplace />;
      case 'governance':
        return <GovernancePanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Desktop Layout */}
      <div className="hidden md:flex">
        {/* Sidebar Navigation */}
        <div className="w-64 fixed left-0 top-0 h-full p-4">
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1">
          <div className="max-w-7xl mx-auto p-8">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="pb-20"> {/* Add padding for bottom navigation */}
          <div className="max-w-7xl mx-auto p-4">
            {renderContent()}
          </div>
        </div>

        {/* Mobile Navigation */}
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}

