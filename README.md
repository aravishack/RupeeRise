# 🪙 RupeeRise - Track Your Wealth, Plan Your Future

> Privacy-first net worth tracker for India. Track assets with SIP, manage loans with EMI, and see 30-year projections—all with AI-powered insights.

[![Made with ❤️ in India](https://img.shields.io/badge/Made%20with%20%E2%9D%A4%EF%B8%8F%20in-India-orange?style=flat-square)](https://github.com)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Privacy First](https://img.shields.io/badge/Privacy-First-green?style=flat-square&logo=shield)](https://github.com)

---

## 🎯 Features

### 💰 Asset Management
- **13 Asset Categories**: Cash, Indian Stocks, International Stocks, Company RSU, Mutual Funds, Real Estate, PPF, EPF, NPS, Fixed Deposits, Gold, Crypto, and Other
- **SIP Tracking**: Track monthly contributions (SIP/RD) with duration
  - Real-time preview of SIP returns
  - Supports ongoing contributions (duration = 0)
  - Combines lump sum + SIP projections
- **Auto-fill Growth Rates**: Default rates for each category
- **Inline Editing**: Add, edit, delete with smooth UX

### 💳 Liability Management
- **7 Liability Types**: Home Loan, Car Loan, Personal Loan, Education Loan, Credit Card, Business Loan, and Other
- **EMI Tracking**: Calculate payoff timeline from monthly EMI
  - Shows debt-free date
  - Displays remaining months/years
  - Progress tracking
- **Auto-fill Interest Rates**: Default rates for each type
- **Smart Validation**: Warns if EMI is too low to cover interest

### 📊 Financial Projections
- **30-Year Projections**: See wealth at 5, 10, 20, 25, and 30 years
- **Weighted Growth Rate**: Automatically calculated based on asset allocation
- **Compound Interest**: Uses FV = PV × (1 + r)^n formula
- **SIP Support**: Annuity Due formula for accurate SIP projections
- **Real-time Updates**: Recalculates on every change

### 📊 Visualizations
- **Net Worth Card**: Shows current net worth in lakhs/crores and words
- **Breakdown Card**: Assets vs Liabilities with debt ratio
- **Projections Card**: 5 timeframes with "~" for estimates
- **Growth Chart**: SVG line + area chart showing wealth trajectory
  - 6 data points (Now, 5Y, 10Y, 20Y, 25Y, 30Y)
  - Green gradient fill
  - Auto-scaling axes

### 🤖 AI-Powered Insights
- **Copy Prompt Button**: Generate personalized financial analysis prompt
- **Includes**: Full portfolio breakdown, projections, and specific questions
- **Use with**: ChatGPT, Claude, or any AI assistant
- **Privacy**: You control what to share

### 🔒 Privacy & Security
- **🔒 No Backend**: Everything runs in your browser
- **🔒 No Data Collection**: Zero telemetry or tracking
- **🔒 No Sign-up**: Start using immediately
- **🔒 Local Storage**: All data stays on your device
- **🔒 Open Source**: Transparent and auditable

### 🇮🇳 India-First
- **Indian Currency**: ₹ symbol throughout
- **Lakhs & Crores**: Proper Indian number formatting
- **Amount in Words**: "One Lakh Fifty Thousand Only"
- **Default Assets**: PPF, EPF, NPS with Indian rates
- **Realistic Rates**: Based on Indian market conditions

## 🚀 Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe code
- **Vite** - Lightning-fast build tool
- **Zustand** - Simple state management
- **Tailwind CSS** - Utility-first styling
- **Lucide Icons** - Beautiful icons

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📊 Projection Logic Explained

### Core Formulas

RupeeRise uses industry-standard financial formulas:

#### 1. **Lump Sum Growth** (Compound Interest)
```
FV = PV × (1 + r)^n

Where:
- FV = Future Value
- PV = Present Value (current amount)
- r = Growth rate (as decimal, e.g., 12% = 0.12)
- n = Number of years
```

#### 2. **SIP Growth** (Annuity Due)
```
FV = PMT × [((1 + r/12)^(n×12) - 1) / (r/12)] × (1 + r/12)

Where:
- PMT = Monthly contribution
- r = Annual return rate (as decimal)
- n = Number of years
- Uses Annuity Due (payments at beginning of month)
```

#### 3. **EMI Payoff** (Loan Amortization)
```
n = log(EMI / (EMI - P × r)) / log(1 + r)

Where:
- n = Months to payoff
- EMI = Monthly payment
- P = Outstanding principal
- r = Monthly interest rate = (annual % / 12 / 100)
```

### Step-by-Step Process

#### 1. Calculate Net Worth
```typescript
Net Worth = Total Assets - Total Liabilities

Example:
Assets: ₹15,00,000
Liabilities: ₹3,00,000
Net Worth: ₹12,00,000
```

#### 2. Calculate Weighted Average Growth Rate

Different assets grow at different rates. We calculate a weighted average:

```typescript
Weighted Growth = (Asset1_Value × Asset1_Rate + Asset2_Value × Asset2_Rate + ...) 
                  ÷ Total Assets

Example Portfolio:
- Cash: ₹1,000 @ 4% = 40
- PPF: ₹5,00,000 @ 7.1% = 35,500
- Stocks: ₹10,00,000 @ 12% = 1,20,000
─────────────────────────────────
Total: ₹15,01,000
Sum: 40 + 35,500 + 1,20,000 = 1,55,540

Weighted Average = 1,55,540 ÷ 15,01,000 = 10.36%
```

**Why weighted?** Larger assets have more impact on overall growth!

#### 3. Apply Compound Interest Formula

```typescript
// 5 Years
FV = ₹12,01,000 × (1.1036)^5 = ₹19,66,838

// 10 Years
FV = ₹12,01,000 × (1.1036)^10 = ₹32,22,183

// 20 Years
FV = ₹12,01,000 × (1.1036)^20 = ₹86,47,999

// 25 Years
FV = ₹12,01,000 × (1.1036)^25 = ₹1,41,61,191

// 30 Years
FV = ₹12,01,000 × (1.1036)^30 = ₹2,31,90,209
```

### The Power of Compound Interest 📈

```
Year 0:   ₹12,01,000   (1.0x)
Year 10:  ₹32,22,183   (2.7x)
Year 20:  ₹86,47,999   (7.2x)
Year 30:  ₹2,31,90,209 (19.3x)
```

**Your money grows exponentially, not linearly!**

### Why Asset Allocation Matters

**Scenario A: All Cash @ 4%**
```
30 Years: ₹12,01,000 × (1.04)^30 = ₹38,95,229
```

**Scenario B: All Stocks @ 12%**
```
30 Years: ₹12,01,000 × (1.12)^30 = ₹3,59,06,741
```

**Your Mixed Portfolio @ 10.36%**
```
30 Years: ₹12,01,000 × (1.1036)^30 = ₹2,31,90,209
```

**The difference is ₹3.2 Crores!** 🎯

### Important Assumptions ⚠️

1. ✅ Growth rates stay constant
2. ✅ No additional contributions
3. ✅ No withdrawals
4. ✅ Liabilities stay constant
5. ✅ Tax-free growth (no taxes modeled)

**Real life will differ, but this gives a solid baseline for planning!**

### Code Implementation

```typescript
// src/stores/useFinancialStore.ts
export const getProjection = (years: number, customGrowthRate?: number): number => {
  const assets = useAssetsStore.getState().assets;
  const netWorth = getNetWorth();
  
  if (netWorth <= 0) return 0;
  
  // Calculate weighted average growth rate
  const totalValue = assets.reduce((sum, a) => sum + a.currentValue, 0);
  
  if (totalValue === 0) return netWorth;
  
  const avgGrowthRate = customGrowthRate !== undefined 
    ? customGrowthRate
    : assets.reduce((sum, a) => sum + (a.growthRate * a.currentValue), 0) / totalValue;
  
  // Apply compound interest formula
  return netWorth * Math.pow(1 + avgGrowthRate / 100, years);
};
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── atoms/          # Basic building blocks (Button, Card, Input, etc.)
│   ├── molecules/      # Simple combinations (StatRow, CategoryCardHeader)
│   ├── organisms/      # Complex components (NetWorthCard, AssetsList, Charts)
│   └── index.ts
├── features/
│   ├── assets/         # Asset management
│   │   └── stores/
│   └── liabilities/    # Liability management
│       └── stores/
├── layouts/            # Page layouts (CategoryPanel, ResultsPanel)
├── stores/             # Global stores and calculations
│   ├── useFinancialStore.ts  # Financial calculations
│   └── index.ts
├── types/              # TypeScript types
├── utils/              # Utility functions
│   └── formatting/     # Currency and number formatting
└── App.tsx
```

## 🎨 Design System

### Atomic Design Principles

- **Atoms**: `RRButton`, `RRCard`, `RRInput`, `RRNumberInput`, `RRSelect`
- **Molecules**: `StatRow`, `CategoryCardHeader`
- **Organisms**: `NetWorthCard`, `ProjectionsCard`, `GrowthChartCard`, `AssetsList`
- **Templates**: Layout components

### Colors

- **Primary Green**: `#10b981` (Rupee Green)
- **Background**: `#f9fafb`
- **Text**: `#111827`, `#6b7280`

## 📈 Default Growth Rates

| Asset Type | Default Rate | Example |
|-----------|--------------|----------|
| Cash & Savings | 4% p.a. | Bank accounts |
| Indian Stocks | 12% p.a. | NSE/BSE, Nifty ETFs |
| International Stocks | 10% p.a. | S&P 500 |
| Company RSU | 15% p.a. | ESOPs |
| Mutual Funds | 14% p.a. | Equity funds |
| Real Estate | 6% p.a. | Property |
| PPF | 7.1% p.a. | Public Provident Fund |
| EPF | 8.25% p.a. | Employee Provident Fund |
| NPS | 10% p.a. | National Pension System |
| Fixed Deposits | 6.5% p.a. | FD, Bonds |
| Gold | 8% p.a. | Physical/Digital |
| Crypto | 15% p.a. | Bitcoin, Ethereum |
| Other Assets | 5% p.a. | Vehicles, Jewelry |

## 💳 Default Interest Rates (Liabilities)

| Liability Type | Default Rate | Typical Use |
|---------------|--------------|-------------|
| Home Loan | 8.5% p.a. | Housing loan |
| Car Loan | 10% p.a. | Vehicle loan |
| Personal Loan | 13.5% p.a. | Unsecured loan |
| Education Loan | 10% p.a. | Student loan |
| Credit Card | 39% p.a. | Revolving credit |
| Business Loan | 12.5% p.a. | Business finance |
| Other Debt | 12% p.a. | Misc. obligations |

## 🔒 Privacy & Security

- ✅ **No Backend** - Everything runs in your browser
- ✅ **No Data Collection** - We don't store or transmit your data
- ✅ **No Analytics** - Your financial data stays private
- ✅ **Client-Side Only** - Zustand stores in memory
- ⚠️ **Data Resets** - Data clears on page refresh (MVP)

## 🛞️ Roadmap

### ✅ Completed (MVP)
- [x] Asset management with 13 categories
- [x] Liability tracking with 7 types
- [x] SIP/monthly contributions tracking
- [x] EMI/loan payoff calculator
- [x] 30-year wealth projections
- [x] Growth visualization charts
- [x] AI-powered insights (copy prompt)
- [x] Indian currency formatting
- [x] Real-time calculations
- [x] Responsive design
- [x] SEO optimization

### 🔜 High Priority (Next)
- [ ] LocalStorage persistence
- [ ] Import/Export data (JSON/CSV)
- [ ] Dark mode
- [ ] Mobile app (PWA)

### 📈 Medium Priority
- [ ] Goal tracking & planning
- [ ] Tax calculations (80C, NPS, etc.)
- [ ] Historical net worth tracking
- [ ] Multiple portfolios/accounts
- [ ] Step-up SIP support
- [ ] Loan prepayment calculator

### ✨ Nice to Have
- [ ] PDF report generation
- [ ] Portfolio rebalancing suggestions
- [ ] Real-time market data integration
- [ ] Social sharing (anonymized)
- [ ] Comparison with benchmarks

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/aravishack/RupeeRise.git
cd RupeeRise

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

## 📸 Screenshots

### Dashboard
![Net Worth Dashboard](docs/screenshots/dashboard.png)

### Asset Management with SIP
![Assets with SIP Tracking](docs/screenshots/assets-sip.png)

### Liability Tracking with EMI
![Liabilities with EMI](docs/screenshots/liabilities-emi.png)

### 30-Year Projections
![Wealth Projections](docs/screenshots/projections.png)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Keep components small and reusable
- Add comments for complex logic
- Test calculations thoroughly

## ⚠️ Disclaimer

**This tool is for educational and planning purposes only.**

- Not financial advice
- Projections are estimates, not guarantees
- Past performance doesn't indicate future results
- Consult a certified financial advisor for important decisions
- Default rates are approximations based on Indian market conditions

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

See [LICENSE](LICENSE) file for details.

## 📞 Support

Found a bug or have a feature request?

- 🐛 **Report bugs**: [GitHub Issues](https://github.com/aravishack/RupeeRise/issues)
- 💡 **Request features**: [GitHub Discussions](https://github.com/aravishack/RupeeRise/discussions)
- ⭐ **Star the repo**: If you find this useful!

---

<div align="center">

### Built with ❤️ in India for Indian investors

**Track Your Wealth, Plan Your Future** 🪙

[Website](https://myrupeerise.netlify.app/) • [Documentation](docs/) • [Changelog](CHANGELOG.md)

</div>
