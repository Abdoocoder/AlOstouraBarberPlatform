import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard, Scissors, Image as ImageIcon, MessageSquare, Settings,
  Calendar, Users, TrendingUp, CheckCircle2, XCircle, Clock, RefreshCw,
  Plus, Pencil, Trash2, X, ChevronLeft, ChevronRight, Save, Eye, Bell,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';
import { usePageTitle } from '../lib/usePageTitle';

type Tab = 'dashboard' | 'services' | 'gallery' | 'messages' | 'content' | 'team';
type Status = 'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled';
type Category = 'hair' | 'beard' | 'spa' | 'packages';

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
  { id: 'services', label: 'الخدمات', icon: Scissors },
  { id: 'gallery', label: 'المعرض', icon: ImageIcon },
  { id: 'messages', label: 'الرسائل', icon: MessageSquare },
  { id: 'content', label: 'المحتوى', icon: Settings },
  { id: 'team', label: 'فريق العمل', icon: Users },
];

const categoryMeta: { id: Category; label: string }[] = [
  { id: 'hair', label: 'شعر' },
  { id: 'beard', label: 'لحية' },
  { id: 'spa', label: 'سبا' },
  { id: 'packages', label: 'باقات' },
];

export default function Admin() {
  usePageTitle('لوحة التحكم');
  const [activeTab, setActiveTab] = React.useState<Tab>('dashboard');

  const allBookings = useQuery(api.bookings.list) ?? [];
  const pendingCount = allBookings.filter((b) => b.status === 'pending').length;

  const [prevPending, setPrevPending] = React.useState(pendingCount);
  const [toast, setToast] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (pendingCount > prevPending) {
      const diff = pendingCount - prevPending;
      const msg = diff === 1
        ? 'لديك حجز جديد قيد الانتظار!'
        : `لديك ${diff} حجوزات جديدة قيد الانتظار!`;
      setToast(msg);
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
    setPrevPending(pendingCount);
  }, [pendingCount]);

  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] bg-brand-surface-container border border-brand-primary/40 px-6 py-4 shadow-2xl flex items-center gap-3"
              role="alert"
            >
              <Bell className="text-brand-primary w-5 h-5" />
              <span className="font-bold text-sm">{toast}</span>
              <button
                onClick={() => setToast(null)}
                className="p-2 text-brand-on-surface-variant hover:text-brand-primary transition-colors"
                aria-label="إغلاق الإشعار"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div>
            <h1 className="text-3xl font-black mb-2">لوحة التحكم <span className="text-brand-primary">الأسطورية</span></h1>
            <p className="text-brand-on-surface-variant font-bold">إدارة كاملة لجميع أجزاء الموقع.</p>
          </div>
          <div className="bg-brand-surface-container px-6 py-3 border border-brand-outline-variant flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="font-bold text-sm">النظام يعمل بكفاءة</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-brand-outline-variant">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-3 font-black text-sm transition-[background-color,color,border-color] duration-200 border-b-2 -mb-[1px]",
                activeTab === tab.id
                  ? "border-brand-primary text-brand-primary bg-brand-primary/5"
                  : "border-transparent text-brand-on-surface-variant hover:text-brand-primary hover:border-brand-primary/40"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.id === 'dashboard' && pendingCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 leading-none">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'services' && <ServicesTab />}
        {activeTab === 'gallery' && <GalleryTab />}
        {activeTab === 'messages' && <MessagesTab />}
        {activeTab === 'team' && <TeamTab />}
        {activeTab === 'content' && <ContentTab />}
      </div>
    </div>
  );
}

/* ─── Dashboard ─── */

