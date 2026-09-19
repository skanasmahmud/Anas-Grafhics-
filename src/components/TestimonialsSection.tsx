import React from 'react';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'David Vance',
    role: 'Founder, Nexus Fintech',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    content: 'ANAS Graphics is a game changer for startups. Anas designed our full brand system within 3 days. The vector precision and clean color rules made our app launch effortless.',
    rating: 5,
    projectTag: 'Brand Identity System',
  },
  {
    id: 'test-2',
    name: 'Amina Zahra',
    role: 'Digital Marketing Strategist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    content: 'The PixelLab PLP library on ANAS Graphics is pure gold. I create viral Instagram flyers on my Android phone on the go without carrying a laptop. Incredible quality!',
    rating: 5,
    projectTag: 'PixelLab Mobile Assets',
  },
  {
    id: 'test-3',
    name: 'Liam Chen',
    role: 'Content Creator (400k Subs)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    content: 'Tariq’s YouTube thumbnails jumped our click-through rate from 4.2% to 11.8%. The turnaround time was under 24 hours. The best creative marketplace we’ve ever used.',
    rating: 5,
    projectTag: 'YouTube Thumbnail Kit',
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-slate-900/40 border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
            Community Love
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
            Trusted by Creators and Businesses Worldwide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-slate-600" />
                </div>

                <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                  "{t.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-700"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">{t.name}</div>
                    <div className="text-[11px] text-slate-400">{t.role}</div>
                  </div>
                </div>

                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                  {t.projectTag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
