import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X } from 'lucide-react';
import { usePageTitle } from '../lib/usePageTitle';

const galleryItems = [
  { id: '1', title: 'تدريج ملكي', category: 'حلاقة', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=800' },
  { id: '2', title: 'تصفيف كلاسيكي', category: 'شعر', url: 'https://images.unsplash.com/photo-1516470930795-6ba2564824aa?auto=format&fit=crop&q=80&w=800' },
  { id: '3', title: 'عناية باللحية', category: 'لحية', url: 'https://images.unsplash.com/photo-1589985494639-69e60c82cab2?auto=format&fit=crop&q=80&w=800' },
  { id: '4', title: 'مساج وتنظيف', category: 'سبا', url: 'https://images.unsplash.com/photo-1699521648408-4df72c99acb8?auto=format&fit=crop&q=80&w=800' },
  { id: '5', title: 'رسم بالموس', category: 'فن', url: 'https://images.unsplash.com/photo-1532710093739-9470acff878f?auto=format&fit=crop&q=80&w=800' },
  { id: '6', title: 'تنعيم ليزر', category: 'تقنية', url: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=800' },
];

export default function Gallery() {
  usePageTitle('المعرض');
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const lightboxRef = React.useRef<HTMLDivElement>(null);

  const selectedItem = galleryItems.find(item => item.id === selectedId);

  React.useEffect(() => {
    if (!selectedId) return;
    const el = lightboxRef.current;
    if (!el) return;
    const closeBtn = el.querySelector<HTMLButtonElement>('button[aria-label="إغلاق المعرض"]');
    closeBtn?.focus();

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedId(null);
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = el.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedId]);

  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-brand-primary font-black uppercase tracking-widest text-sm mb-4">معرض الأعمال</h2>
            <h1 className="text-4xl md:text-6xl font-black italic">نـطـق الـإبــداع</h1>
          </div>
          <p className="max-w-md text-brand-on-surface-variant text-lg">
            شاهد نتائج خدماتنا وتصاميمنا الحصرية التي تعكس مهارة فريقنا في صالون الأسطورة.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <motion.div
              layoutId={item.id}
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedId(item.id); } }}
              role="button"
              tabIndex={0}
              className="relative aspect-square group overflow-hidden cursor-pointer bg-brand-surface-container"
            >
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover grayscale transition-[transform,filter] duration-700 group-hover:grayscale-0 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-surface-dim/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-300 translate-y-4 group-hover:translate-y-0">
                <span className="text-brand-primary font-bold text-sm uppercase tracking-widest mb-1 block">{item.category}</span>
                <h3 className="text-white text-2xl font-black">{item.title}</h3>
              </div>
              <div className="absolute top-6 left-6 p-2 bg-brand-primary text-brand-on-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={18} aria-label="تكبير الصورة" />
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedId && selectedItem && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10" role="dialog" aria-modal="true" aria-label="معرض الصور">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-brand-surface/95 backdrop-blur-sm"
              />
              <motion.div
                layoutId={selectedId}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                ref={lightboxRef}
                className="relative z-10 max-w-5xl w-full bg-brand-surface shadow-2xl rounded-sm max-h-[90vh] overflow-y-auto"
              >
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 z-20 p-3 bg-brand-surface/50 text-white hover:bg-brand-primary hover:text-brand-on-primary transition-colors"
                  aria-label="إغلاق المعرض"
                >
                  <X />
                </button>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/3 aspect-[4/5] md:aspect-auto h-[50vh] md:h-[80vh]">
                    <img src={selectedItem.url} alt={selectedItem.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="md:w-1/3 p-6 md:p-10 flex flex-col justify-center">
                    <span className="text-brand-primary font-black uppercase tracking-widest text-sm mb-2">{selectedItem.category}</span>
                    <h2 className="text-4xl font-black mb-6">{selectedItem.title}</h2>
                    <p className="text-brand-on-surface-variant leading-relaxed text-lg mb-8">
                       هذه اللقطة تمثل التزامنا بأعلى معايير الجودة والحداثة. كل عميل لدينا يحصل على اهتمامنا الكامل ليخرج بصورة أسطورية.
                    </p>
                    <button 
                      onClick={() => setSelectedId(null)}
                      className="w-full py-4 bg-brand-primary text-brand-on-primary font-bold press-active"
                    >
                      إغلاق المعرض
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
