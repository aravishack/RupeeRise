import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { RRCard } from '../../atoms';
import { CategoryCardHeader } from '../../molecules';
import { useAssetsStore, useLiabilitiesStore } from '../../../stores';
import { getTotalAssets, getTotalLiabilities, getNetWorth, getProjections } from '../../../stores/useFinancialStore';
import { formatIndianCurrency } from '../../../utils';

export function AIAnalysisCard() {
  const [copied, setCopied] = useState(false);
  
  // Get financial data
  const assets = useAssetsStore((state) => state.assets);
  const liabilities = useLiabilitiesStore((state) => state.liabilities);
  
  const generatePrompt = () => {
    const totalAssets = getTotalAssets();
    const totalLiabilities = getTotalLiabilities();
    const netWorth = getNetWorth();
    const projections = getProjections();
    
    // Format assets breakdown
    const assetsBreakdown = assets.map(asset => {
      const sipInfo = asset.monthlyContribution 
        ? ` + Monthly: ${formatIndianCurrency(asset.monthlyContribution)} for ${asset.sipDuration === 0 ? 'ongoing' : `${asset.sipDuration} years`}`
        : '';
      return `- ${asset.category}: ${formatIndianCurrency(asset.currentValue)} @ ${asset.growthRate}% growth${sipInfo}`;
    }).join('\n');
    
    // Format liabilities breakdown
    const liabilitiesBreakdown = liabilities.map(liability => {
      const emiInfo = liability.monthlyEMI 
        ? ` | EMI: ${formatIndianCurrency(liability.monthlyEMI)}`
        : '';
      return `- ${liability.type}: ${formatIndianCurrency(liability.amount)} @ ${liability.interestRate}% interest${emiInfo}`;
    }).join('\n');
    
    return `I need help analyzing my financial portfolio and getting personalized advice.

## My Financial Snapshot

**Net Worth:** ${formatIndianCurrency(netWorth)}
**Total Assets:** ${formatIndianCurrency(totalAssets)}
**Total Liabilities:** ${formatIndianCurrency(totalLiabilities)}

## Assets Breakdown
${assetsBreakdown || 'No assets tracked yet'}

## Liabilities Breakdown
${liabilitiesBreakdown || 'No liabilities tracked yet'}

## Wealth Projections (at current rates)
- 5 Years: ~${formatIndianCurrency(projections.year5)}
- 10 Years: ~${formatIndianCurrency(projections.year10)}
- 20 Years: ~${formatIndianCurrency(projections.year20)}
- 25 Years: ~${formatIndianCurrency(projections.year25)}
- 30 Years: ~${formatIndianCurrency(projections.year30)}

## What I Need

Please analyze my financial situation and provide:

1. **Asset Allocation Review**: Is my portfolio well-diversified? Should I rebalance?

2. **Risk Assessment**: Given my current allocation, what's my risk profile? Is it appropriate?

3. **Liability Management**: Should I prioritize paying off any debts? Which ones first?

4. **SIP Recommendations**: Am I investing enough regularly? Should I increase my monthly contributions?

5. **Tax Optimization**: Any suggestions for tax-saving investments (80C, NPS, etc.)?

6. **Goal Planning**: Based on my projections, what financial goals can I realistically achieve?

7. **Improvement Areas**: What are 3-5 concrete actions I should take to improve my financial health?

Please provide specific, actionable advice tailored to the Indian financial context.`;
  };
  
  const handleCopy = async () => {
    const prompt = generatePrompt();
    
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      
      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = prompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  return (
    <RRCard>
      <CategoryCardHeader
        title="AI Analysis"
        description="Get personalized insights and recommendations"
      />
      
      <div className="mt-4">
        <p className="text-sm text-gray-600 mb-4">
          Copy your financial data as a prompt and paste it into ChatGPT, Claude, or any AI assistant for personalized financial advice.
        </p>
        
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-rupee-green text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
        >
          {copied ? (
            <>
              <Check size={20} />
              Copied to Clipboard!
            </>
          ) : (
            <>
              <Copy size={20} />
              Copy AI Analysis Prompt
            </>
          )}
        </button>
        
        <p className="text-xs text-gray-500 mt-3 text-center">
          Tip: Your financial data stays private. Use with trusted AI assistants.
        </p>
      </div>
    </RRCard>
  );
}
