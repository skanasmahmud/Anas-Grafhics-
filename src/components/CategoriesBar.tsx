import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Shapes,
  Share2,
  Sparkles,
  Layout,
  CreditCard,
  Contact2,
  Award,
  FileText,
  Video,
  Film,
  Camera,
  Smartphone,
  Layers,
  Palette,
  Grid,
} from 'lucide-react';
import { Category } from '../types';

export const getCategoryIcon = (iconName: string, className: string = 'w-4 h-4') => {
  switch (iconName) {
    case 'Shapes':
      return <Shapes className={className} />;
    case 'Share2':
      return <Share2 className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Layout':
      return <Layout className={className} />;
    case 'CreditCard':
      return <CreditCard className={className} />;
    case 'Contact2':
      return <Contact2 className={className} />;
    case 'Award':
      return <Award className={className} />;
    case 'FileText':
      return <FileText className={className} />;
    case 'Video':
      return <Video className={className} />;
    case 'Film':
      return <Film className={className} />;
    case 'Camera':
      return <Camera className={className} />;
    case 'Smartphone':
      return <Smartphone className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'Palette':
      return <Palette className={className} />;
    case 'Grid':
    default:
      return <Grid className={className} />;
  }
};

export const CategoriesBar: React.FC = () => {
  const { categories, selectedFilterCategory, setSelectedFilterCategory, setCurrentView, setSelectedCategory } =
    useApp();

  const handleCategoryClick = (cat: Category) => {
    setSelectedFilterCategory(cat.name);
    setSelectedCategory(cat);
    setCurrentView('services');
  };

  return (
    <div className="bg-slate-950/60 border-b border-slate-800/60 sticky top-16 z-30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 no-scrollbar scroll-smooth">
          {/* "All" button */}
          <button
            onClick={() => {
              setSelectedFilterCategory('all');
              setSelectedCategory(null);
            }}
            className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              selectedFilterCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/40'
                : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>All Categories</span>
          </button>

          {categories.map((cat) => {
            const isSelected = selectedFilterCategory === cat.name;
            const isHighlight = cat.slug === 'pixellab-plp' || cat.slug === 'psd-templates';

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm shadow-indigo-600/40'
                    : isHighlight
                    ? 'bg-violet-950/40 text-violet-300 border-violet-800/60 hover:bg-violet-900/40 hover:text-white'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {getCategoryIcon(cat.iconName, 'w-3.5 h-3.5 text-indigo-400')}
                <span>{cat.name}</span>
                {cat.serviceCount > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {cat.serviceCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
