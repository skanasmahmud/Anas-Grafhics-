import React from 'react';
import { useApp } from '../context/AppContext';
import { Download, ArrowRight, Sparkles, Check, HardDrive } from 'lucide-react';
import { DigitalResource } from '../types';

export const DigitalResourcesSpotlight: React.FC = () => {
  const { resources, setCurrentView, downloadResource, showToast } = useApp();

  const spotlightResources = resources.slice(0, 3);

  const handleResourceAction = (res: DigitalResource) => {
    if (res.isFree) {
      downloadResource(res.id);
    } else {
      // Simulate direct buy and download
      downloadResource(res.id);
      showToast(`Purchased & downloaded ${res.title} for $${res.price}!`, 'success');
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-violet-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Instant Asset Marketplace
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
              Digital PLP, PSD & Templates Market
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Download pre-made PixelLab project presets, Photoshop smart objects, and Canva kits ready to edit in seconds.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('digital-resources')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 transition"
          >
            <span>Browse All Resources ({resources.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {spotlightResources.map((res) => (
            <div
              key={res.id}
              className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Preview image with overlay */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={res.previewImage}
                  alt={res.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-violet-600 text-white shadow-md">
                    .{res.fileType}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-950/80 backdrop-blur-sm text-slate-300 border border-slate-700">
                    {res.fileSize}
                  </span>
                </div>

                <div className="absolute top-3 right-3 z-10">
                  {res.isFree ? (
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-emerald-500 text-slate-950 shadow">
                      FREE
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-slate-900/90 text-white border border-slate-700 shadow">
                      ${res.price}
                    </span>
                  )}
                </div>
              </div>

              {/* Resource Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={res.creatorAvatar}
                      alt={res.creatorName}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="text-xs text-slate-400 font-medium truncate">
                      by {res.creatorName}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-violet-400 transition-colors line-clamp-2 leading-snug mb-2">
                    {res.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {res.description}
                  </p>
                </div>

                {/* Footer download action */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <HardDrive className="w-3.5 h-3.5 text-violet-400" />
                    <span>{res.downloadCount} downloads</span>
                  </div>

                  <button
                    onClick={() => handleResourceAction(res)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm ${
                      res.isFree
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                        : 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/30'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{res.isFree ? 'Free Download' : `Buy & Download ($${res.price})`}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