function DashboardTab() {
  const bookingsQuery = useQuery(api.bookings.list);
  const allBookings = bookingsQuery ?? [];
  const isLoading = bookingsQuery === undefined;
  const updateStatus = useMutation(api.bookings.updateStatus);
  const [filter, setFilter] = React.useState<Status>('all');

  const filteredBookings = filter === 'all'
    ? allBookings
    : allBookings.filter(b => b.status === filter);

  const stats = React.useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayBookings = allBookings.filter(b => b.date === today);
    const revenue = todayBookings.reduce((sum, b) => sum + b.price, 0);
    const newCustomers = todayBookings.filter(b => b.status !== 'cancelled').length;
    const upcoming = allBookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length;
    return { total: allBookings.length, newCustomers, revenue, upcoming };
  }, [allBookings]);

  const filters: { id: Status; label: string }[] = [
    { id: 'all', label: 'الكل' },
    { id: 'pending', label: 'قيد الانتظار' },
    { id: 'confirmed', label: 'مؤكد' },
    { id: 'completed', label: 'تمت' },
    { id: 'cancelled', label: 'ملغي' },
  ];

  const handleConfirm = (id: Id<'bookings'>) => updateStatus({ id, status: 'confirmed' });
  const handleCancel = (id: Id<'bookings'>) => updateStatus({ id, status: 'cancelled' });

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'إجمالي المواعيد', val: stats.total.toString(), icon: Calendar, color: 'text-blue-500' },
          { label: 'العملاء الجدد اليوم', val: `+${stats.newCustomers}`, icon: Users, color: 'text-brand-primary' },
          { label: 'دخل اليوم', val: `${stats.revenue.toLocaleString()} د.أ`, icon: TrendingUp, color: 'text-green-500' },
          { label: 'المواعيد القادمة', val: stats.upcoming.toString(), icon: Clock, color: 'text-brand-primary' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="bg-brand-surface-container p-6 border border-brand-outline-variant relative overflow-hidden group"
          >
            <stat.icon className={cn("absolute -bottom-4 -right-4 w-20 h-20 opacity-5 transition-transform group-hover:scale-110", stat.color)} />
            <h4 className="text-sm font-bold text-brand-on-surface-variant mb-2 uppercase tracking-wide">{stat.label}</h4>
            <div className="text-3xl font-black">{stat.val}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "px-6 py-3 text-sm font-black uppercase tracking-wider transition-[background-color,border-color,color,transform] duration-200 border active:scale-[0.97]",
              filter === f.id
                ? "bg-brand-primary border-brand-primary text-brand-on-primary"
                : "bg-brand-surface-container border-brand-outline-variant text-brand-on-surface-variant hover:border-brand-primary hover:text-brand-primary"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="min-h-[40vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" role="presentation" />
        </div>
      ) : (
        <div className="bg-brand-surface-container border border-brand-outline-variant overflow-hidden">
          <div className="p-6 border-b border-brand-outline-variant flex justify-between items-center bg-brand-surface-container-high">
            <h3 className="text-xl font-black">جميع المواعيد</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="text-brand-on-surface-variant font-bold text-sm bg-brand-surface-container-highest/20 border-b border-brand-outline-variant">
                  <th className="p-6">الـعـمـيـل</th>
                  <th className="p-6">الـخدمـة</th>
                  <th className="p-6">التـاريـخ</th>
                  <th className="p-6">الـوقـت</th>
                  <th className="p-6">الـسـعر</th>
                  <th className="p-6">الـحـالـة</th>
                  <th className="p-6">الإجـراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking._id} className="border-b border-brand-outline-variant/30 hover:bg-brand-surface transition-colors">
                      <td className="p-6 font-bold">{booking.customerName}</td>
                      <td className="p-6 text-brand-on-surface-variant italic">{booking.serviceName}</td>
                      <td className="p-6 text-brand-on-surface-variant">{booking.date}</td>
                      <td className="p-6 flex items-center gap-2">
                        <Clock size={16} className="text-brand-primary" />
                        {booking.time}
                      </td>
                      <td className="p-6 font-black text-brand-primary">{booking.price} د.أ</td>
                      <td className="p-6">
                        <span className={cn(
                          "px-4 py-1.5 text-sm font-black uppercase italic",
                          booking.status === 'completed' && "bg-green-500/10 text-green-500 border border-green-500/50",
                          booking.status === 'confirmed' && "bg-blue-500/10 text-blue-500 border border-blue-500/50",
                          booking.status === 'pending' && "bg-yellow-500/10 text-yellow-500 border border-yellow-500/50",
                          booking.status === 'cancelled' && "bg-red-500/10 text-red-500 border border-red-500/50",
                        )}>
                          {booking.status === 'completed' ? 'تمت'
                            : booking.status === 'confirmed' ? 'مؤكد'
                            : booking.status === 'pending' ? 'قيد الانتظار'
                            : 'ملغي'}
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex gap-2">
                            <button
                              onClick={() => handleConfirm(booking._id)}
                              disabled={booking.status === 'confirmed' || booking.status === 'completed' || booking.status === 'cancelled'}
                              className="p-3 bg-brand-surface-container border border-brand-outline-variant text-green-500 hover:bg-green-500 hover:text-white transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed"
                              aria-label="تأكيد الحجز"
                            >
                              <CheckCircle2 size={16} />
                            </button>
                            <button
                              onClick={() => handleCancel(booking._id)}
                              disabled={booking.status === 'cancelled'}
                              className="p-3 bg-brand-surface-container border border-brand-outline-variant text-red-500 hover:bg-red-500 hover:text-white transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed"
                              aria-label="إلغاء الحجز"
                            >
                              <XCircle size={16} />
                            </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-brand-on-surface-variant font-bold italic">
                      {allBookings.length === 0 ? 'لا توجد مواعيد بعد.' : 'لا توجد مواعيد بهذا التصنيف حاليًا.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Services ─── */

function ServicesTab() {
  const services = useQuery(api.services.list) ?? [];
  const createService = useMutation(api.services.create);
  const updateService = useMutation(api.services.update);
  const removeService = useMutation(api.services.remove);
  const seedServices = useMutation(api.services.seed);
  const [seeding, setSeeding] = React.useState(false);
  const [editing, setEditing] = React.useState<Id<'services'> | null>(null);
  const [showForm, setShowForm] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', price: 0, durationMinutes: 30, category: 'hair' as Category, description: '' });

  const openAdd = () => {
    setEditing(null);
    setForm({ name: '', price: 0, durationMinutes: 30, category: 'hair', description: '' });
    setShowForm(true);
  };

  const openEdit = (s: typeof services[number]) => {
    setEditing(s._id);
    setForm({ name: s.name, price: s.price, durationMinutes: s.durationMinutes, category: s.category, description: s.description });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    if (editing) {
      await updateService({ id: editing, ...form });
    } else {
      await createService(form);
    }
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-8">
        <button onClick={openAdd} className="px-6 py-3 bg-brand-primary text-brand-on-primary font-black flex items-center gap-2 press-active">
          <Plus className="w-4 h-4" />
          إضافة خدمة
        </button>
<button
              onClick={async () => { setSeeding(true); await seedServices(); setSeeding(false); }}
              disabled={seeding}
              className="px-6 py-4 bg-brand-surface-container border border-brand-outline-variant hover:border-brand-primary transition-[border-color,color,transform] duration-200 flex items-center gap-2 font-black active:scale-[0.97] disabled:opacity-50"
        >
          <RefreshCw className={cn("w-4 h-4", seeding && "animate-spin")} />
          {seeding ? 'جاري...' : 'تجهيز الخدمات الافتراضية'}
        </button>
      </div>

      <div className="bg-brand-surface-container border border-brand-outline-variant overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-brand-on-surface-variant font-bold text-sm bg-brand-surface-container-highest/20 border-b border-brand-outline-variant">
                <th className="p-6">الاسم</th>
                <th className="p-6">القسم</th>
                <th className="p-6">المدة</th>
                <th className="p-6">السعر</th>
                <th className="p-6">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s._id} className="border-b border-brand-outline-variant/30 hover:bg-brand-surface transition-colors">
                  <td className="p-6 font-bold">{s.name}</td>
                  <td className="p-6 text-brand-on-surface-variant">{categoryMeta.find(c => c.id === s.category)?.label}</td>
                  <td className="p-6 text-brand-on-surface-variant">{s.durationMinutes} دقيقة</td>
                  <td className="p-6 font-black text-brand-primary">{s.price} د.أ</td>
                  <td className="p-6">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(s)} className="p-3 bg-brand-surface-container border border-brand-outline-variant text-brand-primary hover:bg-brand-primary hover:text-brand-on-primary transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.97]" aria-label="تعديل الخدمة">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => removeService({ id: s._id })} className="p-3 bg-brand-surface-container border border-brand-outline-variant text-red-500 hover:bg-red-500 hover:text-white transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.97]" aria-label="حذف الخدمة">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-brand-on-surface-variant font-bold italic">
                    لا توجد خدمات بعد. اضف خدمة جديدة أو استخدم التجهيز الافتراضي.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Service Form Modal */}
      <Modal open={showForm} onClose={() => setShowForm(false)} title={editing ? 'تعديل الخدمة' : 'إضافة خدمة'}>
        <div className="space-y-5">
          <div>
            <label htmlFor="service-name" className="text-sm font-bold text-brand-on-surface-variant block mb-2">اسم الخدمة</label>
            <input id="service-name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-brand-surface border-2 border-brand-outline-variant p-3 focus:border-brand-primary outline-none transition-colors" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="service-price" className="text-sm font-bold text-brand-on-surface-variant block mb-2">السعر</label>
              <input id="service-price" type="number" value={form.price} onChange={e => setForm({ ...form, price: +e.target.value })} className="w-full bg-brand-surface border-2 border-brand-outline-variant p-3 focus:border-brand-primary outline-none transition-colors" />
            </div>
            <div>
              <label htmlFor="service-duration" className="text-sm font-bold text-brand-on-surface-variant block mb-2">المدة (دقيقة)</label>
              <input id="service-duration" type="number" value={form.durationMinutes} onChange={e => setForm({ ...form, durationMinutes: +e.target.value })} className="w-full bg-brand-surface border-2 border-brand-outline-variant p-3 focus:border-brand-primary outline-none transition-colors" />
            </div>
            <div>
              <label htmlFor="service-category" className="text-sm font-bold text-brand-on-surface-variant block mb-2">القسم</label>
              <select id="service-category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value as Category })} className="w-full bg-brand-surface border-2 border-brand-outline-variant p-3 focus:border-brand-primary outline-none transition-colors">
                {categoryMeta.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="service-desc" className="text-sm font-bold text-brand-on-surface-variant block mb-2">الوصف</label>
            <textarea id="service-desc" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full bg-brand-surface border-2 border-brand-outline-variant p-3 focus:border-brand-primary outline-none transition-colors" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowForm(false)} className="px-6 py-3 border border-brand-outline-variant font-black press-active">إلغاء</button>
            <button onClick={handleSave} className="px-6 py-3 bg-brand-primary text-brand-on-primary font-black press-active">حفظ</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

/* ─── Gallery ─── */

function GalleryTab() {
  const items = useQuery(api.gallery.list) ?? [];
  const createItem = useMutation(api.gallery.create);
  const updateItem = useMutation(api.gallery.update);
  const removeItem = useMutation(api.gallery.remove);
  const [editing, setEditing] = React.useState<Id<'gallery'> | null>(null);
  const [showForm, setShowForm] = React.useState(false);
  const [form, setForm] = React.useState({ title: '', category: '', url: '', order: 0 });

  const openAdd = () => {
    setEditing(null);
    setForm({ title: '', category: '', url: '', order: items.length + 1 });
    setShowForm(true);
  };

  const openEdit = (item: typeof items[number]) => {
    setEditing(item._id);
    setForm({ title: item.title, category: item.category, url: item.url, order: item.order });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.url.trim()) return;
    if (editing) {
      await updateItem({ id: editing, ...form });
    } else {
      await createItem(form);
    }
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-8">
        <button onClick={openAdd} className="px-6 py-3 bg-brand-primary text-brand-on-primary font-black flex items-center gap-2 press-active">
          <Plus className="w-4 h-4" />
          إضافة صورة
        </button>
      </div>

      <div className="bg-brand-surface-container border border-brand-outline-variant overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-brand-on-surface-variant font-bold text-sm bg-brand-surface-container-highest/20 border-b border-brand-outline-variant">
                <th className="p-6">الصورة</th>
                <th className="p-6">العنوان</th>
                <th className="p-6">التصنيف</th>
                <th className="p-6">الترتيب</th>
                <th className="p-6">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b border-brand-outline-variant/30 hover:bg-brand-surface transition-colors">
                  <td className="p-6">
                    <img src={item.url} alt={item.title} className="w-16 h-16 object-cover grayscale" />
                  </td>
                  <td className="p-6 font-bold">{item.title}</td>
                  <td className="p-6 text-brand-on-surface-variant">{item.category}</td>
                  <td className="p-6 text-brand-on-surface-variant">{item.order}</td>
                  <td className="p-6">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(item)} className="p-3 bg-brand-surface-container border border-brand-outline-variant text-brand-primary hover:bg-brand-primary hover:text-brand-on-primary transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.97]" aria-label="تعديل الصورة">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => removeItem({ id: item._id })} className="p-3 bg-brand-surface-container border border-brand-outline-variant text-red-500 hover:bg-red-500 hover:text-white transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.97]" aria-label="حذف الصورة">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-brand-on-surface-variant font-bold italic">
                    لا توجد صور في المعرض بعد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={showForm} onClose={() => setShowForm(false)} title={editing ? 'تعديل الصورة' : 'إضافة صورة'}>
        <div className="space-y-5">
          <div>
            <label htmlFor="gallery-title" className="text-sm font-bold text-brand-on-surface-variant block mb-2">العنوان</label>
            <input id="gallery-title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full bg-brand-surface border-2 border-brand-outline-variant p-3 focus:border-brand-primary outline-none transition-colors" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="gallery-category" className="text-sm font-bold text-brand-on-surface-variant block mb-2">التصنيف</label>
              <input id="gallery-category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full bg-brand-surface border-2 border-brand-outline-variant p-3 focus:border-brand-primary outline-none transition-colors" />
            </div>
            <div>
              <label htmlFor="gallery-order" className="text-sm font-bold text-brand-on-surface-variant block mb-2">الترتيب</label>
              <input id="gallery-order" type="number" value={form.order} onChange={e => setForm({ ...form, order: +e.target.value })} className="w-full bg-brand-surface border-2 border-brand-outline-variant p-3 focus:border-brand-primary outline-none transition-colors" />
            </div>
          </div>
          <div>
            <label htmlFor="gallery-url" className="text-sm font-bold text-brand-on-surface-variant block mb-2">رابط الصورة</label>
            <input id="gallery-url" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} className="w-full bg-brand-surface border-2 border-brand-outline-variant p-3 focus:border-brand-primary outline-none transition-colors" />
            {form.url && <img src={form.url} alt="Preview" className="mt-3 w-32 h-32 object-cover grayscale" />}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowForm(false)} className="px-6 py-3 border border-brand-outline-variant font-black press-active">إلغاء</button>
            <button onClick={handleSave} className="px-6 py-3 bg-brand-primary text-brand-on-primary font-black press-active">حفظ</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

