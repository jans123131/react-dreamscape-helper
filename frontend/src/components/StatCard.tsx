
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  className,
}) => {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.02]",
      "glass-card",
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-2xl font-semibold tracking-tight">{value}</h3>
              {change && (
                <span 
                  className={cn(
                    "text-xs font-medium",
                    change.type === 'increase' ? 'text-green-500' : 'text-red-500'
                  )}
                >
                  {change.type === 'increase' ? '+' : ''}{change.value}%
                </span>
              )}
            </div>
          </div>
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
