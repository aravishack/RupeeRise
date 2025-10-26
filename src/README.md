# RupeeRise Frontend - Source Code Structure

This document describes the organization and structure of the RupeeRise frontend codebase.

## 🎯 Project Overview

**RupeeRise** is a privacy-first financial planning tool for India. Built with React 19 RC, TypeScript, Vite, and Tailwind CSS 4.

**Key Features:**
- Track assets, liabilities, and net worth
- Visualize financial projections (5Y, 10Y, 20Y)
- Explore What-If scenarios
- AI-powered insights (Beta)
- 100% client-side - No backend, complete privacy

---

## 📁 Folder Structure

```
src/
├── components/          # Reusable UI components (Atomic Design)
│   ├── atoms/          # Basic building blocks
│   │   ├── Button/     # Button component (primary, secondary, outline, ghost, danger)
│   │   ├── Card/       # Card container with padding/shadow variants
│   │   └── Badge/      # Badge/label component (beta, status indicators)
│   │
│   ├── molecules/      # Simple combinations of atoms
│   │   ├── CategoryCardHeader/  # Header for category cards
│   │   ├── StatRow/            # Label + Value row (for projections)
│   │   └── ProgressItem/       # Label + Value + Progress bar
│   │
│   └── organisms/      # Complex, feature-rich components
│       ├── NetWorthCard/       # Net worth display with gradient
│       ├── ProjectionsCard/    # 5Y/10Y/20Y projections
│       ├── GrowthChartCard/    # Placeholder for growth chart
│       └── BreakdownCard/      # Assets vs Liabilities breakdown
│
├── layouts/            # Page layout components
│   ├── Header.tsx             # App header with logo
│   ├── CategoryPanel.tsx      # Left sidebar (8 cols) - Assets/Liabilities/Scenarios
│   ├── ResultsPanel.tsx       # Right panel (4 cols) - Net worth/Projections
│   ├── MainLayout.tsx         # 12-col grid layout
│   └── index.ts
│
├── features/           # Feature-specific modules
│   └── assets/
│       └── stores/     # Zustand stores
│           └── assetStore.ts  # Asset state management
│
├── utils/             # Utility functions
│   ├── calculations/  # Financial calculations (FV, projections, ratios)
│   ├── formatting/    # Indian currency formatting (₹, Lakhs, Crores)
│   └── index.ts       # cn() utility for Tailwind class merging
│
├── types/             # TypeScript type definitions
│   └── index.ts       # Asset, Liability, Scenario types
│
├── constants/         # App-wide constants
│   └── index.ts       # Asset categories, liability types, app info
│
├── assets/            # Static assets
│   ├── logo.png       # RupeeRise logo
│   └── favicon.ico    # Favicon
│
├── App.tsx            # Main application component
├── App.css            # App-specific styles
├── main.tsx           # Application entry point
└── index.css          # Global styles (Tailwind CSS 4)
```

---

## 🎯 Design Principles

### 1. **Atomic Design**

Components are organized in three levels:

- **Atoms**: Basic building blocks (Button, Card, Badge)
- **Molecules**: Simple combinations (CategoryCardHeader, StatRow, ProgressItem)
- **Organisms**: Complex components (NetWorthCard, ProjectionsCard, BreakdownCard)

### 2. **Feature-Based Architecture**

Each feature (assets, liabilities, scenarios) has its own:
- Components (UI specific to that feature)
- Hooks (Custom logic)
- Stores (State management with Zustand)

### 3. **Privacy-First**

- All data stored in browser localStorage
- No backend API calls
- No user authentication
- No data leaves the device

---

## 🎨 UI/UX Approach: Inline Editable Rows

### Concept

Assets, Liabilities, and Scenarios use **inline editable rows** for quick data entry:

```
EMPTY STATE:
┌─────────────────────────────────────────────┐
│ Assets                      [+ Add Asset]   │
├─────────────────────────────────────────────┤
│ No assets added yet                          │
└─────────────────────────────────────────────┘

ADD MODE (Click "+ Add Asset"):
┌─────────────────────────────────────────────┐
│ [Name ▼] [₹ Amount] [% Rate] [Save] [Cancel]│
└─────────────────────────────────────────────┘

VIEW MODE (After save):
┌─────────────────────────────────────────────┐
│ 💰 PPF Account                               │
│    ₹5,00,000 • 7.1% growth  [Edit] [Delete] │
└─────────────────────────────────────────────┘

EDIT MODE (Click "Edit"):
┌─────────────────────────────────────────────┐
│ [PPF Account ▼] [5,00,000] [7.1] [Save] [Cancel] │
└─────────────────────────────────────────────┘
```

### Interaction Flow

1. Click **[+ Add Asset]** → New row appears in edit mode
2. Fill: **Name** (dropdown), **Amount**, **Growth Rate**
3. Click **[Save]** → Row switches to view mode
4. OR Click **[Cancel]** → Row disappears
5. In view mode: **[Edit]** to modify, **[Delete]** to remove

### Benefits

- ✅ **Fast data entry** - No modal popups
- ✅ **Spreadsheet-like** - Familiar to finance users
- ✅ **Real-time updates** - See net worth change instantly
- ✅ **Space efficient** - Everything in one view

