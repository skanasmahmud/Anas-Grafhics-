import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, ArrowLeft, Search } from 'lucide-react';
import { ServiceCard } from './ServiceCard';

export const FavoritesView: React.FC = () => {
  const { favorites, services, setCurrentView } = useApp();

  const savedServiceIds = favorites
    .filter((f) => f.type === 'service')
    .map((f) => f.targetId);

  const favoritedServices = services.filter((s) => savedServiceIds.includes(s.id));

  return (
    <div className="py-8 sm:py-10 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-400 mb-1">
              <Heart className="w-3.5 h-3.5 fill-pink-400" /> Saved Collections
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
              My Favorite Services
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Quick access to design gigs and creative specialists you've bookmarked
            </p>
          </div>

          <button
            onClick={() => setCurrentView('services')}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            Explore More Services
          </button>
        </div>

        {favoritedServices.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 p-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No saved services yet</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
              When you find a logo, poster, or PixelLab preset you like, tap the heart icon on any card to save it here for later.
            </p>
            <button
              onClick={() => setCurrentView('services')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition"
            >
              Browse Services
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favoritedServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
