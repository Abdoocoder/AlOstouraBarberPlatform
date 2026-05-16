import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Scissors, Calendar, Image as ImageIcon, MapPin, Phone, Menu, X, ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const navItems = [
  { name: 'الرئيسية', path: '/' },
  { name: 'خدماتنا', path: '/services' },
  { name: 'المعرض', path: '/gallery' },
  { name: 'تواصل معنا', path: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-200 px-6 py-4 safe-area-top",
        scrolled ? "bg-brand-surface-container/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-brand-primary rounded-lg group-hover:rotate-12 transition-transform duration-200">
            <Scissors className="text-brand-on-primary w-6 h-6 rotate-45" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-brand-primary uppercase">الأســطــورة</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "text-sm font-bold transition-colors hover:text-brand-primary relative py-1",
                isActive ? "text-brand-primary" : "text-brand-on-surface"
              )}
            >
              {({ isActive }) => (
                <>
                  {item.name}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-primary"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <Link
            to="/booking"
            className="px-6 py-2 bg-brand-primary text-brand-on-primary font-bold rounded-sm press-active hover:scale-105"
          >
            احجز موعدك
          </Link>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link
              to="/sign-in"
              className="text-sm font-bold text-brand-on-surface hover:text-brand-primary transition-colors"
            >
              تسجيل الدخول
            </Link>
          </SignedOut>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-3 text-brand-primary press-active-sm"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-brand-surface/60 backdrop-blur-sm z-[-1] md:hidden"
            />
            <motion.div
              id="mobile-nav"
              role="navigation"
              aria-label="القائمة الرئيسية"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              onKeyDown={(e) => { if (e.key === 'Escape') setIsOpen(false); }}
              className="absolute top-full left-0 right-0 bg-brand-surface-container border-t border-brand-outline-variant p-8 flex flex-col gap-6 md:hidden shadow-2xl"
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => cn(
                      "text-2xl font-black transition-colors flex items-center justify-between group",
                      isActive ? "text-brand-primary" : "text-brand-on-surface hover:text-brand-primary"
                    )}
                  >
                    {item.name}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      className="h-px bg-brand-primary flex-grow mx-4 origin-right"
                    />
                    <ChevronLeft className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity rtl:rotate-180" />
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 + 0.1 }}
                className="pt-4 border-t border-brand-outline-variant/30"
              >
                <Link
                  to="/booking"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-5 bg-brand-primary text-brand-on-primary text-center font-black text-lg press-active shadow-[0_0_20px_rgba(242,202,80,0.2)] block"
                >
                  احجز موعدك الآن
                </Link>

                <div className="flex justify-center gap-8 mt-8">
                  <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                  </SignedIn>
                  <SignedOut>
                    <Link
                      to="/sign-in"
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-bold text-brand-on-surface hover:text-brand-primary transition-colors"
                    >
                      تسجيل الدخول
                    </Link>
                  </SignedOut>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-surface-container-lowest border-t border-brand-outline-variant py-16 px-6 safe-area-bottom">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Scissors className="text-brand-primary w-6 h-6 rotate-45" />
            <span className="text-2xl font-black text-brand-primary">الأســطــورة</span>
          </div>
          <p className="text-sm text-brand-on-surface-variant leading-relaxed">
            صالون الأسطورة يقدم لكم تجربة حلاقة ملكية تجمع بين الأصالة والحداثة على يد أمهر الحلاقين.
          </p>
          <a
            href="https://web.facebook.com/profile.php?id=100057146302329"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-on-surface-variant hover:text-brand-primary transition-colors"
          >
            تابعنا على فيسبوك
          </a>
        </div>
        <div>
          <h4 className="text-brand-primary font-black mb-6 uppercase tracking-wider">ساعات العمل</h4>
          <ul className="text-sm space-y-3 text-brand-on-surface-variant">
            <li className="flex justify-between">
              <span>السبت - الخميس</span>
              <span>10:00 ص - 11:00 م</span>
            </li>
            <li className="flex justify-between text-brand-primary font-bold">
              <span>الجمعة</span>
              <span>01:00 م - 11:00 م</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-brand-primary font-black mb-6 uppercase tracking-wider">روابط سريعة</h4>
          <ul className="text-sm space-y-3">
            {navItems.map(item => (
              <li key={item.path}>
                <Link to={item.path} className="text-brand-on-surface-variant hover:text-brand-primary transition-colors uppercase font-medium">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-brand-primary font-black mb-6 uppercase tracking-wider">تواصل معنا</h4>
          <ul className="text-sm space-y-4">
            <li className="flex items-start gap-3 text-brand-on-surface-variant">
              <MapPin className="w-5 h-5 text-brand-primary shrink-0" />
              <span>شارع جاوا، عمان، الأردن</span>
            </li>
            <li className="flex items-center gap-3 text-brand-on-surface-variant">
              <Phone className="w-5 h-5 text-brand-primary shrink-0" />
              <span>+962 78 063 4122</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-brand-outline-variant flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-on-surface-variant">
        <p>© {new Date().getFullYear()} صالون الأسطورة للرجال. جميع الحقوق محفوظة.</p>
        <p>تصميم وتطوير بواسطة <a href="https://www.abdoocoder.dev/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Abdoo Coder</a></p>
      </div>
    </footer>
  );
}

function SkipLink() {
  return (
    <a
      href="#main-content"
      className="fixed top-2 left-2 z-[200] -translate-y-full focus:translate-y-0 transition-transform bg-brand-primary text-brand-on-primary px-4 py-2 font-black text-sm rounded-sm"
    >
      تخطي إلى المحتوى
    </a>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <SkipLink />
      <Navbar />
      <main id="main-content" className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
