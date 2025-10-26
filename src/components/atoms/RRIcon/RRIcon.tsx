import type { LucideIcon } from 'lucide-react';
import { cn } from '../../../utils';

export interface RRIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  color?: string;
}

export function RRIcon({ 
  icon: Icon, 
  size = 20, 
  className,
  color 
}: RRIconProps) {
  return (
    <Icon 
      size={size} 
      className={cn(color && `text-${color}`, className)}
      strokeWidth={2}
    />
  );
}
