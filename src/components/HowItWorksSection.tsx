import React, { useState } from 'react';
import { Search, FileCheck, RefreshCw, DownloadCloud, Sparkles, PlusCircle, DollarSign, ShieldCheck } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'buyer' | 'seller'>('buyer');

  return (
    <section className="py-12 sm:py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Seamless Experience
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-heading tracking-tight">
            How ANAS Graphics Works
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            A frictionless, escrow-backed creative marketplace tailored specifically for graphic design workflows
          </p>

          {/* Toggle Buyer / Seller tabs */}
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 mt-6">
            <button
              onClick={() => setActiveTab('buyer')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'buyer'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              For Project Buyers
            </button>
            <button
              onClick={() => setActiveTab('seller')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'seller'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              For Designers & Creators
            </button>
          </div>
        </div>

        {/* Workflow Steps */}
        {activeTab === 'buyer' ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 relative flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold mb-4">
                <Search className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-1">Step 01</span>
              <h3 className="text-base font-bold text-white mb-2">Discover & Choose</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Filter through verified services, compare 3 transparent package tiers, or grab instant PLP & PSD assets.
              </p>
            </div>

            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 relative flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold mb-4">
                <FileCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-1">Step 02</span>
              <h3 className="text-base font-bold text-white mb-2">Send Requirements</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Provide your logo name, colors, copy, and attachments. Funds remain securely in escrow until you approve.
              </p>
            </div>

            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 relative flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold mb-4">
                <RefreshCw className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-1">Step 03</span>
              <h3 className="text-base font-bold text-white mb-2">Collaborate & Polish</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive initial concepts directly in your dashboard. Request tweaks or adjustments according to package revisions.
              </p>
            </div>

            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 relative flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold mb-4">
                <DownloadCloud className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-1">Step 04</span>
              <h3 className="text-base font-bold text-white mb-2">Download & Review</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Accept the final delivery to unlock all vector files, fonts, and commercial rights. Leave a review for the creator.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold mb-4">
                <PlusCircle className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1">Step 01</span>
              <h3 className="text-base font-bold text-white mb-2">Publish Services & Assets</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Create custom gigs with 3 pricing tiers or upload downloadable PixelLab PLP, Photoshop PSD, and Canva files.
              </p>
            </div>

            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1">Step 02</span>
              <h3 className="text-base font-bold text-white mb-2">Deliver High-Quality Work</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive orders with clear client requirements. Chat securely, submit work on time, and handle revision requests smoothly.
              </p>
            </div>

            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold mb-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1">Step 03</span>
              <h3 className="text-base font-bold text-white mb-2">Get Paid Reliably</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Earn directly on completed orders and passive digital resource sales. Fast payouts with transparent creator analytics.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
