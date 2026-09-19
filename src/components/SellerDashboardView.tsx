import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  DollarSign,
  Briefcase,
  CheckCircle2,
  Clock,
  Star,
  PlusCircle,
  Eye,
  PauseCircle,
  PlayCircle,
  Trash2,
  Send,
  MessageSquare,
  Upload,
  AlertCircle,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { Order, Service } from '../types';

export const SellerDashboardView: React.FC = () => {
  const {
    currentUser,
    services,
    orders,
    reviews,
    deliverOrder,
    updateService,
    deleteService,
    setCurrentView,
    setSelectedService,
    openChatWithSeller,
    showToast,
    replyToReview,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'orders' | 'earnings' | 'reviews'>('overview');
  const [deliveringOrder, setDeliveringOrder] = useState<Order | null>(null);
  const [deliveryMessage, setDeliveryMessage] = useState('');
  const [deliveryFiles, setDeliveryFiles] = useState<{ name: string; size: string; downloadUrl: string }[]>([
    { name: 'final_vector_logo_brand_assets.zip', size: '24.8 MB', downloadUrl: '#download' },
    { name: 'pixellab_project_preset.plp', size: '8.4 MB', downloadUrl: '#download' },
  ]);

  // Review reply state
  const [replyingReviewId, setReplyingReviewId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Filter creator services & orders (also fallback to user-seller-anas if demo is seller)
  const effectiveSellerId = currentUser.id === 'user-seller-anas' ? currentUser.id : 'user-seller-anas';
  const myServices = services.filter((s) => s.sellerId === currentUser.id || s.sellerId === effectiveSellerId);
  const myOrders = orders.filter((o) => o.sellerId === currentUser.id || o.sellerId === effectiveSellerId);
  const myReviews = reviews.filter((r) => r.sellerId === currentUser.id || r.sellerId === effectiveSellerId);

  const activeOrders = myOrders.filter((o) => o.status === 'Active' || o.status === 'Revision Requested');
  const completedOrders = myOrders.filter((o) => o.status === 'Completed');
  const deliveredOrders = myOrders.filter((o) => o.status === 'Delivered');

  const totalEarnings = completedOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingEarnings = activeOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  const handleDeliverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveringOrder) return;

    const fileNames = deliveryFiles.map((df) => df.name);
    deliverOrder(
      deliveringOrder.id,
      deliveryMessage.trim() || 'Here is your completed project deliverables!',
      fileNames
    );
    setDeliveringOrder(null);
    setDeliveryMessage('');
  };

  const handleReplySubmit = (reviewId: string) => {
    if (!replyText.trim()) return;
    replyToReview(reviewId, replyText.trim());
    setReplyingReviewId(null);
    setReplyText('');
  };

  return (
    <div className="py-8 sm:py-10 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Creator Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                  {currentUser.name}
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 font-bold border border-indigo-500/30">
                  {currentUser.role === 'seller' ? 'Creator Hub' : 'Seller Mode'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage your graphic design services, active commissions, escrow milestones & reviews
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setCurrentView('create-service')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Gig</span>
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 border-b border-slate-800 no-scrollbar">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'services', label: `My Gigs (${myServices.length})` },
            { id: 'orders', label: `Active Orders (${myOrders.length})` },
            { id: 'earnings', label: `Earnings & Payouts ($${totalEarnings})` },
            { id: 'reviews', label: `Client Reviews (${myReviews.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition shrink-0 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
                <span className="text-xs font-bold text-slate-400 uppercase">Available Balance</span>
                <div className="text-2xl font-extrabold text-emerald-400 font-heading mt-1">
                  ${totalEarnings.toFixed(2)}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Ready for instant payout</p>
              </div>

              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
                <span className="text-xs font-bold text-slate-400 uppercase">In Escrow</span>
                <div className="text-2xl font-extrabold text-blue-400 font-heading mt-1">
                  ${pendingEarnings.toFixed(2)}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {activeOrders.length} active commissions
                </p>
              </div>

              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
                <span className="text-xs font-bold text-slate-400 uppercase">Completed Gigs</span>
                <div className="text-2xl font-extrabold text-white font-heading mt-1">
                  {completedOrders.length}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">100% order completion rate</p>
              </div>

              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
                <span className="text-xs font-bold text-slate-400 uppercase">Overall Rating</span>
                <div className="text-2xl font-extrabold text-amber-400 font-heading mt-1 flex items-center gap-1">
                  <Star className="w-5 h-5 fill-amber-400" />
                  <span>5.0</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">From {myReviews.length} verified reviews</p>
              </div>
            </div>

            {/* Quick Action Queue: Pending Deliveries */}
            {activeOrders.length > 0 && (
              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
                <h3 className="text-base font-bold text-white font-heading mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Orders Requiring Delivery</span>
                </h3>

                <div className="space-y-3">
                  {activeOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-mono font-bold text-slate-400">Order #{ord.orderNumber}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300">
                            ${ord.totalAmount} - {ord.item.packageTier.toUpperCase()}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1">{ord.item.serviceTitle}</h4>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                          Brief: {ord.requirementsNotes || 'Standard project requirements'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setDeliveringOrder(ord)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Deliver Work</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. ORDERS MANAGEMENT TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {myOrders.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 p-8">
                <Briefcase className="w-12 h-12 mx-auto text-slate-600 mb-3" />
                <h3 className="text-base font-bold text-white mb-1">No orders received yet</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                  Make sure your service descriptions and portfolio visuals are eye-catching!
                </p>
              </div>
            ) : (
              myOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-400">#{ord.orderNumber}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                          {ord.status.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white mt-1">{ord.item.serviceTitle}</h3>
                      <span className="text-xs text-slate-400">
                        Buyer: <strong className="text-slate-200">{ord.buyerName}</strong> • Escrow: ${ord.totalAmount}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {(ord.status === 'Active' || ord.status === 'Revision Requested') && (
                        <button
                          onClick={() => setDeliveringOrder(ord)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Deliver Work</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="text-xs space-y-1">
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Buyer Requirements:</span>
                    <p className="text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                      {ord.requirementsNotes || 'Standard creative brief provided.'}
                    </p>
                  </div>

                  {ord.deliveryNotes && (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                      <span className="font-bold text-emerald-400 block">
                        Work Delivered:
                      </span>
                      <p className="text-slate-300 italic">"{ord.deliveryNotes}"</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* 3. GIGS & SERVICES TAB */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white font-heading">
                My Published Services ({myServices.length})
              </h2>
              <button
                onClick={() => setCurrentView('create-service')}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>New Gig</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myServices.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                      <img
                        src={srv.gallery[0]}
                        alt={srv.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span
                        className={`absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                          srv.status === 'active'
                            ? 'bg-emerald-500/90 text-slate-950'
                            : 'bg-amber-500/90 text-slate-950'
                        }`}
                      >
                        {srv.status}
                      </span>
                    </div>

                    <div className="p-4">
                      <span className="text-[11px] text-indigo-400 font-semibold">{srv.category}</span>
                      <h3 className="text-sm font-bold text-white mt-1 line-clamp-2">{srv.title}</h3>
                      <div className="flex items-center justify-between text-xs text-slate-400 mt-3 pt-2 border-t border-slate-800">
                        <span>Starting at ${srv.packages.basic.price}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-white font-bold">{srv.rating.toFixed(1)}</span>
                          <span>({srv.reviewCount})</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-slate-800 flex items-center justify-between text-xs">
                    <button
                      onClick={() => {
                        setSelectedService(srv);
                        setCurrentView('service-detail');
                      }}
                      className="p-2 text-slate-300 hover:text-white flex items-center gap-1"
                      title="View public gig"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() =>
                        updateService(srv.id, {
                          status: srv.status === 'active' ? 'draft' : 'active',
                        })
                      }
                      className="p-2 text-slate-300 hover:text-amber-400 flex items-center gap-1"
                      title={srv.status === 'active' ? 'Pause Gig' : 'Activate Gig'}
                    >
                      {srv.status === 'active' ? (
                        <>
                          <PauseCircle className="w-3.5 h-3.5" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <PlayCircle className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Activate</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => deleteService(srv.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 transition"
                      title="Delete gig"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. EARNINGS TAB */}
        {activeTab === 'earnings' && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white font-heading">
              Earnings & Escrow Balances
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 font-bold uppercase">Available for Withdrawal</span>
                <div className="text-3xl font-extrabold text-emerald-400 font-heading mt-2">
                  ${totalEarnings.toFixed(2)}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 font-bold uppercase">In Escrow Clearance</span>
                <div className="text-3xl font-extrabold text-blue-400 font-heading mt-2">
                  ${pendingEarnings.toFixed(2)}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 font-bold uppercase">All-Time Revenue</span>
                <div className="text-3xl font-extrabold text-white font-heading mt-2">
                  ${(totalEarnings + 480).toFixed(2)}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Withdraw Funds</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Transfer your cleared balance to PayPal, Payoneer, or Local Bank Account
                </p>
              </div>

              <button
                onClick={() =>
                  showToast('Simulated payout requested: Payout dispatched within 24h.', 'success')
                }
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
              >
                Request Withdrawal (${totalEarnings.toFixed(2)})
              </button>
            </div>
          </div>
        )}

        {/* 5. REVIEWS RECEIVED TAB */}
        {activeTab === 'reviews' && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-6">
            <h2 className="text-lg font-bold text-white font-heading">
              Client Reviews & Public Responses
            </h2>

            {myReviews.length === 0 ? (
              <p className="text-xs text-slate-400 py-6">No client reviews received yet.</p>
            ) : (
              <div className="space-y-4">
                {myReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rev.buyerAvatar}
                          alt={rev.buyerName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <span className="text-xs font-bold text-white block">{rev.buyerName}</span>
                          <span className="text-[10px] text-slate-400">{rev.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{rev.rating}.0</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">"{rev.comment}"</p>

                    {/* Existing Seller Reply */}
                    {rev.sellerReply ? (
                      <div className="p-3 rounded-xl bg-slate-900 border border-indigo-500/30 text-xs">
                        <span className="text-indigo-300 font-bold text-[11px] block">Your Public Reply:</span>
                        <p className="text-slate-300 mt-1">{rev.sellerReply.comment}</p>
                      </div>
                    ) : (
                      <div>
                        {replyingReviewId === rev.id ? (
                          <div className="space-y-2 pt-2">
                            <textarea
                              rows={2}
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Write a polite, professional reply to this client..."
                              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleReplySubmit(rev.id)}
                                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                              >
                                Submit Reply
                              </button>
                              <button
                                onClick={() => setReplyingReviewId(null)}
                                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 text-xs"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setReplyingReviewId(rev.id);
                              setReplyText('');
                            }}
                            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                          >
                            Reply to Review
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* DELIVER WORK MODAL */}
        {deliveringOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 text-slate-100 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white font-heading">
                  Deliver Finished Work (Order #{deliveringOrder.orderNumber})
                </h3>
                <button
                  onClick={() => setDeliveringOrder(null)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleDeliverSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Delivery Message to Client <span className="text-indigo-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={deliveryMessage}
                    onChange={(e) => setDeliveryMessage(e.target.value)}
                    placeholder="Hello! Here are your final vector logo files, high-res PNGs, and the editable PixelLab PLP / Photoshop PSD files..."
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Deliverable Files</label>
                  <div className="space-y-1.5">
                    {deliveryFiles.map((df, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800"
                      >
                        <span className="font-mono text-indigo-300">{df.name}</span>
                        <span className="text-slate-500 text-[10px]">{df.size}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Delivery to Buyer</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
