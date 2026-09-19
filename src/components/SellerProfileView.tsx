import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Star,
  CheckCircle2,
  MapPin,
  Calendar,
  MessageSquare,
  ArrowLeft,
  Globe,
  HardDrive,
  Sparkles,
} from 'lucide-react';
import { ServiceCard } from './ServiceCard';

export const SellerProfileView: React.FC = () => {
  const {
    selectedSeller,
    services,
    resources,
    reviews,
    openChatWithSeller,
    setCurrentView,
    downloadResource,
    showToast,
  } = useApp();

  if (!selectedSeller) {
    return (
      <div className="py-20 text-center text-slate-400">
        <p>No creator selected.</p>
        <button
          onClick={() => setCurrentView('home')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs rounded-xl"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const sellerServices = services.filter(
    (s) => s.sellerId === selectedSeller.id && s.status === 'active'
  );
  const sellerResources = resources.filter((r) => r.creatorId === selectedSeller.id);
  const sellerReviews = reviews.filter((r) => r.sellerId === selectedSeller.id);

  return (
    <div className="py-8 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <button
          onClick={() => setCurrentView('services')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>

        {/* Profile Card Header */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 mb-8 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative">
                <img
                  src={selectedSeller.avatar}
                  alt={selectedSeller.displayName}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-2 ring-indigo-500/40 shadow-lg"
                />
                {selectedSeller.badge === 'Top Rated' && (
                  <span className="absolute -bottom-2 -right-2 p-1.5 bg-amber-500 text-slate-950 rounded-full shadow-lg">
                    <Star className="w-4 h-4 fill-slate-950" />
                  </span>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                    {selectedSeller.displayName}
                  </h1>
                  {selectedSeller.badge === 'Verified Pro' && (
                    <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                  )}
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 font-bold border border-indigo-500/30">
                    {selectedSeller.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-400">@{selectedSeller.username}</p>
                <p className="text-sm font-medium text-slate-200">{selectedSeller.tagline}</p>

                {/* Meta details: Country, Joined, Orders */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                    {selectedSeller.country}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    Member since {selectedSeller.joinedDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <strong className="text-white">{selectedSeller.rating.toFixed(2)}</strong> (
                    {selectedSeller.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => openChatWithSeller(selectedSeller.id)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contact Designer</span>
              </button>
            </div>
          </div>

          {/* Bio & Skills */}
          <div className="pt-6 mt-6 border-t border-slate-800 grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
            <div className="lg:col-span-2 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">About Creator</h3>
              <p className="text-slate-300 leading-relaxed">{selectedSeller.bio}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSeller.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 text-indigo-300 border border-slate-800 font-medium text-[11px]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2 text-slate-300">
                  {selectedSeller.languages.map((l) => (
                    <span key={l} className="flex items-center gap-1 text-[11px]">
                      <Globe className="w-3 h-3 text-slate-400" /> {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Active Services / Gigs */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white font-heading">
              Gigs by {selectedSeller.displayName} ({sellerServices.length})
            </h2>
          </div>

          {sellerServices.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/40 rounded-2xl border border-slate-800 text-xs text-slate-500">
              No active services currently listed.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sellerServices.map((srv) => (
                <ServiceCard key={srv.id} service={srv} />
              ))}
            </div>
          )}
        </div>

        {/* Section: Downloadable Digital Resources (PLP, PSD) */}
        {sellerResources.length > 0 && (
          <div className="space-y-6 mb-12">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-violet-400">
                  <Sparkles className="w-3 h-3" /> Downloadable Assets
                </div>
                <h2 className="text-xl font-bold text-white font-heading">
                  Digital PLP & PSD Resources ({sellerResources.length})
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sellerResources.map((res) => (
                <div
                  key={res.id}
                  className="bg-slate-900 rounded-2xl border border-slate-800 p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={res.previewImage}
                      alt={res.title}
                      className="w-14 h-14 rounded-xl object-cover ring-1 ring-slate-800 shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-violet-600 text-white inline-block mb-1">
                        .{res.fileType}
                      </span>
                      <h4 className="text-xs font-bold text-white truncate">{res.title}</h4>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {res.isFree ? 'FREE' : `$${res.price}`} • {res.fileSize}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      downloadResource(res.id);
                      showToast(`Downloading ${res.title}`, 'success');
                    }}
                    className="p-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shrink-0 transition"
                  >
                    <HardDrive className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section: Client Reviews */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white font-heading">
            Client Reviews ({sellerReviews.length})
          </h2>

          <div className="space-y-4">
            {sellerReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rev.buyerAvatar}
                      alt={rev.buyerName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <span className="font-bold text-white block">{rev.buyerName}</span>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{rev.rating}.0</span>
                  </div>
                </div>

                <p className="text-slate-300 leading-relaxed italic">"{rev.comment}"</p>

                {rev.sellerReply && (
                  <div className="pl-3 border-l-2 border-indigo-500/60 pt-1 text-slate-400 text-[11px]">
                    <span className="font-bold text-indigo-300 block">Creator Reply:</span>
                    <p className="mt-0.5">{rev.sellerReply.comment}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
