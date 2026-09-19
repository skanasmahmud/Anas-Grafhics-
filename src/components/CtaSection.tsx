import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const CtaSection: React.FC = () => {
  const { switchRole, setCurrentView } = useApp();

  const handleBecomeSeller = () => {
    switchRole('seller');
    setCurrentView('create-service');
  };

  return (
    <section className="py-14 sm:py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 border border-indigo-500/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-4">
              <Sparkles className="w-3.5 h-3.5" /> For Creative Designers & Digital Artists
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-heading tracking-tight leading-tight">
              Monetize Your Design Skills & Digital Assets on ANAS Graphics
            </h2>

            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Join hundreds of designers selling custom gigs and earning passive income from downloadable PixelLab PLP, Photoshop PSD, and Canva template packs.
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-6 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Listing Fees</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Global Buyer Reach</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Fast Escrow Payouts</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleBecomeSeller}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <span>Start Selling Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentView('digital-resources')}
              className="px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold transition-all"
            >
              Explore Digital Assets
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
