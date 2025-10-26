import type { ReactNode } from 'react';

interface CategoryCardHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function CategoryCardHeader({ title, description, action }: CategoryCardHeaderProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {action}
      </div>
      {description && (
        <p className="text-gray-500 text-sm">{description}</p>
      )}
    </div>
  );
}
