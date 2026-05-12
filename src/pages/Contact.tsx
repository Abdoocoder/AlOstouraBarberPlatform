import * as React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { usePageTitle } from '../lib/usePageTitle';

export default function Contact() {
  usePageTitle('تواصل معنا');
  const sendMessage = useMutation(api.contacts.create);

  const [formData, setFormData] = React.useState({
    name: '', email: '', subject: 'استفسار عن خدمة', message: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('يرجى تعبئة جميع الحقول المطلوبة.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      await sendMessage(formData);
      setIsSuccess(true);
    } catch {
      setError('حدث خطأ. يرجى المحاولة لاحقًا.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="py-20 px-6 min-h-[80vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-brand-surface-container p-12 text-center max-w-md w-full border border-brand-primary/20"
        >
          <div className="w-20 h-20 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-brand-primary">
            <CheckCircle className="text-brand-primary w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black mb-4">شكرًا لتواصلك!</h2>
          <p className="text-brand-on-surface-variant mb-8 leading-relaxed">
            تم استلام رسالتك بنجاح. سيقوم فريقنا بالرد عليك في أقرب وقت ممكن.
          </p>
          <button
            onClick={() => { setIsSuccess(false); setFormData({ name: '', email: '', subject: 'استفسار عن خدمة', message: '' }); }}
            className="w-full py-4 bg-brand-primary text-brand-on-primary font-bold press-active"
          >
            إرسال رسالة أخرى
          </button>
        </motion.div>
      </div>
    );
  }

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-black mb-8 underline decoration-brand-primary decoration-4 underline-offset-8">معلومات الاتصال</h3>
              <div className="space-y-8">
                {[
                  { icon: MapPin, title: 'الموقع الرئيسي', desc: 'شارع جاوا، عمان، الأردن' },
                  { icon: Phone, title: 'رقم الهاتف', desc: '+962 78 063 4122' },
                  { icon: Mail, title: 'البريد الإلكتروني', desc: 'info@thelegend-salon.com' },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-6 group"
                  >
                    <div className="p-4 bg-brand-surface-container border border-brand-outline-variant text-brand-primary group-hover:bg-brand-primary group-hover:text-brand-on-primary transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.97]">
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
                  { icon: Instagram, label: 'إنستجرام', href: 'https://www.instagram.com' },
                  { icon: Facebook, label: 'فيسبوك', href: 'https://web.facebook.com/profile.php?id=100057146302329' },
                  { icon: MessageCircle, label: 'واتساب', href: 'https://wa.me/962780634122' },
                ].map((social, i) => (
                  <motion.a 
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className="p-5 bg-brand-surface-container border border-brand-outline-variant hover:border-brand-primary transition-[color,background-color,border-color,transform] flex items-center gap-3 font-bold active:scale-[0.97]"
                  >
                    <social.icon className="text-brand-primary" />
                    <span>{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-brand-surface-container p-6 md:p-10 border border-brand-outline-variant relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 -translate-y-16 translate-x-16 rounded-full blur-3xl" />
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 font-bold text-sm" role="alert">
                  {error}
                </div>
              )}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="space-y-2">
                     <label htmlFor="contact-name" className="text-sm font-bold text-brand-on-surface-variant uppercase tracking-wider">الاسـم</label>
                    <input
                      id="contact-name" type="text" required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-brand-surface border-2 border-brand-outline-variant p-4 focus:border-brand-primary outline-none transition-colors"
                      placeholder="أحمد..."
                    />
                  </div>
                  <div className="space-y-2">
                     <label htmlFor="contact-email" className="text-sm font-bold text-brand-on-surface-variant uppercase tracking-wider">البريد الإلكتروني</label>
                    <input
                      id="contact-email" type="email" required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-brand-surface border-2 border-brand-outline-variant p-4 focus:border-brand-primary outline-none transition-colors"
                     placeholder="example@mail.com"
                    />
                 </div>
               </div>
               <div className="space-y-2">
                   <label htmlFor="contact-subject" className="text-sm font-bold text-brand-on-surface-variant uppercase tracking-wider">الموضوع</label>
                  <select
                    id="contact-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-brand-surface border-2 border-brand-outline-variant p-4 focus:border-brand-primary outline-none transition-colors"
                 >
                   <option>استفسار عن خدمة</option>
                   <option>حجز لمناسبة خاصة</option>
                   <option>اقتراحات أو شكاوى</option>
                   <option>أخرى</option>
                 </select>
               </div>
               <div className="space-y-2">
                   <label htmlFor="contact-message" className="text-sm font-bold text-brand-on-surface-variant uppercase tracking-wider">الرسالة</label>
                  <textarea
                    id="contact-message" rows={5} required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-brand-surface border-2 border-brand-outline-variant p-4 focus:border-brand-primary outline-none transition-colors"
                   placeholder="اكتب رسالتك هنا..."
                 />
               </div>
               <button
                 type="submit" disabled={isSubmitting}
                  className="w-full py-5 bg-brand-primary text-brand-on-primary font-black flex items-center justify-center gap-3 group press-active disabled:opacity-50"
               >
                 {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
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
                className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 transition-[transform,filter] duration-1000" 
                alt="Map placeholder" width="2000" height="400"
             />
             <div className="relative z-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-brand-primary p-4 mb-4">
                 <MapPin className="text-brand-on-primary w-full h-full" />
               </div>
                <h3 className="text-2xl font-black mb-2">تفضل بزيارتنا</h3>
               <p className="text-brand-on-surface-variant font-bold">انقر لفتح الخريطة في نافذة جديدة</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
