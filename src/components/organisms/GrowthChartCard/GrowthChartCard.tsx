import { RRCard } from '../../atoms';
import { formatCompact } from '../../../utils';

interface GrowthChartCardProps {
  currentValue: number;
  year5: number;
  year10: number;
  year20: number;
  year25: number;
  year30: number;
}

export function GrowthChartCard({ 
  currentValue,
  year5, 
  year10, 
  year20,
  year25,
  year30 
}: GrowthChartCardProps) {
  // Data points for the chart
  const dataPoints = [
    { year: 'Now', value: currentValue },
    { year: '5Y', value: year5 },
    { year: '10Y', value: year10 },
    { year: '20Y', value: year20 },
    { year: '25Y', value: year25 },
    { year: '30Y', value: year30 },
  ];

  // Find max value for scaling
  const maxValue = Math.max(currentValue, year5, year10, year20, year25, year30);
  const minValue = 0;

  // Chart dimensions
  const chartHeight = 200;
  const chartWidth = 600;
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const innerHeight = chartHeight - padding.top - padding.bottom;
  const innerWidth = chartWidth - padding.left - padding.right;

  // Scale function
  const scaleY = (value: number) => {
    const percentage = (value - minValue) / (maxValue - minValue);
    return innerHeight - (percentage * innerHeight);
  };

  // Generate SVG path for line
  const generatePath = () => {
    const points = dataPoints.map((point, index) => {
      const x = padding.left + (index / (dataPoints.length - 1)) * innerWidth;
      const y = scaleY(point.value) + padding.top;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
    return points;
  };

  // Generate area fill path
  const generateAreaPath = () => {
    const linePath = dataPoints.map((point, index) => {
      const x = padding.left + (index / (dataPoints.length - 1)) * innerWidth;
      const y = scaleY(point.value) + padding.top;
      return `${x} ${y}`;
    });
    
    const bottomLeft = `${padding.left} ${innerHeight + padding.top}`;
    const bottomRight = `${padding.left + innerWidth} ${innerHeight + padding.top}`;
    
    return `M ${bottomLeft} L ${linePath.join(' L ')} L ${bottomRight} Z`;
  };

  return (
    <RRCard>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Over Time</h3>
      
      <div className="relative" style={{ height: `${chartHeight}px` }}>
        <svg 
          width="100%" 
          height="100%" 
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          preserveAspectRatio="none"
          className="overflow-visible"
        >
          {/* Grid lines */}
          <line 
            x1={padding.left} 
            y1={padding.top + innerHeight / 2} 
            x2={padding.left + innerWidth} 
            y2={padding.top + innerHeight / 2}
            stroke="#e5e7eb" 
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          
          {/* Area fill */}
          <path
            d={generateAreaPath()}
            fill="url(#gradient)"
            opacity="0.2"
          />
          
          {/* Line */}
          <path
            d={generatePath()}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {dataPoints.map((point, index) => {
            const x = padding.left + (index / (dataPoints.length - 1)) * innerWidth;
            const y = scaleY(point.value) + padding.top;
            
            return (
              <g key={point.year}>
                {/* Point circle */}
                <circle
                  cx={x}
                  cy={y}
                  r="5"
                  fill="#10b981"
                  stroke="white"
                  strokeWidth="2"
                />
                
                {/* Year label */}
                <text
                  x={x}
                  y={chartHeight - 10}
                  textAnchor="middle"
                  className="text-xs fill-gray-600"
                >
                  {point.year}
                </text>
                
                {/* Value label on hover */}
                <title>{`${point.year}: ${formatCompact(point.value)}`}</title>
              </g>
            );
          })}
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-5 pr-2">
          <span className="text-xs text-gray-600">{formatCompact(maxValue)}</span>
          <span className="text-xs text-gray-600">{formatCompact(maxValue / 2)}</span>
          <span className="text-xs text-gray-600">₹0</span>
        </div>
      </div>
    </RRCard>
  );
}
