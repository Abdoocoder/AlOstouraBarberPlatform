import { useAuth, useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { Spinner } from './Spinner';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return <Spinner />;
  if (!isSignedIn) return <Navigate to="/sign-in" replace />;

  return <>{children}</>;
}

export function AdminRoute({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();

  if (!isLoaded || !isUserLoaded) return <Spinner />;
  if (!isSignedIn) return <Navigate to="/sign-in" replace />;

  const isAdmin = user?.publicMetadata?.isAdmin === true || user?.publicMetadata?.isAdmin === "true";
  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-6xl font-black mb-4">403</h1>
          <p className="text-xl text-brand-on-surface-variant mb-2">لا تملك صلاحية الوصول</p>
          <p className="text-brand-on-surface-variant">هذه الصفحة مخصصة للمشرفين فقط.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
