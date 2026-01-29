import { ReactNode } from 'react';
import type { DocumentStatus, Verdict } from '../../types';

interface BadgeProps {
  children: ReactNode;
  variant?: 'safe' | 'warning' | 'danger' | 'info' | 'success' | 'pending';
  className?: string;
}

export const Badge = ({ children, variant = 'info', className = '' }: BadgeProps) => {
  const variantClasses = {
    safe: 'bg-green-100 text-green-700 border-green-300',
    success: 'bg-green-100 text-green-700 border-green-300',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    danger: 'bg-red-100 text-red-700 border-red-300',
    info: 'bg-blue-100 text-blue-700 border-blue-300',
    pending: 'bg-gray-100 text-gray-700 border-gray-300',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const StatusBadge = ({ status }: { status: DocumentStatus }) => {
  const statusConfig: Record<DocumentStatus, { variant: BadgeProps['variant']; label: string }> = {
    pending: { variant: 'pending', label: 'Pending' },
    analyzing: { variant: 'info', label: 'Analyzing' },
    analyzed: { variant: 'success', label: 'Analyzed' },
    failed: { variant: 'danger', label: 'Failed' },
  };

  const config = statusConfig[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export const VerdictBadge = ({ verdict }: { verdict: Verdict }) => {
  const verdictConfig: Record<Verdict, { variant: BadgeProps['variant']; icon: string }> = {
    Safe: { variant: 'safe', icon: '✓' },
    'Medium Risk': { variant: 'warning', icon: '⚠' },
    Unsafe: { variant: 'danger', icon: '✕' },
  };

  const config = verdictConfig[verdict];

  return (
    <Badge variant={config.variant}>
      <span className="mr-1">{config.icon}</span>
      {verdict}
    </Badge>
  );
};
