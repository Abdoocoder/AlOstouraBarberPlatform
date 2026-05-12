import * as React from 'react';
import { motion } from 'motion/react';
import { Users, Calendar, TrendingUp, Scissors, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

const appointments = [
  { id: '101', name: 'سلطان القحطاني', service: 'قصة الأسطورة', time: '10:00 ص', status: 'completed', price: 150 },
  { id: '102', name: 'نايف الشهري', service: 'تحديد لحية', time: '11:30 ص', status: 'confirmed', price: 80 },
  { id: '103', name: 'محمد الدوسري', service: 'تنظيف بشرة', time: '12:15 م', status: 'confirmed', price: 200 },
  { id: '104', name: 'فهد المطيري', service: 'باقة العريس', time: '04:00 م', status: 'pending', price: 500 },
  { id: '105', name: 'تركي العتيبي', service: 'مساج رأس', time: '06:00 م', status: 'cancelled', price: 50 },
];

export default function Admin() {
  const [filter, setFilter] = React.useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');

  const filteredAppointments = appointments.filter(apt => 
    filter === 'all' ? true : apt.status === filter
  );

  const filters = [
    { id: 'all', label: 'الكل' },
    { id: 'pending', label: 'قيد الانتظار' },
    { id: 'confirmed', label: 'مؤكد' },
    { id: 'completed', label: 'تمت' },
    { id: 'cancelled', label: 'ملغي' },
  ] as const;

  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-black mb-2">لوحة التحكم <span className="text-brand-primary">الأسطورية</span></h1>
            <p className="text-brand-on-surface-variant font-bold">إدارة المواعيد والأداء اليومي للصـالـون.</p>
          </div>
          <div className="bg-brand-surface-container px-6 py-3 border border-brand-outline-variant flex items-center gap-3">
             <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
             <span className="font-bold text-sm">النظام يعمل بكفاءة</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'إجمالي المواعيد', val: '24', icon: Calendar, color: 'text-blue-500' },
            { label: 'العملاء الجدد', val: '+5', icon: Users, color: 'text-brand-primary' },
            { label: 'دخل اليوم', val: '1,450 ر.س', icon: TrendingUp, color: 'text-green-500' },
            { label: 'أداء الحلاقين', val: '98%', icon: Scissors, color: 'text-purple-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-brand-surface-container p-6 border border-brand-outline-variant relative overflow-hidden group">
               <stat.icon className={cn("absolute -bottom-4 -right-4 w-20 h-20 opacity-5 transition-transform group-hover:scale-110", stat.color)} />
               <h4 className="text-sm font-bold text-brand-on-surface-variant mb-2 uppercase tracking-wide">{stat.label}</h4>
               <div className="text-3xl font-black">{stat.val}</div>
            </div>
          ))}
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "px-6 py-2 text-xs font-black uppercase tracking-wider transition-all border",
                filter === f.id 
                  ? "bg-brand-primary border-brand-primary text-brand-on-primary" 
                  : "bg-brand-surface-container border-brand-outline-variant text-brand-on-surface-variant hover:border-brand-primary hover:text-brand-primary"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Appointment Table */}
        <div className="bg-brand-surface-container border border-brand-outline-variant overflow-hidden">
          <div className="p-6 border-b border-brand-outline-variant flex justify-between items-center bg-brand-surface-container-high">
            <h3 className="text-xl font-black">مواعيد اليوم</h3>
            <button className="text-sm font-bold text-brand-primary underline underline-offset-4">تصدير التقارير</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="text-brand-on-surface-variant font-bold text-sm bg-brand-surface-container-highest/20 border-b border-brand-outline-variant">
                  <th className="p-6">الـعـمـيـل</th>
                  <th className="p-6">الـخدمـة</th>
                  <th className="p-6">الـوقـت</th>
                  <th className="p-6">الـسـعر</th>
                  <th className="p-6">الـحـالـة</th>
                  <th className="p-6">الإجـراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="border-b border-brand-outline-variant/30 hover:bg-brand-surface transition-colors">
                      <td className="p-6 font-bold">{apt.name}</td>
                      <td className="p-6 text-brand-on-surface-variant italic">{apt.service}</td>
                      <td className="p-6 flex items-center gap-2">
                        <Clock size={16} className="text-brand-primary" />
                        {apt.time}
                      </td>
                      <td className="p-6 font-black text-brand-primary">{apt.price} ر.س</td>
                      <td className="p-6">
                        <span className={cn(
                          "px-3 py-1 text-xs font-black rounded-full uppercase italic",
                          apt.status === 'completed' && "bg-green-500/10 text-green-500 border border-green-500/50",
                          apt.status === 'confirmed' && "bg-blue-500/10 text-blue-500 border border-blue-500/50",
                          apt.status === 'pending' && "bg-yellow-500/10 text-yellow-500 border border-yellow-500/50",
                          apt.status === 'cancelled' && "bg-red-500/10 text-red-500 border border-red-500/50",
                        )}>
                          {apt.status === 'completed' ? 'تمت' : apt.status === 'confirmed' ? 'مؤكد' : apt.status === 'pending' ? 'قيد الانتظار' : 'ملغي'}
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex gap-2">
                          <button className="p-2 bg-brand-surface-container border border-brand-outline-variant text-green-500 hover:bg-green-500 hover:text-white transition-all">
                            <CheckCircle2 size={16} />
                          </button>
                          <button className="p-2 bg-brand-surface-container border border-brand-outline-variant text-red-500 hover:bg-red-500 hover:text-white transition-all">
                            <XCircle size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-brand-on-surface-variant font-bold italic">
                      لا توجد مواعيد بهذا التصنيف حاليًا.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
