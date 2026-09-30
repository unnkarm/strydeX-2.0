import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number, decimals: number = 0): string {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatAverage(runs: number, outs: number): string {
  if (outs <= 0) return runs > 0 ? `${runs}*` : '0.00';
  return (runs / outs).toFixed(2);
}

export function formatStrikeRate(runs: number, balls: number): string {
  if (balls <= 0) return '0.0';
  return ((runs / balls) * 100).toFixed(1);
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}
