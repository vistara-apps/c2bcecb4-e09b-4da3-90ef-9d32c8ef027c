# RepVouch DAO - Web3 Reputation Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC)](https://tailwindcss.com/)
[![Base](https://img.shields.io/badge/Base-Mini_App-0052FF)](https://base.org/)

RepVouch DAO is a decentralized application that helps Web3 users transform their on-chain activity into verifiable reputation badges (NFTs) and discover opportunities that match their verified credentials.

## 🌟 Features

### Core Functionality
- **On-Chain Activity Aggregation**: Automatically scan and aggregate transaction history across multiple EVM-compatible blockchains
- **AI-Powered Reputation Scoring**: Generate holistic reputation scores based on DeFi participation, NFT collecting, governance involvement, and early adoption
- **Verifiable Credential Minting**: Mint reputation scores and achievements as non-transferable NFTs (vouch tokens)
- **Opportunity Discovery Engine**: Curated marketplace of airdrops, beta programs, bounties, and exclusive dApps
- **DAO Governance & Staking**: Stake $RVCH tokens to participate in governance and earn rewards

### Technical Features
- **Multi-Chain Support**: Ethereum, Base, Polygon, Arbitrum, and Optimism
- **Base Mini App Integration**: Seamless integration with Base Wallet
- **IPFS/Arweave Storage**: Decentralized storage for NFT metadata
- **Real-time Analytics**: Live reputation scoring and opportunity matching
- **Mobile-Responsive**: Optimized for both desktop and mobile experiences

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- A Web3 wallet (MetaMask, Coinbase Wallet, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vistara-apps/c2bcecb4-e09b-4da3-90ef-9d32c8ef027c.git
   cd repvouch-dao
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your API keys:
   ```env
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
   ETHERSCAN_API_KEY=your_etherscan_api_key
   BASESCAN_API_KEY=your_basescan_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Web3**: Wagmi, Viem, OnchainKit
- **Backend**: Next.js API Routes
- **Storage**: IPFS, Arweave
- **Deployment**: Vercel (recommended)

### Project Structure
```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── reputation/    # Reputation analysis
│   │   ├── transactions/  # Transaction fetching
│   │   ├── nft/          # NFT minting
│   │   └── staking/      # Staking operations
│   ├── components/        # React components
│   ├── lib/              # Utilities and types
│   └── providers/        # Web3 providers
├── components/            # Shared components
│   ├── ui/               # Base UI components
│   └── [Component].tsx   # Feature components
├── lib/                  # Core utilities
│   ├── blockchain.ts     # Web3 interactions
│   ├── reputation.ts     # Scoring algorithms
│   ├── contracts.ts      # Smart contract ABIs
│   ├── constants.ts      # App constants
│   └── types.ts          # TypeScript definitions
└── public/               # Static assets
```

## 🎯 User Flows

### 1. Onboarding & Reputation Analysis
1. User connects their Base Wallet
2. App requests authorization to scan on-chain activity
3. Displays aggregated activity and calculated reputation score
4. User reviews and selects achievements to highlight
5. Mints reputation as NFT (pays gas fees)

### 2. Opportunity Discovery
1. User browses the opportunity marketplace
2. App filters opportunities based on user's NFT badges
3. User applies to matching opportunities
4. External redirect or in-frame application process

### 3. DAO Participation
1. User stakes $RVCH tokens via staking interface
2. Participates in governance by voting on proposals
3. Earns rewards from staking and successful proposals

## 🔧 Configuration

### Environment Variables
See `.env.example` for all required environment variables.

### Supported Chains
- **Ethereum Mainnet**: Transaction history and NFT verification
- **Base**: Primary chain for the mini app
- **Polygon**: Additional DeFi activity tracking
- **Arbitrum**: Layer 2 transaction analysis
- **Optimism**: Governance and DeFi participation

### API Endpoints
- `GET /api/transactions/[address]` - Fetch user transactions
- `POST /api/reputation/analyze` - Analyze reputation score
- `POST /api/nft/mint` - Mint reputation NFT
- `POST /api/staking/stake` - Stake tokens
- `POST /api/staking/unstake` - Unstake tokens
- `GET /api/governance/proposals` - Fetch governance proposals

## 🎨 Design System

### Color Palette
- **Background**: `hsl(220, 30%, 8%)`
- **Foreground**: `hsl(220, 20%, 95%)`
- **Accent**: `hsl(45, 100%, 50%)`
- **Primary**: `hsl(220, 50%, 50%)`
- **Surface**: `hsl(220, 25%, 12%)`

### Typography
- **Display**: 4xl font-bold (Hero text)
- **Heading**: 2xl font-semibold (Section headers)
- **Body**: base font-normal (Main content)
- **Caption**: sm font-medium (Labels and metadata)

### Components
- **WalletConnector**: Wallet connection interface
- **BadgeCard**: NFT badge display component
- **OpportunityCard**: Opportunity listing component
- **ProgressBar**: Reputation progress visualization
- **StakingInterface**: Token staking controls

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm run start
```

### Base Mini App Configuration
1. Register your app in the Base Mini App registry
2. Configure the mini app manifest
3. Test integration with Base Wallet

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

### Development Guidelines
- Use TypeScript for all new code
- Follow the existing component patterns
- Add proper error handling
- Write meaningful commit messages
- Test on multiple devices and wallets

## 📊 Analytics & Monitoring

### Performance Metrics
- Page load times
- Transaction success rates
- User engagement metrics
- Reputation score distributions

### Error Tracking
- API failure monitoring
- Wallet connection issues
- Transaction failures
- Smart contract errors

## 🔒 Security

### Smart Contract Security
- All contracts audited by certified security firms
- Multi-signature governance for critical updates
- Timelock mechanisms for sensitive operations

### User Data Protection
- No personal data stored off-chain
- All reputation data verifiable on-chain
- User-controlled data access and deletion

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Base](https://base.org/) for the mini app infrastructure
- [OnchainKit](https://onchainkit.xyz/) for Web3 components
- [Coinbase Wallet](https://wallet.coinbase.com/) for wallet integration
- The Web3 community for inspiration and support

## 📞 Support

- **Documentation**: [docs.repvouch.io](https://docs.repvouch.io)
- **Discord**: [Join our community](https://discord.gg/repvouch)
- **Twitter**: [@RepVouchDAO](https://twitter.com/RepVouchDAO)
- **GitHub Issues**: [Report bugs](https://github.com/vistara-apps/repvouch-dao/issues)

---

Built with ❤️ for the Web3 community

