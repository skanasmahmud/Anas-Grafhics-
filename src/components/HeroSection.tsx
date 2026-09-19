import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Sparkles, ShieldCheck, DownloadCloud, Zap, ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { searchQuery, setSearchQuery, setCurrentView, setSelectedFilterCategory } = useApp();
  const [localSearch, setLocalSearch] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch);
      setCurrentView('services');
    }
  };

  const handleTagClick = (tag: string, categoryName?: string) => {
    if (categoryName) {
      setSelectedFilterCategory(categoryName);
    } else {
      setSearchQuery(tag);
    }
    setCurrentView('services');
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950 pt-8 pb-14 sm:pt-14 sm:pb-20 border-b border-slate-800/60">
      {/* Subtle background ambient mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, Search & Tag Pills */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Creative Services & Digital Design Marketplace</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] font-heading">
              Find Creative Services for Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-sky-400">
                Next Project
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Connect with vetted freelance graphic designers or instantly download production-ready PixelLab PLP, Photoshop PSD, and Canva design templates.
            </p>

            {/* High-Impact Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center shadow-2xl rounded-2xl bg-slate-900 border border-slate-700/80 p-1.5 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all"
            >
              <div className="pl-3.5 pr-2 text-slate-400">
                <Search className="w-5 h-5 text-indigo-400" />
              </div>
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search for graphic design, logo, poster, PLP, PSD..."
                className="w-full py-2.5 px-2 bg-transparent text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none"
                id="hero-search-input"
              />
              <button
                type="submit"
                className="shrink-0 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all"
                id="hero-search-submit-btn"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4 hidden sm:inline" />
              </button>
            </form>

            {/* Popular Search Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-400 font-medium">Popular:</span>
              <button
                onClick={() => handleTagClick('PixelLab PLP', 'PixelLab PLP')}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-indigo-950/60 text-indigo-300 border border-slate-800 hover:border-indigo-500/40 transition font-medium"
              >
                #PixelLabPLP
              </button>
              <button
                onClick={() => handleTagClick('Logo Design', 'Logo Design')}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition font-medium"
              >
                #LogoDesign
              </button>
              <button
                onClick={() => handleTagClick('Poster Design', 'Poster Design')}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition font-medium"
              >
                #PosterDesign
              </button>
              <button
                onClick={() => handleTagClick('PSD Templates', 'PSD Templates')}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition font-medium"
              >
                #PhotoshopPSD
              </button>
              <button
                onClick={() => handleTagClick('Canva Templates', 'Canva Templates')}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition font-medium"
              >
                #CanvaTemplates
              </button>
              <button
                onClick={() => handleTagClick('YouTube Thumbnail', 'YouTube Thumbnail')}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition font-medium"
              >
                #Thumbnails
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">Verified Creators</span>
              </div>
              <div className="flex items-center gap-2">
                <DownloadCloud className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">Instant PLP & PSD</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">Safe Escrow Orders</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic Bento */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md">
              {/* Main Visual Showcase Card */}
              <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-3 shadow-2xl overflow-hidden group">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80"
                    alt="Creative Design Showcase"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-semibold text-indigo-400">Featured Creator</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                        Top Rated
                      </span>
                    </div>
                    <p className="text-xs font-bold text-white">Anas Mahmud - Vector & PixelLab Specialist</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">420+ completed brand identity projects</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: PixelLab PLP Downloadable Asset */}
              <div className="absolute -top-4 -left-4 p-3 rounded-xl bg-slate-900/95 border border-indigo-500/40 shadow-xl backdrop-blur-md flex items-center gap-3 animate-bounce-subtle">
                <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">
                  PLP
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white">PixelLab Project</div>
                  <div className="text-[10px] text-slate-400">Mobile Ready Presets</div>
                </div>
              </div>

              {/* Floating Badge 2: Fast 24-Hour Turnaround */}
              <div className="absolute -bottom-4 -right-4 p-3 rounded-xl bg-slate-900/95 border border-violet-500/40 shadow-xl backdrop-blur-md flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 font-bold text-xs">
                  PSD
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white">Photoshop Ready</div>
                  <div className="text-[10px] text-slate-400">Layered 300 DPI Files</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
