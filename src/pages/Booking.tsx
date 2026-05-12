import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Clock, User, Phone, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';

const services = [
  { id: '1', name: 'قصة الأسطورة', price: 150 },
  { id: '2', name: 'قصة كلاسيكية', price: 100 },
  { id: '3', name: 'تحديد وتدريج اللحية', price: 80 },
  { id: '4', name: 'حلاقة ملكية', price: 120 },
  { id: '5', name: 'تنظيف بشرة ملكي', price: 200 },
];

const timeSlots = [
  '10:00 ص', '10:45 ص', '11:30 ص', '12:15 م', '01:00 م',
  '04:00 م', '04:45 م', '05:30 م', '06:15 م', '07:00 م', '07:45 م', '08:30 م', '09:15 م'
];

export default function Booking() {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || '';

  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    serviceId: initialService,
    date: '',
    time: '',
    name: '',
    phone: '',
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  const selectedService = services.find(s => s.id === formData.serviceId);

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-brand-surface-container p-12 text-center max-w-md w-full border border-brand-primary/20"
        >
          <div className="w-20 h-20 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-brand-primary">
            <CheckCircle className="text-brand-primary w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black mb-4">تم تأكيد حجزك!</h2>
          <p className="text-brand-on-surface-variant mb-8 leading-relaxed">
            شكرًا لك {formData.name}.<br />لقد تم حجز موعد {selectedService?.name} في يوم {formData.date} الساعة {formData.time}. سنتصل بك للتأكيد.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full py-4 bg-brand-primary text-brand-on-primary font-bold hover:scale-105 transition-transform"
          >
            العودة للرئيسية
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-brand-primary font-black uppercase tracking-widest text-sm mb-4">نظام الحجز الذكي</h2>
          <h1 className="text-4xl md:text-5xl font-black mb-6">احـجـز مـقـعـدك الآن</h1>
          
          {/* Progress Bar */}
          <div className="flex items-center justify-center gap-4 mt-10">
            {[1, 2, 3].map((i) => (
              <React.Fragment key={i}>
                <div 
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-black transition-colors",
                    step >= i ? "bg-brand-primary text-brand-on-primary" : "bg-brand-surface-container text-brand-on-surface-variant"
                  )}
                >
                  {i}
                </div>
                {i < 3 && <div className={cn("h-1 w-12 rounded", step > i ? "bg-brand-primary" : "bg-brand-surface-container")} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="bg-brand-surface-container shadow-2xl border border-brand-outline-variant overflow-hidden">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-8 md:p-12"
                >
                  <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                    <Calendar className="text-brand-primary" />
                    اختر الخدمة واليوم
                  </h3>
                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-bold text-brand-on-surface-variant mb-4 uppercase tracking-wider">الخدمة المطلوبة</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {services.map((s) => (
                          <div 
                            key={s.id}
                            onClick={() => setFormData({ ...formData, serviceId: s.id })}
                            className={cn(
                              "p-4 border-2 cursor-pointer transition-all flex justify-between items-center",
                              formData.serviceId === s.id ? "border-brand-primary bg-brand-primary/5" : "border-brand-outline-variant hover:border-brand-primary/40"
                            )}
                          >
                            <span className="font-bold">{s.name}</span>
                            <span className="text-brand-primary font-black">{s.price} ر.س</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-brand-on-surface-variant mb-4 uppercase tracking-wider">تاريخ الموعد</label>
                      <input 
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-brand-surface border-2 border-brand-outline-variant p-4 text-brand-on-surface focus:border-brand-primary outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div className="mt-12 flex justify-end">
                    <button 
                      type="button"
                      disabled={!formData.serviceId || !formData.date}
                      onClick={handleNext}
                      className="px-10 py-4 bg-brand-primary text-brand-on-primary font-black flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                    >
                      التالي
                      <ChevronLeft className="w-5 h-5 rtl:hidden" />
                      <ChevronRight className="w-5 h-5 ltr:hidden" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-8 md:p-12"
                >
                  <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                    <Clock className="text-brand-primary" />
                    اختر الوقت المتاح
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {timeSlots.map((time) => (
                      <div 
                        key={time}
                        onClick={() => setFormData({ ...formData, time })}
                        className={cn(
                          "py-3 text-center border-2 cursor-pointer font-bold transition-all",
                          formData.time === time ? "bg-brand-primary border-brand-primary text-brand-on-primary" : "border-brand-outline-variant hover:border-brand-primary/40 text-brand-on-surface-variant hover:text-brand-primary"
                        )}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                  <div className="mt-12 flex justify-between">
                    <button 
                      type="button"
                      onClick={handlePrev}
                      className="px-10 py-4 border-2 border-brand-outline-variant font-black flex items-center gap-3"
                    >
                      <ChevronRight className="w-5 h-5 rtl:hidden" />
                      <ChevronLeft className="w-5 h-5 ltr:hidden" />
                      السابق
                    </button>
                    <button 
                      type="button"
                      disabled={!formData.time}
                      onClick={handleNext}
                      className="px-10 py-4 bg-brand-primary text-brand-on-primary font-black flex items-center gap-3 disabled:opacity-50 hover:scale-105 transition-transform"
                    >
                      التالي
                      <ChevronLeft className="w-5 h-5 rtl:hidden" />
                      <ChevronRight className="w-5 h-5 ltr:hidden" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-8 md:p-12"
                >
                  <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                    <User className="text-brand-primary" />
                    بيانات التواصل والـتأكيد
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-brand-on-surface-variant mb-2 uppercase tracking-wider">الاسـم الـكـامـل</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-outline-variant w-5 h-5" />
                          <input 
                            type="text"
                            required
                            placeholder="مثال: أحمد محمد"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-brand-surface border-2 border-brand-outline-variant p-4 pr-12 text-brand-on-surface focus:border-brand-primary outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-brand-on-surface-variant mb-2 uppercase tracking-wider">رقـم الـجـوال</label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-outline-variant font-bold text-sm">+966</div>
                          <input 
                            type="tel"
                            required
                            placeholder="5XXXXXXXX"
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-brand-surface border-2 border-brand-outline-variant p-4 pr-20 text-brand-on-surface focus:border-brand-primary outline-none"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-brand-surface p-6 border-2 border-brand-primary/10 flex flex-col justify-between">
                       <div>
                         <h4 className="font-black text-brand-primary mb-4 underline">ملخص الحجز</h4>
                         <div className="space-y-3 text-sm font-bold">
                           <div className="flex justify-between">
                             <span className="text-brand-on-surface-variant italic">الخدمة:</span>
                             <span>{selectedService?.name}</span>
                           </div>
                           <div className="flex justify-between">
                             <span className="text-brand-on-surface-variant italic">التاريخ:</span>
                             <span>{formData.date}</span>
                           </div>
                           <div className="flex justify-between">
                             <span className="text-brand-on-surface-variant italic">الوقت:</span>
                             <span>{formData.time}</span>
                           </div>
                         </div>
                       </div>
                       <div className="text-right pt-4 border-t border-brand-outline-variant mt-4">
                         <span className="text-xs text-brand-on-surface-variant block">المجموع الإجمالي</span>
                         <span className="text-2xl font-black text-brand-primary">{selectedService?.price} ر.س</span>
                       </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button 
                      type="button"
                      onClick={handlePrev}
                      className="px-10 py-4 border-2 border-brand-outline-variant font-black"
                    >
                      السابق
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting || !formData.name || !formData.phone}
                      className="px-10 py-4 bg-brand-primary text-brand-on-primary font-black flex items-center gap-3 disabled:opacity-50 hover:scale-105 transition-transform"
                    >
                      {isSubmitting ? 'جاري التأكيد...' : 'تأكيد الحجز النهائي'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
}
