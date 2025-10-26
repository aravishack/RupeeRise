import { formatCompact, formatAmountInWords } from '../../../utils';

interface NetWorthCardProps {
  netWorth: number;
}

export function NetWorthCard({ netWorth }: NetWorthCardProps) {
  return (
    <div className="bg-gradient-to-br from-rupee-green to-green-600 rounded-lg shadow-lg p-6 text-white">
      <h3 className="text-sm font-medium opacity-90 mb-1">Your Net Worth</h3>
      <p className="text-4xl font-bold mb-2">{formatCompact(netWorth)}</p>
      <p className="text-xs opacity-80">{formatAmountInWords(netWorth)}</p>
    </div>
  );
}
