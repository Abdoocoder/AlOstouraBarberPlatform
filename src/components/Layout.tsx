import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Scissors, Calendar, Image as ImageIcon, MapPin, Phone, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-brand-surface-container/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-brand-primary rounded-lg group-hover:rotate-12 transition-transform duration-300">
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
            className="px-6 py-2 bg-brand-primary text-brand-on-primary font-bold rounded-sm hover:scale-105 transition-transform active:scale-95"
          >
            احجز موعدك
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-brand-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-surface-container border-t border-brand-outline-variant p-6 flex flex-col gap-4 md:hidden"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold text-brand-on-surface hover:text-brand-primary transition-colors"
              >
                {item.name}
              </NavLink>
            ))}
            <Link 
              to="/booking"
              onClick={() => setIsOpen(false)}
              className="mt-2 w-full py-4 bg-brand-primary text-brand-on-primary text-center font-bold"
            >
              احجز موعدك
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-surface-container-lowest border-t border-brand-outline-variant py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Scissors className="text-brand-primary w-6 h-6 rotate-45" />
            <span className="text-2xl font-black text-brand-primary">الأســطــورة</span>
          </div>
          <p className="text-sm text-brand-on-surface-variant leading-relaxed">
            صالون الأسطورة يقدم لكم تجربة حلاقة ملكية تجمع بين الأصالة والحداثة على يد أمهر الحلاقين.
          </p>
          <div className="flex gap-4">
            {/* Social icons would go here */}
          </div>
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
              <span>شارع الملك فيصل، الحي الدبلوماسي، الرياض، المملكة العربية السعودية</span>
            </li>
            <li className="flex items-center gap-3 text-brand-on-surface-variant">
              <Phone className="w-5 h-5 text-brand-primary shrink-0" />
              <span>+966 50 000 0000</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-brand-outline-variant flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-on-surface-variant">
        <p>© {new Date().getFullYear()} صالون الأسطورة للرجال. جميع الحقوق محفوظة.</p>
        <p>تصميم وتطوير بواسطة الأسطورة ديجيتال</p>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
