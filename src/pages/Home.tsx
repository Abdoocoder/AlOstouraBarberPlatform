import * as React from 'react';
import { motion } from 'motion/react';
import { Scissors, Star, Users, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { usePageTitle } from '../lib/usePageTitle';

export default function Home() {
  usePageTitle('الرئيسية');
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2000" 
            alt="Barbershop Atmosphere" 
            width="2000" height="1333"
            className="w-full h-full object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-brand-surface/80" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
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
                className="group relative px-10 py-5 bg-brand-primary text-brand-on-primary font-black rounded-sm overflow-hidden press-active"
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
                className="px-10 py-5 border border-brand-outline-variant hover:border-brand-primary transition-[color,background-color,border-color,transform] font-black rounded-sm active:scale-[0.97]"
              >
                استعرض خدماتنا
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
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
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
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
            <Link to="/gallery" className="text-brand-primary font-black inline-flex items-center gap-2 group press-active py-3">
              شاهد أعمالنا 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
            </Link>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="absolute -inset-4 bg-brand-primary/10 -rotate-3 z-0" />
             <img 
               src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1000" 
               alt="Barber working" 
               width="1000" height="1500"
               className="relative z-10 rounded-sm shadow-2xl grayscale transition-[transform,filter] duration-300 hover:grayscale-0 max-md:grayscale-0"
             />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />
    </div>
  );
}

function TeamSection() {
  const barbers = useQuery(api.barbers.list) ?? [];

  if (barbers.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-brand-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-brand-primary font-black uppercase tracking-widest text-sm mb-4">فريق الأسطورة</h2>
          <h3 className="text-4xl md:text-5xl font-black mb-6">حلاقينا الخبراء</h3>
          <p className="text-brand-on-surface-variant text-lg max-w-2xl mx-auto">
            نخبة من أمهر الحلاقين المحترفين لضمان تجربة أسطورية في كل زيارة.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {barbers.sort((a, b) => a.sortOrder - b.sortOrder).map((barber, i) => (
            <motion.div
              key={barber._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="bg-brand-surface-container border border-brand-outline-variant hover:border-brand-primary/50 transition-colors p-8 flex flex-col items-center text-center group"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-brand-outline-variant group-hover:border-brand-primary transition-colors duration-300">
                <img
                  src={barber.imageUrl}
                  alt={barber.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[transform,filter] duration-700 group-hover:scale-110"
                />
              </div>
              <h4 className="text-2xl font-black mb-1">{barber.name}</h4>
              <p className="text-brand-primary font-bold text-sm mb-4">{barber.role}</p>
              <p className="text-brand-on-surface-variant text-sm leading-relaxed">{barber.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
