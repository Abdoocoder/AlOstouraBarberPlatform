import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X } from 'lucide-react';

const galleryItems = [
  { id: '1', title: 'تدريج ملكي', category: 'حلاقة', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=800' },
  { id: '2', title: 'تصفيف كلاسيكي', category: 'شعر', url: 'https://images.unsplash.com/photo-1593702295094-1125d9799ff2?auto=format&fit=crop&q=80&w=800' },
  { id: '3', title: 'عناية باللحية', category: 'لحية', url: 'https://images.unsplash.com/photo-1621605815841-aa887ad41202?auto=format&fit=crop&q=80&w=800' },
  { id: '4', title: 'مساج وتنظيف', category: 'سبا', url: 'https://images.unsplash.com/photo-1622312230147-f6d1136bc7ad?auto=format&fit=crop&q=80&w=800' },
  { id: '5', title: 'رسم بالموس', category: 'فن', url: 'https://images.unsplash.com/photo-1532710093739-9470acff878f?auto=format&fit=crop&q=80&w=800' },
  { id: '6', title: 'تنعيم ليزر', category: 'تقنية', url: 'https://images.unsplash.com/photo-1621605815841-aa887ad41202?auto=format&fit=crop&q=80&w=800' },
];

export default function Gallery() {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const selectedItem = galleryItems.find(item => item.id === selectedId);

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
              className="relative aspect-square group overflow-hidden cursor-pointer bg-brand-surface-container"
            >
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <span className="text-brand-primary font-bold text-xs uppercase tracking-widest mb-1 block">{item.category}</span>
                <h3 className="text-white text-2xl font-black">{item.title}</h3>
              </div>
              <div className="absolute top-6 left-6 p-2 bg-brand-primary text-brand-on-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                <Maximize2 size={18} />
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedId && selectedItem && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-black/95 backdrop-blur-sm"
              />
              <motion.div
                layoutId={selectedId}
                className="relative z-10 max-w-5xl w-full bg-brand-surface shadow-2xl overflow-hidden rounded-sm"
              >
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 z-20 p-2 bg-brand-surface/50 text-white rounded-full hover:bg-brand-primary hover:text-brand-on-primary transition-colors"
                >
                  <X />
                </button>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/3 aspect-[4/5] md:aspect-auto h-[50vh] md:h-[80vh]">
                    <img src={selectedItem.url} alt={selectedItem.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="md:w-1/3 p-10 flex flex-col justify-center">
                    <span className="text-brand-primary font-black uppercase tracking-widest text-sm mb-2">{selectedItem.category}</span>
                    <h2 className="text-4xl font-black mb-6">{selectedItem.title}</h2>
                    <p className="text-brand-on-surface-variant leading-relaxed text-lg mb-8">
                       هذه اللقطة تمثل التزامنا بأعلى معايير الجودة والحداثة. كل عميل لدينا يحصل على اهتمامنا الكامل ليخرج بصورة أسطورية.
                    </p>
                    <button 
                      onClick={() => setSelectedId(null)}
                      className="w-full py-4 bg-brand-primary text-brand-on-primary font-bold hover:scale-105 transition-transform"
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
