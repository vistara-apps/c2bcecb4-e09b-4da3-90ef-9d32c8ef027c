'use client';

import { useTheme } from '../components/ThemeProvider';
import { BadgeCard } from '../components/BadgeCard';
import { OpportunityCard } from '../components/OpportunityCard';
import { StakingInput } from '../components/StakingInput';
import { WalletConnector } from '../components/WalletConnector';
import { Award, Palette } from 'lucide-react';

const themes = [
  { id: 'default', name: 'Professional Finance', description: 'Navy & Gold theme for financial applications' },
  { id: 'celo', name: 'Celo', description: 'Black & Yellow theme' },
  { id: 'solana', name: 'Solana', description: 'Purple gradient theme' },
  { id: 'base', name: 'Base', description: 'Blue theme' },
  { id: 'coinbase', name: 'Coinbase', description: 'Navy blue theme' },
] as const;

const mockBadge = {
  id: '1',
  title: 'DeFi Pioneer',
  description: 'Completed over 100 DeFi transactions',
  type: 'defi' as const,
  score: 850,
  rarity: 'rare' as const,
};

const mockOpportunity = {
  id: '1',
  title: 'Base Summer Airdrop',
  description: 'Exclusive airdrop for early Base adopters',
  reward: '500 BASE tokens',
  requiredBadges: ['DeFi Pioneer'],
  applicants: 1247,
  maxApplicants: 5000,
  expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  postedBy: 'Base Protocol',
  applicationLink: '#',
  type: 'airdrop' as const,
};

export default function ThemePreview() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium mb-4">
            <Palette className="w-4 h-4" />
            Theme Preview
          </div>
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">RepVouch DAO</span> Themes
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Preview different theme variations for the RepVouch DAO platform.
          </p>
        </div>

        {/* Theme Selector */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-semibold text-fg mb-4">Select Theme</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                  theme === t.id
                    ? 'border-accent bg-accent/10'
                    : 'border-gray-700 hover:border-accent/50 hover:bg-surface/50'
                }`}
              >
                <div className="font-semibold text-fg mb-1">{t.name}</div>
                <div className="text-xs text-text-secondary">{t.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Component Previews */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-fg mb-4">Wallet Connector</h3>
              <WalletConnector />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-fg mb-4">Badge Card</h3>
              <BadgeCard badge={mockBadge} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-fg mb-4">Staking Input</h3>
              <StakingInput balance={1000} stakedAmount={250} />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-fg mb-4">Opportunity Card</h3>
              <OpportunityCard opportunity={mockOpportunity} variant="detailed" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-fg mb-4">Color Palette</h3>
              <div className="glass-card p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-bg rounded border"></div>
                      <span className="text-sm">Background</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-surface rounded border"></div>
                      <span className="text-sm">Surface</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-accent rounded"></div>
                      <span className="text-sm">Accent</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary rounded"></div>
                      <span className="text-sm">Primary</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-text-primary rounded border"></div>
                      <span className="text-sm">Text Primary</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-text-secondary rounded border"></div>
                      <span className="text-sm">Text Secondary</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-fg mb-4">Typography</h3>
              <div className="glass-card p-6 space-y-4">
                <div className="text-4xl font-bold gradient-text">Display Text</div>
                <div className="text-2xl font-semibold text-fg">Heading Text</div>
                <div className="text-base text-fg">Body text with normal weight and standard line height for readability.</div>
                <div className="text-sm font-medium text-text-secondary">Caption text for secondary information</div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="text-center mt-12">
          <a
            href="/"
            className="inline-flex items-center gap-2 btn-primary"
          >
            <Award className="w-4 h-4" />
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