/* ─── Messages ─── */

function MessagesTab() {
  const messages = useQuery(api.contacts.list) ?? [];
  const deleteMessage = useMutation(api.contacts.remove);
  const [selectedId, setSelectedId] = React.useState<Id<'contacts'> | null>(null);
  const selected = messages.find(m => m._id === selectedId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-brand-surface-container border border-brand-outline-variant overflow-hidden">
        <div className="p-6 border-b border-brand-outline-variant bg-brand-surface-container-high">
          <h3 className="text-xl font-black">الرسائل الواردة</h3>
        </div>
        <div className="divide-y divide-brand-outline-variant/30 max-h-[60vh] overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg._id}
              onClick={() => setSelectedId(msg._id)}
              className={cn(
                "p-5 cursor-pointer transition-colors hover:bg-brand-surface",
                selectedId === msg._id && "bg-brand-surface border-r-2 border-brand-primary"
              )}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold">{msg.name}</span>
                <span className="text-sm text-brand-on-surface-variant">{new Date(msg._creationTime).toLocaleDateString('ar-SA')}</span>
              </div>
              <p className="text-sm text-brand-on-surface-variant truncate">{msg.subject}</p>
              <p className="text-xs text-brand-outline mt-1 truncate">{msg.message.slice(0, 60)}...</p>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="p-12 text-center text-brand-on-surface-variant font-bold italic">لا توجد رسائل بعد.</div>
          )}
        </div>
      </div>

      <div className="bg-brand-surface-container border border-brand-outline-variant overflow-hidden">
        {selected ? (
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-brand-outline-variant bg-brand-surface-container-high flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black">{selected.subject}</h3>
                <p className="text-sm text-brand-on-surface-variant mt-1">
                  {selected.name} &lt;{selected.email}&gt;
                </p>
              </div>
              <button
                onClick={() => { deleteMessage({ id: selected._id }); setSelectedId(null); }}
                className="p-3 bg-brand-surface-container border border-brand-outline-variant text-red-500 hover:bg-red-500 hover:text-white transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.97]"
                aria-label="حذف الرسالة"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="p-6 flex-1">
              <p className="text-sm text-brand-on-surface-variant mb-2">
                {new Date(selected._creationTime).toLocaleString('ar-SA')}
              </p>
              <p className="leading-relaxed whitespace-pre-wrap">{selected.message}</p>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-brand-on-surface-variant font-bold italic flex items-center justify-center h-full">
            اختر رسالة لعرضها
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Content ─── */

function ContentTab() {
  const content = useQuery(api.siteContent.list) ?? [];
  const updateContent = useMutation(api.siteContent.update);
  const [local, setLocal] = React.useState<Record<string, string>>({});
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (content.length > 0) {
      setLocal(prev => {
        const merged = { ...prev };
        for (const item of content) {
          if (!(item.key in prev)) merged[item.key] = item.value;
        }
        return merged;
      });
    }
  }, [content]);

  const handleSave = async (id: Id<'siteContent'>, key: string) => {
    setSaving(true);
    await updateContent({ id, value: local[key] ?? '' });
    setSaving(false);
  };

  if (content.length === 0) {
    return (
      <div className="min-h-[30vh] flex items-center justify-center">
        <p className="text-brand-on-surface-variant font-bold italic">لم يتم تجهيز المحتوى بعد. قم بتشغيل البذر من قاعدة البيانات.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-brand-on-surface-variant font-bold text-sm mb-6">عدّل النصوص الظاهرة في الموقع مباشرة. التغييرات تنشر فوراً.</p>
      {content.map((item) => (
        <div key={item._id} className="bg-brand-surface-container p-5 border border-brand-outline-variant">
          <div className="flex justify-between items-start mb-3">
            <label className="text-sm font-bold text-brand-primary uppercase tracking-wider" htmlFor={`content-${item._id}`}>{item.key}</label>
            <button
              onClick={() => handleSave(item._id, item.key)}
              disabled={saving}
              className="px-5 py-3 bg-brand-primary text-brand-on-primary font-black text-sm press-active disabled:opacity-50 flex items-center gap-2"
            >
              <Save className="w-3 h-3" />
              حفظ
            </button>
          </div>
          <textarea
            id={`content-${item._id}`}
            value={local[item.key] ?? item.value}
            onChange={e => setLocal({ ...local, [item.key]: e.target.value })}
            rows={3}
            className="w-full bg-brand-surface border-2 border-brand-outline-variant p-3 focus:border-brand-primary outline-none transition-colors text-sm"
          />
        </div>
      ))}
    </div>
  );
}

/* ─── Team ─── */

function TeamTab() {
  const barbers = useQuery(api.barbers.list) ?? [];
  const createBarber = useMutation(api.barbers.create);
  const updateBarber = useMutation(api.barbers.update);
  const removeBarber = useMutation(api.barbers.remove);
  const [editing, setEditing] = React.useState<Id<'barbers'> | null>(null);
  const [showForm, setShowForm] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', role: '', imageUrl: '', bio: '', sortOrder: 0 });

  const openAdd = () => {
    setEditing(null);
    setForm({ name: '', role: '', imageUrl: '', bio: '', sortOrder: barbers.length + 1 });
    setShowForm(true);
  };

  const openEdit = (b: typeof barbers[number]) => {
    setEditing(b._id);
    setForm({ name: b.name, role: b.role, imageUrl: b.imageUrl, bio: b.bio, sortOrder: b.sortOrder });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.imageUrl.trim()) return;
    if (editing) {
      await updateBarber({ id: editing, ...form });
    } else {
      await createBarber(form);
    }
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-8">
        <button onClick={openAdd} className="px-6 py-3 bg-brand-primary text-brand-on-primary font-black flex items-center gap-2 press-active">
          <Plus className="w-4 h-4" />
          إضافة حلاق
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {barbers.map((b) => (
          <div key={b._id} className="bg-brand-surface-container border border-brand-outline-variant p-6 flex flex-col items-center text-center group">
            <div className="w-28 h-28 rounded-full overflow-hidden mb-5 border-2 border-brand-outline-variant group-hover:border-brand-primary transition-colors duration-300">
              <img src={b.imageUrl} alt={b.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[transform,filter] duration-700 group-hover:scale-110" />
            </div>
            <h3 className="text-xl font-black mb-1">{b.name}</h3>
            <p className="text-brand-primary font-bold text-sm mb-3">{b.role}</p>
            <p className="text-brand-on-surface-variant text-sm leading-relaxed mb-5">{b.bio}</p>
            <div className="flex gap-2 mt-auto">
              <button onClick={() => openEdit(b)} className="p-3 bg-brand-surface-container border border-brand-outline-variant text-brand-primary hover:bg-brand-primary hover:text-brand-on-primary transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.97]" aria-label="تعديل الحلاق">
                <Pencil size={16} />
              </button>
              <button onClick={() => removeBarber({ id: b._id })} className="p-3 bg-brand-surface-container border border-brand-outline-variant text-red-500 hover:bg-red-500 hover:text-white transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.97]" aria-label="حذف الحلاق">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {barbers.length === 0 && (
          <div className="col-span-full p-12 text-center text-brand-on-surface-variant font-bold italic">
            لا يوجد حلاقين بعد. أضف أول حلاق.
          </div>
        )}
      </div>

      <Modal open={showForm} onClose={() => setShowForm(false)} title={editing ? 'تعديل الحلاق' : 'إضافة حلاق'}>
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
            <label htmlFor="barber-name" className="text-sm font-bold text-brand-on-surface-variant block mb-2">الاسم</label>
<input id="barber-name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-brand-surface border-2 border-brand-outline-variant p-3 focus:border-brand-primary outline-none transition-colors" />
          </div>
          <div>
            <label htmlFor="barber-role" className="text-sm font-bold text-brand-on-surface-variant block mb-2">المسمى</label>
            <input id="barber-role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="w-full bg-brand-surface border-2 border-brand-outline-variant p-3 focus:border-brand-primary outline-none transition-colors" placeholder="حلاق خبير" />
          </div>
        </div>
        <div>
          <label htmlFor="barber-image" className="text-sm font-bold text-brand-on-surface-variant block mb-2">رابط الصورة</label>
          <input id="barber-image" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} className="w-full bg-brand-surface border-2 border-brand-outline-variant p-3 focus:border-brand-primary outline-none transition-colors" />
          {form.imageUrl && <img src={form.imageUrl} alt="Preview" className="mt-3 w-20 h-20 object-cover rounded-full grayscale" />}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="barber-bio" className="text-sm font-bold text-brand-on-surface-variant block mb-2">نبذة</label>
              <textarea id="barber-bio" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} rows={2} className="w-full bg-brand-surface border-2 border-brand-outline-variant p-3 focus:border-brand-primary outline-none transition-colors" />
            </div>
            <div>
              <label htmlFor="barber-sortorder" className="text-sm font-bold text-brand-on-surface-variant block mb-2">الترتيب</label>
              <input id="barber-sortorder" type="number" value={form.sortOrder} onChange={e => setForm({ ...form, sortOrder: +e.target.value })} className="w-full bg-brand-surface border-2 border-brand-outline-variant p-3 focus:border-brand-primary outline-none transition-colors" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowForm(false)} className="px-6 py-3 border border-brand-outline-variant font-black press-active">إلغاء</button>
            <button onClick={handleSave} className="px-6 py-3 bg-brand-primary text-brand-on-primary font-black press-active">حفظ</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

/* ─── Modal ─── */

function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  const modalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const el = modalRef.current;
    if (!el) return;
    const closeBtn = el.querySelector<HTMLButtonElement>('button[aria-label="إغلاق"]');
    closeBtn?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;
      const focusable = el.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
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
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title} ref={modalRef}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-surface/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-10 bg-brand-surface-container border border-brand-outline-variant w-full max-w-lg p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black">{title}</h3>
              <button onClick={onClose} className="p-3 text-brand-on-surface-variant hover:text-brand-primary transition-[color,background-color,border-color,transform] active:scale-[0.97]" aria-label="إغلاق">
                <X className="w-5 h-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
