import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedFilterCategory, categories, switchRole } = useApp();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs pb-16 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-600/30">
                <span className="font-heading font-extrabold text-white text-lg tracking-tighter">AG</span>
              </div>
              <div>
                <span className="font-heading font-bold text-lg tracking-tight text-white">
                  ANAS<span className="text-indigo-400">.</span>Graphics
                </span>
                <p className="text-[10px] text-slate-400 uppercase font-medium">
                  Creative Services & Digital Design Marketplace
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The premier marketplace connecting businesses with visionary graphic designers. Explore professional branding, viral social content, and instant PixelLab PLP & PSD assets.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => switchRole('admin')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition"
              >
                <Shield className="w-3.5 h-3.5 text-amber-400" /> Admin Portal
              </button>
            </div>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Popular Categories</h4>
            <ul className="space-y-2">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setSelectedFilterCategory(cat.name);
                      setCurrentView('services');
                    }}
                    className="hover:text-indigo-400 transition"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Digital Resources Column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Digital Resources</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setCurrentView('digital-resources')}
                  className="hover:text-indigo-400 transition"
                >
                  PixelLab PLP Files
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('digital-resources')}
                  className="hover:text-indigo-400 transition"
                >
                  Photoshop PSD Templates
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('digital-resources')}
                  className="hover:text-indigo-400 transition"
                >
                  Canva Pro Kits
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('digital-resources')}
                  className="hover:text-indigo-400 transition"
                >
                  Fonts & Vector Glyphs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('digital-resources')}
                  className="hover:text-indigo-400 transition"
                >
                  Mockups & 3D Renders
                </button>
              </li>
            </ul>
          </div>

          {/* Platform & Trust */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Platform & Safety</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => switchRole('seller')}
                  className="text-indigo-400 hover:text-indigo-300 transition font-semibold"
                >
                  Become a Seller
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('home')} className="hover:text-white transition">
                  How Escrow Works
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('home')} className="hover:text-white transition">
                  Buyer Protection
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('home')} className="hover:text-white transition">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('home')} className="hover:text-white transition">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 ANAS Graphics. All rights reserved. Creative Services & Digital Design Marketplace.</p>
          <div className="flex items-center gap-1">
            <span>Built with precision for creators & digital designers</span>
            <Sparkles className="w-3 h-3 text-indigo-400 inline ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
