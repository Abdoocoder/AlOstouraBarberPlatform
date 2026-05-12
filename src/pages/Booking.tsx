import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Clock, User, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import { useQuery, useMutation } from 'convex/react';
import { useUser } from '@clerk/clerk-react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';
import { usePageTitle } from '../lib/usePageTitle';

const timeSlots = [
  '10:00 ص', '10:45 ص', '11:30 ص', '12:15 م', '01:00 م',
  '04:00 م', '04:45 م', '05:30 م', '06:15 م', '07:00 م', '07:45 م', '08:30 م', '09:15 م',
];

export default function Booking() {
  usePageTitle('احجز موعدك');
  const [searchParams] = useSearchParams();
  const { user } = useUser();

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
  const [error, setError] = React.useState('');

  const services = useQuery(api.services.list) ?? [];
  const existingBookings = useQuery(api.bookings.listByDate, formData.date ? { date: formData.date } : 'skip') ?? [];
  const createBooking = useMutation(api.bookings.create);

  const takenTimes = new Set(
    existingBookings
      .filter((b) => b.status !== 'cancelled')
      .map((b) => b.time)
  );

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const selectedService = services.find(s => s._id === formData.serviceId);
    if (!selectedService) {
      setError('الرجاء اختيار خدمة.');
      setIsSubmitting(false);
      return;
    }

    if (!/^(07[0-9]{8}|\+9627[0-9]{8}|009627[0-9]{8})$/.test(formData.phone)) {
      setError('الرجاء إدخال رقم جوال أردني صحيح (مثال: 0791234567 أو +962791234567).');
      return;
    }

    try {
      await createBooking({
        serviceId: formData.serviceId as Id<'services'>,
        serviceName: selectedService.name,
        date: formData.date,
        time: formData.time,
        customerName: formData.name,
        customerPhone: formData.phone,
        clerkUserId: user?.id,
        price: selectedService.price,
      });
      setIsSuccess(true);
    } catch (err) {
      const message = err instanceof Error && err.message === 'TIME_SLOT_TAKEN'
        ? 'عذراً، هذا الموعد محجوز مسبقاً. الرجاء اختيار وقت آخر.'
        : 'حدث خطأ. الرجاء المحاولة مرة أخرى.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedService = services.find(s => s._id === formData.serviceId);

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
            شكرًا لك {formData.name}.<br />
            لقد تم حجز موعد {selectedService?.name} في يوم {formData.date} الساعة {formData.time}. سنتصل بك للتأكيد.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full py-4 bg-brand-primary text-brand-on-primary font-bold press-active hover:scale-105"
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
                      {services.length === 0 ? (
                        <div className="text-brand-on-surface-variant italic">جاري تحميل الخدمات...</div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {services.map((s) => (
                            <div
                              key={s._id}
                              onClick={() => setFormData({ ...formData, serviceId: s._id })}
                              className={cn(
                                "p-4 border-2 cursor-pointer active:scale-[0.97] transition-[border-color,background-color,color,transform] duration-200 flex justify-between items-center",
                                formData.serviceId === s._id
                                  ? "border-brand-primary bg-brand-primary/5 scale-[1.02]"
                                  : "border-brand-outline-variant hover:border-brand-primary/40"
                              )}
                            >
                              <span className="font-bold">{s.name}</span>
                              <span className="text-brand-primary font-black">{s.price} د.أ</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="booking-date" className="block text-sm font-bold text-brand-on-surface-variant mb-4 uppercase tracking-wider">تاريخ الموعد</label>
                      <input
                        id="booking-date" type="date"
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
                      className="px-10 py-4 bg-brand-primary text-brand-on-primary font-black flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed press-active"
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
                    {timeSlots
                      .filter((time) => !takenTimes.has(time))
                      .map((time) => (
                        <div
                          key={time}
                          onClick={() => setFormData({ ...formData, time })}
                          className={cn(
                            "py-4 text-center border-2 font-bold cursor-pointer active:scale-[0.97] transition-[border-color,background-color,color,transform] duration-200",
                            formData.time === time
                              ? "bg-brand-primary border-brand-primary text-brand-on-primary scale-105"
                              : "border-brand-outline-variant hover:border-brand-primary/40 text-brand-on-surface-variant hover:text-brand-primary"
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
                      className="px-10 py-4 border-2 border-brand-outline-variant font-black flex items-center gap-3 press-active"
                    >
                      <ChevronRight className="w-5 h-5 rtl:hidden" />
                      <ChevronLeft className="w-5 h-5 ltr:hidden" />
                      السابق
                    </button>
                    <button
                      type="button"
                      disabled={!formData.time}
                      onClick={handleNext}
                      className="px-10 py-4 bg-brand-primary text-brand-on-primary font-black flex items-center gap-3 disabled:opacity-50 press-active"
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
                  {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-500 font-bold text-sm">
                      {error}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="booking-name" className="block text-sm font-bold text-brand-on-surface-variant mb-2 uppercase tracking-wider">الاسـم الـكـامـل</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-outline-variant w-5 h-5" />
                          <input
                            id="booking-name" type="text"
                            required
                            placeholder="مثال: أحمد محمد"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-brand-surface border-2 border-brand-outline-variant p-4 pr-12 text-brand-on-surface focus:border-brand-primary outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="booking-phone" className="block text-sm font-bold text-brand-on-surface-variant mb-2 uppercase tracking-wider">رقـم الـجـوال</label>
                        <div className="relative">
                          <input
                            id="booking-phone" type="tel"
                            required
                            title="أدخل رقم الجوال الأردني: 0791234567 أو +962791234567"
                            placeholder="0791234567"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-brand-surface border-2 border-brand-outline-variant p-4 pr-12 text-brand-on-surface focus:border-brand-primary outline-none"
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
                        <span className="text-sm text-brand-on-surface-variant block">المجموع الإجمالي</span>
                        <span className="text-2xl font-black text-brand-primary">{selectedService?.price} د.أ</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-10 py-4 border-2 border-brand-outline-variant font-black press-active"
                    >
                      السابق
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.name || !formData.phone}
                      className="px-10 py-4 bg-brand-primary text-brand-on-primary font-black flex items-center gap-3 disabled:opacity-50 press-active"
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
