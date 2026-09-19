import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Download,
  PlusCircle,
  HardDrive,
  Sparkles,
  Filter,
  CheckCircle2,
  Lock,
  Search,
} from 'lucide-react';
import { DigitalResource, ResourceFileType } from '../types';

export const DigitalResourcesView: React.FC = () => {
  const {
    resources,
    downloadResource,
    setIsUploadResourceModalOpen,
    currentUser,
    resourceTypeFilter,
    setResourceTypeFilter,
    resourceFreePaidFilter,
    setResourceFreePaidFilter,
    showToast,
  } = useApp();

  const [resourceSearch, setResourceSearch] = useState('');

  const fileTypes: { label: string; value: string }[] = [
    { label: 'All Files', value: 'all' },
    { label: 'PixelLab (.PLP)', value: 'PLP' },
    { label: 'Photoshop (.PSD)', value: 'PSD' },
    { label: 'Canva Links', value: 'Canva' },
    { label: 'Fonts (.OTF/.TTF)', value: 'Font' },
    { label: 'Smart Mockups', value: 'Mockup' },
  ];

  const filteredResources = resources.filter((res) => {
    // Type filter
    if (resourceTypeFilter !== 'all' && res.fileType !== resourceTypeFilter) {
      return false;
    }

    // Free/Paid filter
    if (resourceFreePaidFilter === 'free' && !res.isFree) return false;
    if (resourceFreePaidFilter === 'paid' && res.isFree) return false;

    // Search query
    if (resourceSearch.trim()) {
      const q = resourceSearch.toLowerCase();
      const matchTitle = res.title.toLowerCase().includes(q);
      const matchDesc = res.description.toLowerCase().includes(q);
      const matchCreator = res.creatorName.toLowerCase().includes(q);
      const matchTag = res.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchCreator && !matchTag) {
        return false;
      }
    }

    return true;
  });

  const handleDownloadOrBuy = (res: DigitalResource) => {
    if (res.isFree) {
      downloadResource(res.id);
      showToast(`Downloading free asset: ${res.title}`, 'success');
    } else {
      // Direct buy simulation
      downloadResource(res.id);
      showToast(`Order processed: Purchased ${res.title} for $${res.price}! Direct download ready.`, 'success');
    }
  };

  return (
    <div className="py-8 sm:py-10 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Listing CTA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Instant Asset Marketplace
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-heading tracking-tight">
              Digital Resources Market
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Explore downloadable PixelLab PLP project files, Photoshop PSD mockups, Canva links, and designer fonts.
            </p>
          </div>

          <button
            onClick={() => setIsUploadResourceModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-lg shadow-violet-600/30 flex items-center gap-2 transition-all self-start md:self-auto"
            id="upload-digital-resource-btn"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Upload New Resource</span>
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 mb-8 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={resourceSearch}
                onChange={(e) => setResourceSearch(e.target.value)}
                placeholder="Search PLP, PSD, poster templates, fonts..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            {/* Free vs Paid Toggle */}
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
              <button
                onClick={() => setResourceFreePaidFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  resourceFreePaidFilter === 'all'
                    ? 'bg-violet-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setResourceFreePaidFilter('free')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  resourceFreePaidFilter === 'free'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Free Only
              </button>
              <button
                onClick={() => setResourceFreePaidFilter('paid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  resourceFreePaidFilter === 'paid'
                    ? 'bg-violet-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Premium / Paid
              </button>
            </div>
          </div>

          {/* File Type Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {fileTypes.map((ft) => (
              <button
                key={ft.value}
                onClick={() => setResourceTypeFilter(ft.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition border ${
                  resourceTypeFilter === ft.value
                    ? 'bg-violet-600 text-white border-violet-500 shadow-sm'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {ft.label}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 p-8">
            <HardDrive className="w-12 h-12 mx-auto text-slate-600 mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No digital resources found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              Try adjusting your search keywords or switching filters.
            </p>
            <button
              onClick={() => {
                setResourceSearch('');
                setResourceTypeFilter('all');
                setResourceFreePaidFilter('all');
              }}
              className="px-4 py-2 bg-violet-600 text-white text-xs font-semibold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Image Preview Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                    <img
                      src={res.previewImage}
                      alt={res.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Format Pill & Size */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold bg-violet-600 text-white shadow">
                        .{res.fileType}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-950/80 backdrop-blur-sm text-slate-300 border border-slate-700">
                        {res.fileSize}
                      </span>
                    </div>

                    {/* Price Status */}
                    <div className="absolute top-3 right-3 z-10">
                      {res.isFree ? (
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-black bg-emerald-500 text-slate-950 shadow">
                          FREE
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-black bg-slate-900/90 text-white border border-slate-700 shadow">
                          ${res.price}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Resource Info */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2.5">
                      <img
                        src={res.creatorAvatar}
                        alt={res.creatorName}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="text-xs text-slate-400 font-medium">
                        by {res.creatorName}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-violet-400 transition-colors line-clamp-2 leading-snug mb-2">
                      {res.title}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                      {res.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {res.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <HardDrive className="w-3.5 h-3.5 text-violet-400" />
                      <span>{res.downloadCount} downloads</span>
                    </div>

                    <button
                      onClick={() => handleDownloadOrBuy(res)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md ${
                        res.isFree
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                          : 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/30'
                      }`}
                    >
                      {res.isFree ? (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>Instant Download</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Buy & Download (${res.price})</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
