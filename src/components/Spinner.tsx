import * as React from 'react';
import { cn } from '../lib/utils';

export function Spinner({ className, size = 'md', label = 'جاري التحميل' }: { className?: string; size?: 'sm' | 'md' | 'lg'; label?: string }) {
  const sizeClass = size === 'sm' ? 'w-5 h-5 border-2' : size === 'lg' ? 'w-12 h-12 border-4' : 'w-8 h-8 border-4';
  return (
    <div className={cn("min-h-[80vh] flex items-center justify-center", className)} role="status" aria-label={label}>
      <div className={cn(sizeClass, "border-brand-primary border-t-transparent rounded-full animate-spin")} />
    </div>
  );
}
