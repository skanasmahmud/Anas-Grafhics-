import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  RefreshCw,
  Download,
  MessageSquare,
  Star,
  ExternalLink,
} from 'lucide-react';
import { Order, OrderStatus } from '../types';

export const BuyerDashboardView: React.FC = () => {
  const {
    orders,
    currentUser,
    getSellerById,
    openChatWithSeller,
    acceptAndCompleteOrder,
    requestOrderRevision,
    setIsReviewModalOpen,
    setReviewModalOrder,
    setCurrentView,
    setSelectedService,
    services,
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<'all' | OrderStatus>('all');
  const [revisionNotes, setRevisionNotes] = useState<{ [orderId: string]: string }>({});
  const [showRevisionInput, setShowRevisionInput] = useState<{ [orderId: string]: boolean }>({});

  const buyerOrders = orders.filter((o) => o.buyerId === currentUser.id);

  const filteredOrders = buyerOrders.filter((o) => {
    if (filterStatus === 'all') return true;
    return o.status === filterStatus;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Clock className="w-3 h-3" /> In Progress
          </span>
        );
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 animate-pulse">
            <AlertCircle className="w-3 h-3" /> Delivered (Action Required)
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> Completed
          </span>
        );
      case 'Revision Requested':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/30">
            <RefreshCw className="w-3 h-3" /> Revision Requested
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">
            Cancelled
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            Pending Requirements
          </span>
        );
    }
  };

  const handleCompleteOrder = (order: Order) => {
    acceptAndCompleteOrder(order.id);
    setReviewModalOrder(order);
    setIsReviewModalOpen(true);
  };

  const handleSendRevision = (orderId: string) => {
    const note = revisionNotes[orderId];
    if (note && note.trim()) {
      requestOrderRevision(orderId, note.trim());
      setShowRevisionInput((prev) => ({ ...prev, [orderId]: false }));
      setRevisionNotes((prev) => ({ ...prev, [orderId]: '' }));
    }
  };

  const activeCount = buyerOrders.filter((o) => o.status === 'Active' || o.status === 'Revision Requested').length;
  const deliveredCount = buyerOrders.filter((o) => o.status === 'Delivered').length;
  const completedCount = buyerOrders.filter((o) => o.status === 'Completed').length;

  return (
    <div className="py-8 sm:py-10 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Buyer Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
              My Orders & Projects
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Track active creative commissions, inspect deliverables, and manage escrow releases.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('services')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition self-start sm:self-auto"
          >
            Explore More Services
          </button>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase">In Progress</span>
            <div className="text-xl sm:text-2xl font-extrabold text-blue-400 mt-1">{activeCount}</div>
          </div>
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Delivered Pending Review</span>
            <div className="text-xl sm:text-2xl font-extrabold text-amber-400 mt-1">{deliveredCount}</div>
          </div>
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Completed Deliveries</span>
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 mt-1">{completedCount}</div>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
          {[
            { id: 'all', label: `All Orders (${buyerOrders.length})` },
            { id: 'Active', label: `Active (${activeCount})` },
            { id: 'Delivered', label: `Delivered (${deliveredCount})` },
            { id: 'Completed', label: `Completed (${completedCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 border ${
                filterStatus === tab.id
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 p-8">
            <FileCheck className="w-12 h-12 mx-auto text-slate-600 mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No orders in this view</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              Browse our verified designers to commission logos, banners, or PixelLab PLP projects.
            </p>
            <button
              onClick={() => setCurrentView('services')}
              className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl"
            >
              Browse Creative Services
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const seller = getSellerById(order.sellerId);
              const isDelivered = order.status === 'Delivered';
              const isCompleted = order.status === 'Completed';

              return (
                <div
                  key={order.id}
                  className={`bg-slate-900 rounded-2xl border p-5 sm:p-6 transition-all ${
                    isDelivered
                      ? 'border-amber-500/50 shadow-lg shadow-amber-500/10'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-slate-400">
                          Order #{order.orderNumber}
                        </span>
                        {getStatusBadge(order.status)}
                      </div>
                      <h2 className="text-base font-bold text-white hover:text-indigo-400 transition">
                        {order.item.serviceTitle}
                      </h2>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                        <span>
                          Package:{' '}
                          <strong className="text-slate-200 uppercase">{order.item.packageTier}</strong>
                        </span>
                        <span>•</span>
                        <span>Placed: {order.createdAt}</span>
                        <span>•</span>
                        <span>
                          Amount:{' '}
                          <strong className="text-emerald-400 font-mono">${order.totalAmount}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Seller badge & Contact Action */}
                    <div className="flex items-center gap-3">
                      <img
                        src={order.sellerAvatar || seller?.avatar}
                        alt={order.sellerName || seller?.displayName}
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-700"
                      />
                      <div>
                        <span className="text-xs font-bold text-white block">
                          {order.sellerName || seller?.displayName}
                        </span>
                        <span className="text-[11px] text-slate-400">Verified Designer</span>
                      </div>
                      <button
                        onClick={() => openChatWithSeller(order.sellerId, order.id)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 transition ml-2"
                        title="Chat with designer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Message</span>
                      </button>
                    </div>
                  </div>

                  {/* Requirements & Order brief */}
                  <div className="py-4 text-xs space-y-2">
                    <span className="font-bold text-slate-400 block uppercase tracking-wider text-[10px]">
                      Your Requirements Brief:
                    </span>
                    <p className="text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
                      {order.requirementsNotes || 'Design brief provided during escrow setup.'}
                    </p>
                  </div>

                  {/* Delivered Files & Work Section */}
                  {(order.deliveryNotes || (order.deliveryFiles && order.deliveryFiles.length > 0)) && (
                    <div className="mt-2 p-4 rounded-xl bg-gradient-to-r from-slate-950 to-indigo-950/30 border border-indigo-500/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Delivery Received from Designer</span>
                        </div>
                      </div>

                      {order.deliveryNotes && (
                        <p className="text-xs text-slate-300 leading-relaxed italic">
                          "{order.deliveryNotes}"
                        </p>
                      )}

                      {order.deliveryFiles && order.deliveryFiles.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {order.deliveryFiles.map((file, fIdx: number) => (
                            <a
                              key={fIdx}
                              href={file.fileUrl || '#download'}
                              onClick={(e) => {
                                e.preventDefault();
                                alert(`Downloading deliverables: ${file.fileName}`);
                              }}
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-indigo-300 text-xs font-medium border border-slate-700 transition"
                            >
                              <Download className="w-3.5 h-3.5 text-indigo-400" />
                              <span>{file.fileName}</span>
                              <span className="text-[10px] text-slate-500">({file.fileSize})</span>
                            </a>
                          ))}
                        </div>
                      )}

                      {/* Delivered Action Bar (Accept & Release Escrow vs Request Revision) */}
                      {isDelivered && (
                        <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
                          <button
                            onClick={() => handleCompleteOrder(order)}
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center gap-1.5 transition"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Accept & Release Escrow</span>
                          </button>

                          <button
                            onClick={() =>
                              setShowRevisionInput((prev) => ({
                                ...prev,
                                [order.id]: !prev[order.id],
                              }))
                            }
                            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition"
                          >
                            <RefreshCw className="w-3.5 h-3.5 text-violet-400" />
                            <span>Request Revision</span>
                          </button>
                        </div>
                      )}

                      {/* Revision Input Box */}
                      {showRevisionInput[order.id] && (
                        <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                          <label className="block text-xs font-bold text-slate-300">
                            Describe the changes needed:
                          </label>
                          <textarea
                            rows={2}
                            value={revisionNotes[order.id] || ''}
                            onChange={(e) =>
                              setRevisionNotes({ ...revisionNotes, [order.id]: e.target.value })
                            }
                            placeholder="e.g. Please increase the font size of the subtitle and tweak the background shade..."
                            className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-violet-500"
                          />
                          <button
                            onClick={() => handleSendRevision(order.id)}
                            className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition"
                          >
                            Send Revision Request
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Completed Review Banner */}
                  {isCompleted && (
                    <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                        <CheckCircle2 className="w-4 h-4" /> Funds successfully released from escrow to creator
                      </span>
                      <button
                        onClick={() => {
                          setReviewModalOrder(order);
                          setIsReviewModalOpen(true);
                        }}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                      >
                        <Star className="w-3.5 h-3.5 fill-indigo-400 text-indigo-400" />
                        <span>Leave / Edit Review</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
