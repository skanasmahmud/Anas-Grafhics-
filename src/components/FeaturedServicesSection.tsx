import React from 'react';
import { useApp } from '../context/AppContext';
import { ServiceCard } from './ServiceCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export const FeaturedServicesSection: React.FC = () => {
  const { services, setCurrentView, setSelectedFilterCategory } = useApp();

  const featuredServices = services.filter((s) => s.status === 'active').slice(0, 4);

  return (
    <section className="py-12 sm:py-16 bg-slate-900/30 border-t border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Hand-Picked Quality
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
              Featured Creative Services
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Top rated graphic design solutions delivered by proven industry specialists
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedFilterCategory('all');
              setCurrentView('services');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition self-start sm:self-auto"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};
