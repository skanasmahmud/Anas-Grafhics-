import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Star,
  Clock,
  RefreshCw,
  Heart,
  MessageSquare,
  ShieldCheck,
  Check,
  ChevronDown,
  ChevronUp,
  Share2,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { ServiceCard } from './ServiceCard';

export const ServiceDetailView: React.FC = () => {
  const {
    selectedService,
    getSellerById,
    setCurrentView,
    toggleFavorite,
    isFavorite,
    openChatWithSeller,
    setSelectedSeller,
    reviews,
    services,
    setIsOrderModalOpen,
    setOrderModalPackage,
    showToast,
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedPackageTier, setSelectedPackageTier] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!selectedService) {
    return (
      <div className="py-20 text-center text-slate-400">
        <p>No service selected.</p>
        <button
          onClick={() => setCurrentView('services')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs rounded-xl"
        >
          Back to Services
        </button>
      </div>
    );
  }

  const seller = getSellerById(selectedService.sellerId);
  const favorited = isFavorite(selectedService.id);
  const currentPkg = selectedService.packages[selectedPackageTier];
  const serviceReviews = reviews.filter((r) => r.serviceId === selectedService.id);
  const relatedServices = services
    .filter((s) => s.category === selectedService.category && s.id !== selectedService.id)
    .slice(0, 3);

  const handleOrderNow = () => {
    setOrderModalPackage(selectedPackageTier);
    setIsOrderModalOpen(true);
  };

  const handleSellerClick = () => {
    if (seller) {
      setSelectedSeller(seller);
      setCurrentView('seller-profile');
    }
  };

  return (
    <div className="bg-slate-950 py-8 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentView('services')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Services</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard?.writeText?.(window.location.href);
                showToast('Service link copied to clipboard!', 'info');
              }}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition text-xs flex items-center gap-1.5"
              title="Share service"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button
              onClick={() => toggleFavorite(selectedService.id, 'service')}
              className={`p-2 rounded-xl bg-slate-900 border border-slate-800 transition text-xs flex items-center gap-1.5 ${
                favorited ? 'text-pink-500 border-pink-500/40' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-pink-500' : ''}`} />
              <span className="hidden sm:inline">{favorited ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Left Details & Right Pricing Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Column: Media Gallery, Seller Bio, Description, FAQs, Reviews */}
          <div className="lg:col-span-8 space-y-8">
            {/* Title & Category Badge */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                  {selectedService.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  / {selectedService.subcategory}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-heading leading-snug">
                {selectedService.title}
              </h1>

              {/* Seller Header Summary */}
              <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
                <div
                  onClick={handleSellerClick}
                  className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
                >
                  <img
                    src={seller?.avatar}
                    alt={seller?.displayName}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-indigo-500/40"
                  />
                  <div>
                    <span className="font-bold text-white block">{seller?.displayName}</span>
                    <span className="text-[11px] text-slate-400">@{seller?.username}</span>
                  </div>
                </div>

                <div className="h-4 w-px bg-slate-800" />

                <div className="flex items-center gap-1.5">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                  </div>
                  <span className="font-bold text-white">{selectedService.rating.toFixed(1)}</span>
                  <span className="text-slate-400">({selectedService.reviewCount} reviews)</span>
                </div>

                <div className="h-4 w-px bg-slate-800 hidden sm:block" />

                <div className="flex items-center gap-1 text-slate-400 hidden sm:flex">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Avg response: {seller?.responseTime || '1 hour'}</span>
                </div>
              </div>
            </div>

            {/* Interactive Image Gallery */}
            <div className="space-y-3">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl">
                <img
                  src={selectedService.gallery[activeImageIndex] || selectedService.gallery[0]}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Strip */}
              {selectedService.gallery.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {selectedService.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 sm:w-24 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeImageIndex === idx
                          ? 'border-indigo-500 ring-2 ring-indigo-500/40 scale-105'
                          : 'border-slate-800 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description Section */}
            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6">
              <h2 className="text-lg font-bold text-white font-heading mb-4 pb-2 border-b border-slate-800">
                About this Service
              </h2>
              <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-4">
                {selectedService.description}
              </div>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800/80">
                {selectedService.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-950 text-indigo-300 border border-slate-800 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Seller Profile Summary Card */}
            {seller && (
              <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 flex flex-col sm:flex-row gap-5 items-start">
                <img
                  src={seller.avatar}
                  alt={seller.displayName}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/30 shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                    <div>
                      <h3
                        onClick={handleSellerClick}
                        className="text-base font-bold text-white hover:text-indigo-400 cursor-pointer transition"
                      >
                        {seller.displayName}
                      </h3>
                      <p className="text-xs text-slate-400">{seller.tagline}</p>
                    </div>

                    <button
                      onClick={() => openChatWithSeller(seller.id, selectedService.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Contact Seller</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                    {seller.bio}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-800/80 text-[11px]">
                    <div>
                      <span className="text-slate-400 block">Location</span>
                      <span className="font-semibold text-slate-200">{seller.country}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Member Since</span>
                      <span className="font-semibold text-slate-200">{seller.joinedDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Completed</span>
                      <span className="font-semibold text-slate-200">{seller.completedOrders} orders</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Rating</span>
                      <span className="font-semibold text-amber-400">★ {seller.rating.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Buyer Requirements Notice */}
            {selectedService.requirements && selectedService.requirements.length > 0 && (
              <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6">
                <h3 className="text-base font-bold text-white font-heading mb-3">
                  Requirements from the Buyer
                </h3>
                <p className="text-xs text-slate-400 mb-3">
                  Please prepare the following details so the designer can begin work promptly:
                </p>
                <ul className="space-y-2">
                  {selectedService.requirements.map((req, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-md bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Frequently Asked Questions */}
            {selectedService.faqs && selectedService.faqs.length > 0 && (
              <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6">
                <h3 className="text-base font-bold text-white font-heading mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-2">
                  {selectedService.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                        className="w-full text-left p-3.5 flex items-center justify-between text-xs font-semibold text-slate-200 hover:text-white"
                      >
                        <span>{faq.question}</span>
                        {openFaqIndex === idx ? (
                          <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                      </button>
                      {openFaqIndex === idx && (
                        <div className="px-3.5 pb-3.5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Buyer Reviews */}
            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6">
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white font-heading">
                    Client Reviews ({serviceReviews.length})
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400" />
                    </div>
                    <span className="font-bold text-white text-sm">{selectedService.rating.toFixed(1)}</span>
                    <span className="text-xs text-slate-400">out of 5.0</span>
                  </div>
                </div>
              </div>

              {serviceReviews.length === 0 ? (
                <div className="py-6 text-center text-slate-400 text-xs">
                  No written reviews yet. Be the first to order and review!
                </div>
              ) : (
                <div className="space-y-4">
                  {serviceReviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={rev.buyerAvatar}
                            alt={rev.buyerName}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <span className="text-xs font-bold text-white block">{rev.buyerName}</span>
                            <span className="text-[10px] text-slate-400">{rev.buyerCountry}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{rev.rating}.0</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>
                      <span className="text-[10px] text-slate-500 mt-2 block">{rev.date}</span>

                      {/* Public Seller Reply */}
                      {rev.sellerReply && (
                        <div className="mt-3 pl-3 border-l-2 border-indigo-500/60 pt-1 text-xs text-slate-400">
                          <span className="font-bold text-indigo-300 text-[11px] block">
                            Seller Reply ({seller?.displayName}):
                          </span>
                          <p className="mt-0.5">{rev.sellerReply.comment}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Related Services */}
            {relatedServices.length > 0 && (
              <div className="pt-6">
                <h3 className="text-lg font-bold text-white font-heading mb-4">
                  Related {selectedService.category} Services
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedServices.map((rel) => (
                    <ServiceCard key={rel.id} service={rel} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Pricing Packages Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
                {/* 3 Package Tabs (Basic, Standard, Premium) */}
                <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-950/60">
                  <button
                    onClick={() => setSelectedPackageTier('basic')}
                    className={`py-3 text-xs font-bold transition-all ${
                      selectedPackageTier === 'basic'
                        ? 'text-white border-b-2 border-indigo-500 bg-slate-900'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Basic
                  </button>
                  <button
                    onClick={() => setSelectedPackageTier('standard')}
                    className={`py-3 text-xs font-bold transition-all relative ${
                      selectedPackageTier === 'standard'
                        ? 'text-white border-b-2 border-indigo-500 bg-slate-900'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Standard
                    <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  </button>
                  <button
                    onClick={() => setSelectedPackageTier('premium')}
                    className={`py-3 text-xs font-bold transition-all ${
                      selectedPackageTier === 'premium'
                        ? 'text-white border-b-2 border-indigo-500 bg-slate-900'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Premium
                  </button>
                </div>

                {/* Package Details Body */}
                <div className="p-6 space-y-5">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-base font-bold text-white font-heading">
                      {currentPkg.title}
                    </h3>
                    <div className="text-right">
                      <span className="text-2xl font-extrabold text-white font-heading">
                        ${currentPkg.price}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentPkg.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-300 font-medium py-2 border-y border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-indigo-400" />
                      <span>{currentPkg.deliveryDays} Days Delivery</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <RefreshCw className="w-4 h-4 text-indigo-400" />
                      <span>
                        {typeof currentPkg.revisions === 'number'
                          ? `${currentPkg.revisions} Revisions`
                          : 'Unlimited Revisions'}
                      </span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      What's Included
                    </span>
                    <ul className="space-y-2">
                      {currentPkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                          <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2.5 pt-3">
                    <button
                      onClick={handleOrderNow}
                      className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
                      id="service-order-now-btn"
                    >
                      <span>Continue to Order (${currentPkg.price})</span>
                    </button>

                    <button
                      onClick={() => openChatWithSeller(selectedService.sellerId, selectedService.id)}
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Contact Designer</span>
                    </button>
                  </div>

                  {/* Escrow Guarantee Notice */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>ANAS Escrow: Funds released only upon final delivery approval</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
