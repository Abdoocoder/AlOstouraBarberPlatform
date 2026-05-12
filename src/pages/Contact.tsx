import * as React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Instagram, Twitter, MessageCircle, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-brand-primary font-black uppercase tracking-widest text-sm mb-4">تواصل معنا</h2>
          <h1 className="text-4xl md:text-6xl font-black mb-6">نـحـن بـانـتـظـارك</h1>
          <p className="text-brand-on-surface-variant text-lg max-w-2xl mx-auto">
            تواصل معنا لطرح أسئلتك أو لتحديد موعد خاص. فريقنا متواجد دائمًا لخدمتك.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-black mb-8 underline decoration-brand-primary decoration-4 underline-offset-8">معلومات الاتصال</h3>
              <div className="space-y-8">
                {[
                  { icon: MapPin, title: 'الموقع الرئيسي', desc: 'شارع الملك فيصل، الحي الدبلوماسي، الرياض' },
                  { icon: Phone, title: 'رقم الهاتف', desc: '+966 50 000 0000' },
                  { icon: Mail, title: 'البريد الإلكتروني', desc: 'info@thelegend-salon.com' },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-6 group"
                  >
                    <div className="p-4 bg-brand-surface-container border border-brand-outline-variant text-brand-primary group-hover:bg-brand-primary group-hover:text-brand-on-primary transition-all duration-300">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-lg mb-1">{item.title}</h4>
                      <p className="text-brand-on-surface-variant font-medium">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-black mb-8 underline decoration-brand-primary decoration-4 underline-offset-8">تابعنا على</h3>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, label: 'إنستجرام' },
                  { icon: Twitter, label: 'تويتر (X)' },
                  { icon: MessageCircle, label: 'واتساب' },
                ].map((social, i) => (
                  <motion.button 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="p-5 bg-brand-surface-container border border-brand-outline-variant hover:border-brand-primary transition-colors flex items-center gap-3 font-bold"
                  >
                    <social.icon className="text-brand-primary" />
                    <span>{social.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-brand-surface-container p-10 border border-brand-outline-variant relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 -translate-y-16 translate-x-16 rounded-full blur-3xl" />
            <form className="space-y-6 relative z-10">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-brand-on-surface-variant uppercase">الاسـم</label>
                   <input type="text" className="w-full bg-brand-surface border border-brand-outline-variant p-4 focus:border-brand-primary outline-none transition-colors" placeholder="أحمد..." />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-brand-on-surface-variant uppercase">البريد الإلكتروني</label>
                   <input type="email" className="w-full bg-brand-surface border border-brand-outline-variant p-4 focus:border-brand-primary outline-none transition-colors" placeholder="example@mail.com" />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-bold text-brand-on-surface-variant uppercase">الموضوع</label>
                 <select className="w-full bg-brand-surface border border-brand-outline-variant p-4 focus:border-brand-primary outline-none transition-colors">
                   <option>استفسار عن خدمة</option>
                   <option>حجز لمناسبة خاصة</option>
                   <option>اقتراحات أو شكاوى</option>
                   <option>أخرى</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-bold text-brand-on-surface-variant uppercase">الرسالة</label>
                 <textarea rows={5} className="w-full bg-brand-surface border border-brand-outline-variant p-4 focus:border-brand-primary outline-none transition-colors" placeholder="اكتب رسالتك هنا..." />
               </div>
               <button type="submit" className="w-full py-5 bg-brand-primary text-brand-on-primary font-black flex items-center justify-center gap-3 group hover:scale-[1.02] transition-transform">
                 إرسال الرسالة
                 <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform rtl:rotate-180" />
               </button>
            </form>
          </motion.div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-20 h-[400px] bg-brand-surface-container overflow-hidden group">
           <div className="w-full h-full relative cursor-help flex items-center justify-center">
             <img 
               src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000" 
               className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale grayscale-100 group-hover:grayscale-0 transition-all duration-1000" 
               alt="Map placeholder"
             />
             <div className="relative z-10 text-center flex flex-col items-center">
               <div className="w-16 h-16 bg-brand-primary p-4 rounded-full shadow-2xl mb-4 animate-bounce">
                 <MapPin className="text-brand-on-primary w-full h-full" />
               </div>
               <h3 className="text-2xl font-black mb-2 shadow-sm">تفضل بزيارتنا</h3>
               <p className="text-brand-on-surface-variant font-bold">انقر لفتح الخريطة في نافذة جديدة</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
