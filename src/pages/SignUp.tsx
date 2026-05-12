import { SignUp as ClerkSignUp } from '@clerk/clerk-react';
import { usePageTitle } from '../lib/usePageTitle';

export default function SignUp() {
  usePageTitle('إنشاء حساب');
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <ClerkSignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
    </div>
  );
}
