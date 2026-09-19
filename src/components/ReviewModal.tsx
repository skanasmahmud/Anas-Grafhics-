import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Star, Sparkles } from 'lucide-react';

export const ReviewModal: React.FC = () => {
  const { isReviewModalOpen, setIsReviewModalOpen, reviewModalOrder, createReview } = useApp();

  const [rating, setRating] = useState<number>(5);
  const [commRating, setCommRating] = useState<number>(5);
  const [qualityRating, setQualityRating] = useState<number>(5);
  const [deliveryRating, setDeliveryRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  if (!isReviewModalOpen || !reviewModalOrder) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    createReview(
      reviewModalOrder.id,
      reviewModalOrder.item.serviceId,
      rating,
      comment.trim()
    );

    setIsReviewModalOpen(false);
    setComment('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 text-slate-100">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
              <Sparkles className="w-3 h-3" /> Verified Order Review
            </div>
            <h2 className="text-lg font-bold text-white font-heading">
              Rate Your Experience
            </h2>
          </div>
          <button
            onClick={() => setIsReviewModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Order reference banner */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="text-slate-400 block">Service Ordered:</span>
            <span className="font-bold text-white block mt-0.5">{reviewModalOrder.item.serviceTitle}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Order #{reviewModalOrder.orderNumber}</span>
          </div>

          {/* Overall Star Rating */}
          <div className="text-center space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Overall Rating
            </label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      (hoverRating !== null ? hoverRating >= star : rating >= star)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-700'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs text-amber-400 font-bold block">{rating}.0 / 5.0 Stars</span>
          </div>

          {/* Sub-categories */}
          <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
            <span className="font-bold text-slate-300 block">Category Ratings:</span>

            {/* Communication */}
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Communication with Seller</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setCommRating(s)}
                    className="p-0.5"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        commRating >= s ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Service Quality */}
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Quality of Completed Work</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQualityRating(s)}
                    className="p-0.5"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        qualityRating >= s ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Time */}
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Turnaround / Delivery Time</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setDeliveryRating(s)}
                    className="p-0.5"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        deliveryRating >= s ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Written Feedback */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Written Review <span className="text-indigo-400">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe your collaboration, design quality, responsiveness, or any advice for future buyers..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition"
          >
            Submit Verified Review
          </button>
        </form>
      </div>
    </div>
  );
};
