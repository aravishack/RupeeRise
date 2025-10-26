import { RRCard } from '../../atoms';
import { StatRow } from '../../molecules';
import { formatCompact } from '../../../utils';

interface ProjectionsCardProps {
  year5: number;
  year10: number;
  year20: number;
  year25: number;
  year30: number;
}

export function ProjectionsCard({ 
  year5, 
  year10, 
  year20,
  year25,
  year30
}: ProjectionsCardProps) {
  return (
    <RRCard>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Estimated Projections</h3>
      <div className="space-y-3">
        <StatRow label="5 Years" value={`~${formatCompact(year5)}`} />
        <StatRow label="10 Years" value={`~${formatCompact(year10)}`} />
        <StatRow label="20 Years" value={`~${formatCompact(year20)}`} />
        <StatRow label="25 Years" value={`~${formatCompact(year25)}`} />
        <StatRow label="30 Years" value={`~${formatCompact(year30)}`} />
      </div>
    </RRCard>
  );
}
