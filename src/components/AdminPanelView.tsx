import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  Users,
  Briefcase,
  DollarSign,
  CheckCircle2,
  XCircle,
  Star,
  Trash2,
  Sliders,
  Sparkles,
  Tag,
  Search,
  HardDrive,
} from 'lucide-react';
import { Service } from '../types';

export const AdminPanelView: React.FC = () => {
  const {
    services,
    orders,
    resources,
    categories,
    sellers,
    updateService,
    deleteService,
    showToast,
  } = useApp();

  const [adminTab, setAdminTab] = useState<'overview' | 'services' | 'users' | 'resources' | 'settings'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [platformCommission, setPlatformCommission] = useState(10); // 10%

  // Simulated users
  const [userList, setUserList] = useState([
    { id: 'user-seller-anas', name: 'Anas Mahmud', email: 'anas@anasgraphics.com', role: 'Seller', status: 'Active' },
    { id: 'user-seller-elena', name: 'Elena Vance', email: 'elena@vectorart.io', role: 'Seller', status: 'Active' },
    { id: 'user-seller-tariq', name: 'Tariq Rahman', email: 'tariq@creatorhub.net', role: 'Seller', status: 'Active' },
    { id: 'user-buyer-1', name: 'Alex Rivera', email: 'alex@brandlaunch.co', role: 'Buyer', status: 'Active' },
    { id: 'user-buyer-2', name: 'Sophia Sterling', email: 'sophia@luxurymedia.com', role: 'Buyer', status: 'Active' },
  ]);

  const totalRevenue = orders
    .filter((o) => o.status === 'Completed')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const platformEarnings = (totalRevenue * platformCommission) / 100;
  const activeOrdersCount = orders.filter((o) => o.status === 'Active' || o.status === 'Revision Requested').length;
  const completedOrdersCount = orders.filter((o) => o.status === 'Completed').length;

  const toggleUserStatus = (id: string) => {
    setUserList((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u
      )
    );
    showToast('User status updated by Administrator', 'info');
  };

  return (
    <div className="py-8 sm:py-10 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Staff & Moderation Authority
              </div>
              <h1 className="text-2xl font-extrabold text-white font-heading">
                ANAS Graphics Admin Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
              Platform Take Rate: <strong className="text-amber-400">{platformCommission}%</strong>
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 border-b border-slate-800 no-scrollbar">
          {[
            { id: 'overview', label: 'Platform Metrics' },
            { id: 'services', label: `Service Gigs (${services.length})` },
            { id: 'users', label: `Users & Creators (${userList.length})` },
            { id: 'resources', label: `Digital Assets (${resources.length})` },
            { id: 'settings', label: 'Escrow & Commission' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition shrink-0 ${
                adminTab === tab.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. OVERVIEW METRICS */}
        {adminTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
                <span className="text-xs font-bold text-slate-400 uppercase">Gross Marketplace Volume</span>
                <div className="text-2xl font-extrabold text-white font-heading mt-1">
                  ${(totalRevenue + 850).toFixed(2)}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Escrow transactions processed</p>
              </div>

              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
                <span className="text-xs font-bold text-slate-400 uppercase">Platform Revenue</span>
                <div className="text-2xl font-extrabold text-amber-400 font-heading mt-1">
                  ${(platformEarnings + 85).toFixed(2)}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">From {platformCommission}% service margin</p>
              </div>

              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
                <span className="text-xs font-bold text-slate-400 uppercase">Total Orders</span>
                <div className="text-2xl font-extrabold text-indigo-400 font-heading mt-1">
                  {orders.length}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">{completedOrdersCount} completed, {activeOrdersCount} in progress</p>
              </div>

              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
                <span className="text-xs font-bold text-slate-400 uppercase">Active Creators & Users</span>
                <div className="text-2xl font-extrabold text-emerald-400 font-heading mt-1">
                  {userList.length + sellers.length}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Verified graphic designers</p>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
              <h2 className="text-base font-bold text-white font-heading mb-4">
                Recent Escrow Orders
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="text-[10px] uppercase text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="pb-3">Order Number</th>
                      <th className="pb-3">Service</th>
                      <th className="pb-3">Buyer</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Payment</th>
                      <th className="pb-3">Escrow Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-slate-850">
                        <td className="py-3 font-mono font-bold text-slate-400">#{o.orderNumber}</td>
                        <td className="py-3 font-medium text-white max-w-xs truncate">{o.item.serviceTitle}</td>
                        <td className="py-3">{o.buyerName}</td>
                        <td className="py-3 font-bold text-emerald-400">${o.totalAmount}</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                            PAID (ESCROW)
                          </span>
                        </td>
                        <td className="py-3">
                          <span className="capitalize">{o.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. SERVICES MODERATION */}
        {adminTab === 'services' && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4">
            <h2 className="text-base font-bold text-white font-heading">
              Service Gigs Moderation
            </h2>

            <div className="divide-y divide-slate-800">
              {services.map((s) => (
                <div key={s.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={s.gallery[0]}
                      alt={s.title}
                      className="w-14 h-14 rounded-xl object-cover ring-1 ring-slate-800 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-indigo-400 uppercase">{s.category}</span>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{s.title}</h4>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        Base: ${s.packages.basic.price} • Status:{' '}
                        <strong
                          className={s.status === 'active' ? 'text-emerald-400' : 'text-amber-400'}
                        >
                          {s.status}
                        </strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {s.status === 'active' ? (
                      <button
                        onClick={() => {
                          updateService(s.id, { status: 'draft' });
                          showToast('Service status set to draft/paused by admin', 'info');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-medium"
                      >
                        Pause Service
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          updateService(s.id, { status: 'active' });
                          showToast('Service approved & published', 'success');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium"
                      >
                        Approve Gig
                      </button>
                    )}

                    <button
                      onClick={() => {
                        deleteService(s.id);
                        showToast('Service removed from marketplace', 'error');
                      }}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-rose-400 transition"
                      title="Delete Service"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. USER MANAGEMENT */}
        {adminTab === 'users' && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4">
            <h2 className="text-base font-bold text-white font-heading">
              User Accounts & Creator Verification
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="text-[10px] uppercase text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Email</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Moderation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {userList.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-850">
                      <td className="py-3 font-bold text-white">{u.name}</td>
                      <td className="py-3 text-slate-400">{u.email}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3">
                        <span
                          className={`text-xs font-bold ${
                            u.status === 'Active' ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            u.status === 'Active'
                              ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                          }`}
                        >
                          {u.status === 'Active' ? 'Suspend Account' : 'Reactivate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. DIGITAL RESOURCES */}
        {adminTab === 'resources' && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4">
            <h2 className="text-base font-bold text-white font-heading">
              Digital Assets & Templates Moderation ({resources.length})
            </h2>

            <div className="divide-y divide-slate-800">
              {resources.map((r) => (
                <div key={r.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={r.previewImage} alt={r.title} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <span className="text-[10px] font-bold text-violet-400 uppercase">.{r.fileType}</span>
                      <h4 className="font-bold text-white">{r.title}</h4>
                      <span className="text-slate-400 text-[11px]">
                        Creator: {r.creatorName} • {r.downloadCount} downloads • {r.isFree ? 'Free' : `$${r.price}`}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => showToast(`Resource #${r.id} flagged for review`, 'info')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Inspect File
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. SETTINGS */}
        {adminTab === 'settings' && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 max-w-xl">
            <h2 className="text-base font-bold text-white font-heading">
              Marketplace Commission & Escrow Settings
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Platform Commission Fee (%):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={platformCommission}
                  onChange={(e) => setPlatformCommission(Number(e.target.value))}
                  className="w-24 p-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 font-bold text-center text-sm"
                />
                <span className="text-xs text-slate-400">
                  Current platform revenue split: {100 - platformCommission}% creator / {platformCommission}% platform
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
              <span className="font-bold text-slate-300 block">Security Note:</span>
              <p>
                In compliance with architectural guidelines, payment integration credentials and admin tokens are decoupled from client bundles.
              </p>
            </div>

            <button
              onClick={() => showToast('Commission settings saved successfully!', 'success')}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition"
            >
              Save Platform Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
