import React from 'react';
import { useApp } from '../context/AppContext';
import { getCategoryIcon } from './CategoriesBar';
import { ArrowRight } from 'lucide-react';
import { Category } from '../types';

export const PopularCategoriesSection: React.FC = () => {
  const { categories, setSelectedFilterCategory, setSelectedCategory, setCurrentView } = useApp();

  const handleBrowseCategory = (cat: Category) => {
    setSelectedFilterCategory(cat.name);
    setSelectedCategory(cat);
    setCurrentView('services');
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
              Explore Specialties
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
              Popular Design Categories
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Find the perfect creative discipline for your brand or marketing campaign
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedFilterCategory('all');
              setCurrentView('services');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const isPLPorPSD = cat.slug === 'pixellab-plp' || cat.slug === 'psd-templates';

            return (
              <div
                key={cat.id}
                className={`group p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${
                  isPLPorPSD
                    ? 'bg-gradient-to-b from-slate-900 via-indigo-950/20 to-slate-900 border-indigo-500/40 hover:border-indigo-400 shadow-md shadow-indigo-950/50'
                    : 'bg-slate-900/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isPLPorPSD
                          ? 'bg-indigo-600/20 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white'
                          : 'bg-slate-800 text-slate-300 group-hover:bg-indigo-600/20 group-hover:text-indigo-400'
                      }`}
                    >
                      {getCategoryIcon(cat.iconName, 'w-5 h-5')}
                    </div>

                    <span className="text-[11px] font-medium text-slate-400 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                      {cat.serviceCount} services
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors mb-1 line-clamp-1">
                    {cat.name}
                  </h3>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>

                <button
                  onClick={() => handleBrowseCategory(cat)}
                  className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-indigo-600 text-slate-200 hover:text-white transition flex items-center justify-center gap-1.5 group/btn"
                >
                  <span>Browse</span>
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
