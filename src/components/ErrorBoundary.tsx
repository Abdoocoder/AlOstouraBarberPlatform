import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ErrorBoundary({ children, fallback }: Props) {
  const [hasError, setHasError] = useState(false);

  const onError = useCallback(() => {
    setHasError(true);
  }, []);

  useEffect(() => {
    window.addEventListener('error', onError);
    return () => window.removeEventListener('error', onError);
  }, [onError]);

  if (hasError) {
    return fallback ?? (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-black mb-4">!</h1>
          <p className="text-xl text-brand-on-surface-variant mb-2">حدث خطأ غير متوقع</p>
          <p className="text-brand-on-surface-variant text-sm mb-8">
            برجاء تحديث الصفحة أو المحاولة مرة أخرى لاحقًا.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-brand-primary text-brand-on-primary font-black press-active"
          >
            تحديث الصفحة
          </button>
        </div>
      </div>
    );
  }

  return children;
}
