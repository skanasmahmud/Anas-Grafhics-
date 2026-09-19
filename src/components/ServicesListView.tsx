import React from 'react';
import { useApp } from '../context/AppContext';
import { ServiceCard } from './ServiceCard';
import { Search, SlidersHorizontal, X, ArrowUpDown, Filter } from 'lucide-react';

export const ServicesListView: React.FC = () => {
  const {
    services,
    categories,
    searchQuery,
    setSearchQuery,
    selectedFilterCategory,
    setSelectedFilterCategory,
    priceFilter,
    setPriceFilter,
    deliveryFilter,
    setDeliveryFilter,
    ratingFilter,
    setRatingFilter,
    sellerLevelFilter,
    setSellerLevelFilter,
    sortBy,
    setSortBy,
    getSellerById,
  } = useApp();

  // Filter services
  const filteredServices = services
    .filter((srv) => {
      // Must be active for public browse
      if (srv.status !== 'active') return false;

      // Category filter
      if (selectedFilterCategory !== 'all' && srv.category !== selectedFilterCategory) {
        return false;
      }

      // Search query filter (title, description, tags, seller name)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const seller = getSellerById(srv.sellerId);
        const matchTitle = srv.title.toLowerCase().includes(query);
        const matchDesc = srv.description.toLowerCase().includes(query);
        const matchCategory = srv.category.toLowerCase().includes(query);
        const matchTags = srv.tags.some((t) => t.toLowerCase().includes(query));
        const matchSeller = seller?.displayName.toLowerCase().includes(query) || seller?.username.toLowerCase().includes(query);

        if (!matchTitle && !matchDesc && !matchCategory && !matchTags && !matchSeller) {
          return false;
        }
      }

      // Price filter (on basic package)
      if (srv.packages.basic.price < priceFilter[0] || srv.packages.basic.price > priceFilter[1]) {
        return false;
      }

      // Delivery filter
      if (deliveryFilter > 0 && srv.packages.basic.deliveryDays > deliveryFilter) {
        return false;
      }

      // Rating filter
      if (ratingFilter > 0 && srv.rating < ratingFilter) {
        return false;
      }

      // Seller level filter
      if (sellerLevelFilter !== 'all') {
        const seller = getSellerById(srv.sellerId);
        if (seller?.badge !== sellerLevelFilter) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'popular') {
        return b.reviewCount - a.reviewCount;
      }
      if (sortBy === 'price-asc') {
        return a.packages.basic.price - b.packages.basic.price;
      }
      if (sortBy === 'price-desc') {
        return b.packages.basic.price - a.packages.basic.price;
      }
      // default: relevance / rating
      return b.rating - a.rating;
    });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedFilterCategory('all');
    setPriceFilter([0, 200]);
    setDeliveryFilter(0);
    setRatingFilter(0);
    setSellerLevelFilter('all');
    setSortBy('relevance');
  };

  const hasActiveFilters =
    searchQuery ||
    selectedFilterCategory !== 'all' ||
    priceFilter[0] > 0 ||
    priceFilter[1] < 200 ||
    deliveryFilter > 0 ||
    ratingFilter > 0 ||
    sellerLevelFilter !== 'all';

  return (
    <div className="py-8 sm:py-10 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
            {selectedFilterCategory === 'all'
              ? 'All Creative Services'
              : `${selectedFilterCategory} Services`}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Discover {filteredServices.length} verified graphic design services tailored to your needs
          </p>
        </div>

        {/* Search & Control Filter Bar */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 mb-8 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Category Dropdown */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={selectedFilterCategory}
                onChange={(e) => setSelectedFilterCategory(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All 15 Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name} ({c.serviceCount})
                  </option>
                ))}
              </select>
            </div>

            {/* Delivery Time */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Delivery Speed
              </label>
              <select
                value={deliveryFilter}
                onChange={(e) => setDeliveryFilter(Number(e.target.value))}
                className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={0}>Any Delivery Time</option>
                <option value={1}>Express 24 Hours</option>
                <option value={3}>Up to 3 Days</option>
                <option value={7}>Up to 7 Days</option>
              </select>
            </div>

            {/* Seller Level */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Seller Tier
              </label>
              <select
                value={sellerLevelFilter}
                onChange={(e) => setSellerLevelFilter(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Seller Levels</option>
                <option value="Top Rated">Top Rated</option>
                <option value="Verified Pro">Verified Pro</option>
                <option value="Level 2 Seller">Level 2 Seller</option>
                <option value="Rising Creator">Rising Creator</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="relevance">Best Match / Highest Rated</option>
                <option value="popular">Most Popular (Reviews)</option>
                <option value="newest">Newest Releases</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Secondary Filter Row: Price Range & Clear Filters */}
          <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-4">
              <span className="text-slate-400 font-medium">Max Price: ${priceFilter[1]}</span>
              <input
                type="range"
                min={10}
                max={200}
                step={5}
                value={priceFilter[1]}
                onChange={(e) => setPriceFilter([0, Number(e.target.value)])}
                className="w-32 sm:w-48 accent-indigo-500 cursor-pointer"
              />
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs font-semibold"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 p-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No design services found</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
              We couldn’t find any services matching your active filters. Try broadening your keywords or resetting filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
