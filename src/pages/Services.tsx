import * as React from 'react';
import { motion } from 'motion/react';
import { Scissors, Zap, Sparkles, Coffee, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const categories = [
  { id: 'hair', name: 'خدمات الشعر', icon: Scissors },
  { id: 'beard', name: 'خدمات اللحية', icon: Zap },
  { id: 'spa', name: 'سبا وعناية', icon: Sparkles },
  { id: 'packages', name: 'باقات الأسطورة', icon: Coffee },
];

const services = [
  { id: '1', category: 'hair', name: 'قصة الأسطورة', price: 150, duration: 45, description: 'قصة شعر متكاملة مع غسيل وتصفيف احترافي حسب ملامح وجهك.' },
  { id: '2', category: 'hair', name: 'قصة كلاسيكية', price: 100, duration: 30, description: 'القصة التقليدية التي لا تفقد بريقها أبدًا.' },
  { id: '3', category: 'beard', name: 'تحديد وتدريج اللحية', price: 80, duration: 30, description: 'نحت اللحية وتحديدها بالأمواس والزيوت الطبيعية.' },
  { id: '4', category: 'beard', name: 'حلاقة ملكية', price: 120, duration: 40, description: 'حلاقة بالمنشفة الساخنة والزيوت العطرية لتنعيم البشرة.' },
  { id: '5', category: 'spa', name: 'تنظيف بشرة ملكي', price: 200, duration: 60, description: 'برنامج متكامل لتنظيف المسام وتقشير وتنعيم بشرة الوجه.' },
  { id: '6', category: 'spa', name: 'مساج فروة الرأس', price: 50, duration: 15, description: 'تجربة استرخاء عميقة لتنشيط الدورة الدموية.' },
  { id: '7', category: 'packages', name: 'باقة العريس', price: 500, duration: 180, description: 'كل ما يحتاجه العريس من شعر ولحية وبشرة في جلسة واحدة.' },
  { id: '8', category: 'packages', name: 'باقة الــVIP الأسبوعية', price: 300, duration: 90, description: 'الحل الأمثل للحفاظ على مظهرك أسبوعيًا بأسعار تفضيلية.' },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = React.useState('hair');

  const filteredServices = services.filter(s => s.category === activeCategory);

  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-brand-primary font-black uppercase tracking-widest text-sm mb-4"
          >
            قائمة الخدمات
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            اخـتـر بـاقـتـك <br /> <span className="text-brand-primary underline decoration-2 underline-offset-8">الأسـطـوريـة</span>
          </motion.h1>
          <p className="text-brand-on-surface-variant text-lg max-w-2xl mx-auto">
            نقدم مجموعة متكاملة من الخدمات المصممة خصيصًا لتلبية احتياجاتك مع الاهتمام بأدق التفاصيل.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-3 px-8 py-4 rounded-sm font-black transition-all duration-300 border-2",
                activeCategory === cat.id 
                  ? "bg-brand-primary border-brand-primary text-brand-on-primary shadow-[0_0_20px_rgba(242,202,80,0.3)] scale-105" 
                  : "bg-brand-surface-container border-brand-outline-variant text-brand-on-surface-variant hover:border-brand-primary hover:text-brand-primary"
              )}
            >
              <cat.icon className="w-5 h-5" />
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredServices.map((service, i) => (
            <motion.div
              layout
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-brand-surface-container p-8 border border-brand-outline-variant hover:border-brand-primary/50 transition-colors flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-black group-hover:text-brand-primary transition-colors">{service.name}</h3>
                  <div className="text-2xl font-black text-brand-primary">{service.price} ر.س</div>
                </div>
                <p className="text-brand-on-surface-variant mb-6 leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-brand-outline-variant">
                <div className="flex items-center gap-2 text-sm font-bold text-brand-on-surface-variant">
                  <Clock className="w-4 h-4 text-brand-primary" />
                  <span>{service.duration} دقيقة</span>
                </div>
                <Link 
                  to={`/booking?service=${service.id}`}
                  className="text-brand-primary font-bold hover:underline"
                >
                  احجز الخدمة
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Order Box */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-12 bg-gradient-to-r from-brand-surface-container to-brand-surface-container-highest border-2 border-dashed border-brand-primary/30 rounded-sm text-center"
        >
          <h3 className="text-2xl font-black mb-4 italic">هل تبحث عن خدمات مخصصة؟</h3>
          <p className="text-brand-on-surface-variant max-w-xl mx-auto mb-8">
            تواصل معنا لتنسيق باقة خاصة للمناسبات أو المجموعات الكبيرة بأسعار استثنائية.
          </p>
          <Link to="/contact" className="px-8 py-4 bg-brand-surface border border-brand-primary text-brand-primary font-bold hover:bg-brand-primary hover:text-brand-on-primary transition-all">
            تحدث معنا
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
