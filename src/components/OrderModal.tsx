import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, ShieldCheck, Clock, RefreshCw, CheckCircle2, Lock, Paperclip } from 'lucide-react';

export const OrderModal: React.FC = () => {
  const {
    isOrderModalOpen,
    setIsOrderModalOpen,
    selectedService,
    orderModalPackage,
    createOrder,
    setCurrentView,
    getSellerById,
  } = useApp();

  const [requirementsText, setRequirementsText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'paypal' | 'escrow'>('card');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  if (!isOrderModalOpen || !selectedService) return null;

  const pkg = selectedService.packages[orderModalPackage];
  const seller = getSellerById(selectedService.sellerId);
  const serviceFee = 2.5;
  const totalAmount = pkg.price + serviceFee;

  const handleSimulateFileUpload = () => {
    const mockFileName = `project_assets_${Math.floor(Math.random() * 1000)}.zip`;
    setUploadedFiles((prev) => [...prev, mockFileName]);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      createOrder(selectedService, orderModalPackage, requirementsText);
      setIsSubmitting(false);
      setIsOrderModalOpen(false);
      setRequirementsText('');
      setUploadedFiles([]);
      setCurrentView('buyer-dashboard');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 text-slate-100">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
              Escrow Checkout
            </span>
            <h2 className="text-lg font-bold text-white font-heading">
              Order {pkg.name} Package
            </h2>
          </div>
          <button
            onClick={() => setIsOrderModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Form */}
        <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
          {/* Service & Package Summary */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-4">
            <img
              src={selectedService.gallery[0]}
              alt={selectedService.title}
              className="w-16 h-16 rounded-xl object-cover ring-1 ring-slate-800 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                {selectedService.title}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                by <span className="text-slate-300 font-semibold">{seller?.displayName}</span>
              </p>
              <div className="flex items-center gap-3 text-[11px] text-indigo-300 font-medium mt-1.5">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {pkg.deliveryDays}d delivery
                </span>
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" /> {pkg.revisions} revisions
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-base font-extrabold text-white font-heading">
                ${pkg.price}
              </span>
            </div>
          </div>

          {/* Project Requirements */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1">
              Project Requirements & Creative Brief <span className="text-indigo-400">*</span>
            </label>
            <p className="text-[11px] text-slate-400 mb-2">
              Share details about your brand name, color preferences, copy, or any design inspiration:
            </p>
            <textarea
              required
              rows={3}
              value={requirementsText}
              onChange={(e) => setRequirementsText(e.target.value)}
              placeholder="e.g. Brand name is 'Vertex Studio'. We need a sleek minimal logo with deep indigo and titanium tones. Vector files required."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* File attachment simulation */}
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={handleSimulateFileUpload}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition"
              >
                <Paperclip className="w-3.5 h-3.5" />
                <span>Attach Reference File</span>
              </button>
              {uploadedFiles.map((fn, i) => (
                <span key={i} className="text-[11px] text-indigo-400 bg-indigo-950/40 px-2 py-1 rounded-md border border-indigo-800/40">
                  {fn}
                </span>
              ))}
            </div>
          </div>

          {/* Simulated Payment Method (Architecture-ready: No raw card numbers stored) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-200">
              Payment Method (Simulated Sandbox)
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setSelectedPaymentMethod('card')}
                className={`p-3 rounded-xl border text-xs font-semibold text-center transition ${
                  selectedPaymentMethod === 'card'
                    ? 'border-indigo-500 bg-indigo-950/40 text-white shadow-sm'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                Credit / Debit Card
              </button>
              <button
                type="button"
                onClick={() => setSelectedPaymentMethod('paypal')}
                className={`p-3 rounded-xl border text-xs font-semibold text-center transition ${
                  selectedPaymentMethod === 'paypal'
                    ? 'border-indigo-500 bg-indigo-950/40 text-white shadow-sm'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                PayPal
              </button>
              <button
                type="button"
                onClick={() => setSelectedPaymentMethod('escrow')}
                className={`p-3 rounded-xl border text-xs font-semibold text-center transition ${
                  selectedPaymentMethod === 'escrow'
                    ? 'border-indigo-500 bg-indigo-950/40 text-white shadow-sm'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                ANAS Escrow Wallet
              </button>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>{pkg.name} Package</span>
              <span>${pkg.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Platform Escrow & Processing Fee</span>
              <span>${serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800/60">
              <span>Total Due</span>
              <span className="text-indigo-400 font-heading">${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Escrow Guarantee Statement */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Your funds are held securely in ANAS Escrow. The seller is only compensated once you inspect and approve the completed design.
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
            id="order-modal-submit-btn"
          >
            <Lock className="w-4 h-4" />
            <span>{isSubmitting ? 'Securing Escrow Payment...' : `Confirm & Place Order ($${totalAmount.toFixed(2)})`}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
