import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, CheckCircle2, MessageSquare, ArrowRight, Award } from 'lucide-react';
import { Seller } from '../types';

export const PopularSellersSection: React.FC = () => {
  const { sellers, setSelectedSeller, setCurrentView, openChatWithSeller } = useApp();

  const handleSellerClick = (seller: Seller) => {
    setSelectedSeller(seller);
    setCurrentView('seller-profile');
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
              <Award className="w-3.5 h-3.5" /> Vetted Talents
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
              Popular Designers & Creators
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Work directly with high-caliber design professionals with stellar track records
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sellers.map((seller) => (
            <div
              key={seller.id}
              onClick={() => handleSellerClick(seller)}
              className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Avatar & Badges */}
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <img
                      src={seller.avatar}
                      alt={seller.displayName}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/30 group-hover:scale-105 transition-transform"
                    />
                    {seller.badge === 'Top Rated' && (
                      <span className="absolute -bottom-1 -right-1 p-1 bg-amber-500 text-slate-950 rounded-full shadow">
                        <Star className="w-3 h-3 fill-slate-950" />
                      </span>
                    )}
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      seller.badge === 'Top Rated'
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        : seller.badge === 'Verified Pro'
                        ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                        : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    {seller.badge}
                  </span>
                </div>

                {/* Seller Identity */}
                <div className="mb-2">
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                    <span>{seller.displayName}</span>
                    {seller.badge === 'Verified Pro' && (
                      <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                    )}
                  </h3>
                  <p className="text-xs text-slate-400">@{seller.username}</p>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                  {seller.tagline}
                </p>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {seller.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats & Actions */}
              <div className="pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-200">{seller.rating.toFixed(2)}</span>
                    <span>({seller.reviewCount})</span>
                  </div>
                  <div className="text-slate-400 font-medium">
                    <span className="text-slate-200 font-bold">{seller.completedOrders}</span> orders
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openChatWithSeller(seller.id);
                    }}
                    className="py-1.5 px-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Contact</span>
                  </button>

                  <button
                    onClick={() => handleSellerClick(seller)}
                    className="py-1.5 px-2 rounded-lg text-xs font-semibold bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white border border-indigo-500/40 transition flex items-center justify-center gap-1"
                  >
                    <span>Profile</span>
                    <ArrowRight className="w-3 h-3" />
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