---

## 📊 Component Structure

### Current Components

#### **Atoms** (3)
- `Button` - Primary, secondary, outline, ghost, danger variants
- `Card` - Container with padding/shadow options
- `Badge` - Labels and status indicators

#### **Molecules** (3)
- `CategoryCardHeader` - Title + Description + Action button
- `StatRow` - Label + Value display (used in projections)
- `ProgressItem` - Label + Value + Progress bar (used in breakdown)

#### **Organisms** (4)
- `NetWorthCard` - Displays total net worth with monthly change
- `ProjectionsCard` - Shows 5Y/10Y/20Y projections
- `GrowthChartCard` - Placeholder for growth visualization
- `BreakdownCard` - Assets vs Liabilities with progress bars

#### **Layouts** (4)
- `Header` - App logo and branding
- `CategoryPanel` - Left sidebar (8 cols) with Assets/Liabilities/Scenarios
- `ResultsPanel` - Right panel (4 cols) with Net Worth/Projections/Breakdown
- `MainLayout` - 12-column grid container

---

## 🛠️ Tech Stack

### Core
- **React 19 RC** - Latest React with new features
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS 4** - Utility-first CSS with new features

### State Management
- **Zustand** - Lightweight state management
- **localStorage** - Persistent storage

### Form Handling
- **react-hook-form** - Form state management
- **zod** - Schema validation
- **@hookform/resolvers** - Form validators

### Utilities
- **date-fns** - Date manipulation
- **lucide-react** - Icon library
- **clsx** / **tailwind-merge** - Conditional class names
- **class-variance-authority** - Variant-based styling

---

## 🚀 Next Steps

### Phase 1: Inline Editable Rows (Current)
1. Create Input atoms (TextInput, NumberInput, Select)
2. Create IconButton atom (Edit, Delete, Save, Cancel)
3. Create EditableRow molecule
4. Create AssetRow, LiabilityRow, ScenarioRow molecules
5. Create AssetsList, LiabilitiesList organisms
6. Connect to Zustand stores

### Phase 2: Calculations & Projections
1. Implement net worth calculation
2. Build projection algorithms (5Y/10Y/20Y)
3. Calculate debt ratio and other metrics
4. Real-time updates as data changes

### Phase 3: Visualizations
1. Integrate chart library (Chart.js or Recharts)
2. Build GrowthChart component
3. Add asset allocation pie chart
4. Add scenario comparison charts

### Phase 4: What-If Scenarios
1. Create scenario builder UI
2. Implement scenario calculations
3. Show scenario comparison
4. Allow scenario export/import

### Phase 5: AI Analysis (Beta)
1. Integrate AI analysis API (optional)
2. Generate insights based on data
3. Provide recommendations
4. Risk assessment

---

## 💾 Data Structure

### Asset
```typescript
interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  currentValue: number;
  growthRate: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Liability
```typescript
interface Liability {
  id: string;
  name: string;
  type: LiabilityType;
  principal: number;
  interestRate: number;
  monthlyEMI?: number;
  remainingTenure?: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Scenario
```typescript
interface Scenario {
  id: string;
  name: string;
  description?: string;
  type: 'income' | 'expense' | 'investment' | 'debt';
  amount: number;
  startDate: Date;
  endDate?: Date;
  frequency: 'one-time' | 'monthly' | 'annually';
  createdAt: Date;
}
```

---

## 🎨 Design Tokens

### Colors
- **Primary (Rupee Green)**: `#27ae60`
- **Secondary (Rise Orange)**: `#e67e22`
- **Success**: `#27ae60`
- **Danger**: `#e74c3c`
- **Warning**: `#f39c12`
- **Info**: `#3498db`

### Typography
- **Font**: Inter (from Google Fonts)
- **Sizes**: 12px, 14px, 16px, 20px, 24px, 32px
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)

### Spacing
- **Base unit**: 4px
- **Scale**: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

---

## 📝 Naming Conventions

### Files & Folders
- Components: PascalCase (e.g., `Button.tsx`, `CategoryPanel.tsx`)
- Utilities: camelCase (e.g., `formatCurrency.ts`)
- Hooks: camelCase with `use` prefix (e.g., `useAssets.ts`)
- Types: PascalCase (e.g., `Asset.ts`)

### Components
- Functional components with named exports
- One component per file
- Index file for barrel exports

### CSS
- Tailwind utility classes (preferred)
- Custom CSS variables in `:root` (for theming)
- BEM naming for custom CSS (if needed)

---

## 🧪 Testing Strategy

### Unit Tests
- Test utility functions (calculations, formatting)
- Test Zustand stores
- Test individual components

### Integration Tests
- Test form submission flows
- Test data persistence
- Test calculation accuracy

### E2E Tests
- Test complete user journeys
- Test across different browsers
- Test responsive layouts

---

## 📚 Resources

### Documentation
- [React 19 Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS 4 Docs](https://tailwindcss.com/docs)
- [Zustand Docs](https://github.com/pmndrs/zustand)

### Design Inspiration
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
- [Component Driven Development](https://www.componentdriven.org/)

---

**Last Updated**: 2025-10-23
**Version**: 0.1.0
**Status**: 🚧 In Development
