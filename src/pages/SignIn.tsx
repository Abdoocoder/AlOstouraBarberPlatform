import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import { usePageTitle } from '../lib/usePageTitle';

export default function SignIn() {
  usePageTitle('تسجيل الدخول');
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <ClerkSignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
    </div>
  );
}
