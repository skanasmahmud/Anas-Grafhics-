import React from 'react';
import { Service } from '../types';
import { useApp } from '../context/AppContext';
import { Star, Clock, Heart, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const {
    getSellerById,
    setSelectedService,
    setCurrentView,
    toggleFavorite,
    isFavorite,
    setSelectedSeller,
  } = useApp();

  const seller = getSellerById(service.sellerId);
  const favorited = isFavorite(service.id);
  const basicPkg = service.packages.basic;

  const handleCardClick = () => {
    setSelectedService(service);
    setCurrentView('service-detail');
  };

  const handleSellerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (seller) {
      setSelectedSeller(seller);
      setCurrentView('seller-profile');
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(service.id, 'service');
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-slate-900/90 rounded-2xl border border-slate-800/90 overflow-hidden hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col cursor-pointer"
      id={`service-card-${service.id}`}
    >
      {/* Image Thumbnail Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={service.gallery[0]}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-950/80 backdrop-blur-md text-indigo-300 border border-slate-700/60 shadow-sm">
            {service.category}
          </span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-slate-950/70 backdrop-blur-md border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-pink-500 transition-colors"
          title="Save to favorites"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              favorited ? 'fill-pink-500 text-pink-500' : 'text-slate-300'
            }`}
          />
        </button>

        {/* Delivery Time Badge */}
        <div className="absolute bottom-2.5 left-3 z-10 flex items-center gap-1 text-[11px] text-slate-300 font-medium bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-slate-800">
          <Clock className="w-3 h-3 text-indigo-400" />
          <span>{basicPkg.deliveryDays}d delivery</span>
        </div>

        {service.featured && (
          <div className="absolute bottom-2.5 right-3 z-10 text-[10px] uppercase font-bold text-amber-300 bg-amber-950/80 border border-amber-600/40 px-2 py-0.5 rounded-md">
            Featured
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Seller Metadata */}
          <div
            onClick={handleSellerClick}
            className="flex items-center gap-2 mb-2.5 hover:opacity-80 transition"
          >
            <img
              src={seller?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
              alt={seller?.displayName || 'Creator'}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-700"
            />
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-xs font-semibold text-slate-300 truncate">
                {seller?.displayName || 'ANAS Creator'}
              </span>
              {seller?.badge === 'Top Rated' && (
                <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded font-semibold border border-amber-500/30 shrink-0">
                  Top Rated
                </span>
              )}
              {seller?.badge === 'Verified Pro' && (
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              )}
            </div>
          </div>

          {/* Service Title */}
          <h3 className="text-sm font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug mb-3">
            {service.title}
          </h3>
        </div>

        {/* Footer: Rating & Pricing */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-slate-200">
              {service.rating.toFixed(1)}
            </span>
            <span className="text-xs text-slate-400">
              ({service.reviewCount})
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-medium">Starting at</span>
            <span className="text-base font-extrabold text-white font-heading">
              ${basicPkg.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
