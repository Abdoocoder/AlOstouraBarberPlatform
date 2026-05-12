import * as React from 'react';
import { motion } from 'motion/react';
import { Scissors, Star, Users, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2000" 
            alt="Barbershop Atmosphere" 
            className="w-full h-full object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-brand-surface/80" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-brand-primary font-black tracking-[0.2em] mb-4 text-sm md:text-base uppercase flex items-center justify-center gap-3">
              <span className="h-[2px] w-8 bg-brand-primary" />
              أرقى فنون العـنـاية بالرجـل
              <span className="h-[2px] w-8 bg-brand-primary" />
            </h2>
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
              كـن الـأسـطـورة <br />
              <span className="text-brand-primary">فـي مـظـهـرك</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-on-surface-variant mb-10 max-w-2xl mx-auto leading-relaxed">
              نحن لا نقدم مجرد حلاقة، بل نصنع لك هوية تعكس تميزك. استمتع بتجربة تتخطى حدود التوقعات.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/booking"
                className="group relative px-10 py-5 bg-brand-primary text-brand-on-primary font-black rounded-sm overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  احجز موعدك الآن
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </Link>
              <Link 
                to="/services"
                className="px-10 py-5 border border-brand-outline-variant hover:border-brand-primary transition-colors font-black rounded-sm"
              >
                استعرض خدماتنا
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand-primary to-transparent" />
        </motion.div>
      </section>

      {/* Quick Stats */}
      <section className="bg-brand-surface-container-low py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Users, val: '5k+', label: 'عميل سعيد' },
            { icon: Scissors, val: '10+', label: 'حلاقين خبراء' },
            { icon: Clock, val: '15+', label: 'سنة خبرة' },
            { icon: Star, val: '4.9', label: 'تقييم العملاء' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <stat.icon className="w-10 h-10 text-brand-primary mx-auto mb-4" />
              <div className="text-3xl font-black mb-1">{stat.val}</div>
              <div className="text-sm text-brand-on-surface-variant font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-brand-primary font-black text-sm uppercase mb-4 tracking-widest">تاريخنا وقيمنا</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight">حيث تلتقي العراقة <br /> مع الابتكار</h3>
            <p className="text-brand-on-surface-variant text-lg leading-relaxed mb-8">
              منذ انطلاقتنا، وهدفنا هو إعادة صياغة تجربة الحلاقة الرجالية. نؤمن بأن كل رجل يستحق لحظات من الاستجمام تنتهي بنتيجة استثنائية. 
              فريقنا مكون من أساتذة الحلاقة الذين يجمعون بين التقنيات الكلاسيكية وأحدث صيحات الموضة العالمية.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                'استخدام أفضل منتجات العناية العالمية',
                'بيئة فاخرة ومريحة مصممة لراحتك',
                'التزام تام بأعلى معايير النظافة والتعقيم',
                'استشارات مظهر مخصصة لكل عميل'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-bold text-brand-on-surface">
                  <div className="w-2 h-2 bg-brand-primary rounded-full" />
                   {item}
                </li>
              ))}
            </ul>
            <Link to="/gallery" className="text-brand-primary font-black flex items-center gap-2 group">
              شاهد أعمالنا 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
            </Link>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="absolute -inset-4 bg-brand-primary/10 -rotate-3 z-0" />
             <img 
               src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1000" 
               alt="Barber working" 
               className="relative z-10 rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
             />
          </div>
        </div>
      </section>
    </div>
  );
}
