'use client';

interface ProgressBarProps {
  value: number;
  max: number;
  variant?: 'simple' | 'labeled';
  label?: string;
  color?: 'accent' | 'green' | 'blue' | 'purple';
}

const colorClasses = {
  accent: 'bg-accent',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
};

export function ProgressBar({ 
  value, 
  max, 
  variant = 'simple', 
  label,
  color = 'accent' 
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const colorClass = colorClasses[color];

  if (variant === 'simple') {
    return (
      <div className="w-full bg-surface rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${colorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-text-secondary">{label}</span>
          <span className="font-medium text-fg">
            {value.toLocaleString()} / {max.toLocaleString()}
          </span>
        </div>
      )}
      <div className="w-full bg-surface rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-300 ${colorClass} relative overflow-hidden`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
      </div>
      <div className="text-right text-xs text-text-secondary">
        {percentage.toFixed(1)}%
      </div>
    </div>
  );
}
