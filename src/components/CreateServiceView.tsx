import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Plus, Trash2, CheckCircle2, Eye, Sparkles } from 'lucide-react';
import { PackageTier, Service } from '../types';

export const CreateServiceView: React.FC = () => {
  const { categories, createService, setCurrentView, setSelectedService, showToast } = useApp();

  // Basic Details
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]?.name || 'Logo Design');
  const [subcategory, setSubcategory] = useState('Brand Guidelines & Vector Icons');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('branding, modern, vector, minimalist');
  const [galleryUrls, setGalleryUrls] = useState<string[]>([
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&auto=format&fit=crop&q=80',
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');

  // Packages State
  const [packages, setPackages] = useState<Record<'basic' | 'standard' | 'premium', PackageTier>>({
    basic: {
      id: 'pkg-basic',
      name: 'Basic Starter',
      title: '1 Clean Concept + High Res JPG/PNG',
      description: '1 high-resolution concept with 2 free revisions. Perfect for personal avatars.',
      price: 25,
      deliveryDays: 2,
      revisions: 2,
      features: ['1 Concept Included', 'High Resolution JPG/PNG', 'Commercial License'],
    },
    standard: {
      id: 'pkg-standard',
      name: 'Standard Pro',
      title: '2 Modern Concepts + Vector Source Files',
      description: '2 polished design concepts, transparent vector PNG, AI/EPS files and 5 revisions.',
      price: 55,
      deliveryDays: 3,
      revisions: 5,
      features: [
        '2 Unique Concepts',
        'Print & Web Ready',
        'Source Vector Files (.AI, .EPS)',
        'Commercial License',
      ],
    },
    premium: {
      id: 'pkg-premium',
      name: 'Premium Enterprise',
      title: 'Full Brand Suite + PixelLab PLP & PSD',
      description: 'Comprehensive brand kit with 4 concepts, social banners, source vector & PixelLab mobile presets.',
      price: 110,
      deliveryDays: 4,
      revisions: 'Unlimited',
      features: [
        '4 Premium Concepts',
        'All Source Files & 3D Mockups',
        'PixelLab .PLP & Photoshop .PSD',
        'Full Brand Identity Kit',
        'Priority 24/7 VIP Support',
      ],
    },
  });

  // Requirements & FAQ
  const [requirements, setRequirements] = useState<string[]>([
    'Brand or project name and tagline',
    'Color preferences or inspirational design links',
  ]);
  const [newRequirement, setNewRequirement] = useState('');

  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([
    {
      question: 'Will I get editable vector & source files?',
      answer: 'Yes! Standard and Premium packages include fully layered vector source files (.AI, .EPS, .SVG) and editable mobile PixelLab PLP presets.',
    },
    {
      question: 'What if I need adjustments after delivery?',
      answer: 'Revisions are included in each package! You can request changes directly before approving the final delivery.',
    },
  ]);
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setGalleryUrls([...galleryUrls, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setGalleryUrls(galleryUrls.filter((_, i) => i !== index));
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      setRequirements([...requirements, newRequirement.trim()]);
      setNewRequirement('');
    }
  };

  const handleAddFaq = () => {
    if (newFaqQ.trim() && newFaqA.trim()) {
      setFaqs([...faqs, { question: newFaqQ.trim(), answer: newFaqA.trim() }]);
      setNewFaqQ('');
      setNewFaqA('');
    }
  };

  const buildServiceData = (
    status: 'active' | 'draft'
  ): Omit<Service, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewCount' | 'slug'> => ({
    title: title.trim() || 'Custom Graphic Design Service',
    sellerId: 'user-seller-anas',
    category,
    subcategory,
    description:
      description.trim() ||
      'I will craft original, custom graphic designs tailored to your creative brief. Delivering pristine vectors, eye-catching color palettes, and ready-to-use production assets.',
    gallery:
      galleryUrls.length > 0
        ? galleryUrls
        : ['https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800'],
    packages,
    requirements,
    faqs,
    tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
    status,
    featured: false,
  });

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please enter a service title', 'error');
      return;
    }

    createService(buildServiceData('active'));
    showToast('Your new service has been published to the marketplace!', 'success');
    setCurrentView('seller-dashboard');
  };

  const handleSaveDraft = () => {
    createService(buildServiceData('draft'));
    showToast('Service saved as draft in your seller dashboard.', 'info');
    setCurrentView('seller-dashboard');
  };

  return (
    <div className="py-8 sm:py-10 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentView('seller-dashboard')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition"
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={handlePublish}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition"
            >
              Publish Service
            </button>
          </div>
        </div>

        <form onSubmit={handlePublish} className="space-y-8">
          {/* Section 1: Overview */}
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Step 1</span>
              <h2 className="text-lg font-bold text-white font-heading">Service Overview</h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">
                Gig Title <span className="text-indigo-400">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. I will design a modern minimalist vector logo for your brand"
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">Subcategory</label>
                <input
                  type="text"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  placeholder="e.g. Minimalist Branding"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">Description</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail what makes your design stand out, vector file types provided, delivery guidelines..."
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">Search Tags</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Comma separated: logo, minimalist, branding, vector, plp"
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Section 2: Portfolio & Gallery Images */}
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Step 2</span>
              <h2 className="text-lg font-bold text-white font-heading">Gallery & Mockups</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {galleryUrls.map((url, idx) => (
                <div key={idx} className="relative aspect-[16/10] rounded-xl overflow-hidden border border-slate-800 group">
                  <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-950/80 text-rose-400 hover:text-rose-300 opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Paste image URL (Unsplash or direct image link)"
                className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Add Image
              </button>
            </div>
          </div>

          {/* Section 3: Pricing Packages (Basic, Standard, Premium) */}
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Step 3</span>
              <h2 className="text-lg font-bold text-white font-heading">
                Pricing Packages (Basic, Standard, Premium)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(['basic', 'standard', 'premium'] as const).map((tier) => {
                const pkg = packages[tier];
                return (
                  <div key={tier} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-400 uppercase">{tier}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400 text-xs">$</span>
                        <input
                          type="number"
                          min="5"
                          max="1000"
                          value={pkg.price}
                          onChange={(e) =>
                            setPackages({
                              ...packages,
                              [tier]: { ...pkg, price: Number(e.target.value) },
                            })
                          }
                          className="w-16 p-1 rounded bg-slate-900 border border-slate-700 text-xs text-white font-bold text-right"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold">Title</label>
                      <input
                        type="text"
                        value={pkg.title}
                        onChange={(e) =>
                          setPackages({
                            ...packages,
                            [tier]: { ...pkg, title: e.target.value },
                          })
                        }
                        className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold">Description</label>
                      <textarea
                        rows={2}
                        value={pkg.description}
                        onChange={(e) =>
                          setPackages({
                            ...packages,
                            [tier]: { ...pkg, description: e.target.value },
                          })
                        }
                        className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase font-semibold">Days</label>
                        <input
                          type="number"
                          min="1"
                          max="30"
                          value={pkg.deliveryDays}
                          onChange={(e) =>
                            setPackages({
                              ...packages,
                              [tier]: { ...pkg, deliveryDays: Number(e.target.value) },
                            })
                          }
                          className="w-full p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase font-semibold">Revisions</label>
                        <input
                          type="text"
                          value={pkg.revisions}
                          onChange={(e) =>
                            setPackages({
                              ...packages,
                              [tier]: { ...pkg, revisions: e.target.value },
                            })
                          }
                          className="w-full p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: Buyer Requirements & FAQs */}
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Step 4</span>
              <h2 className="text-lg font-bold text-white font-heading">Requirements & FAQs</h2>
            </div>

            {/* Requirements list */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-2">
                Requirements from Buyer
              </label>
              <ul className="space-y-2 mb-3">
                {requirements.map((req, idx) => (
                  <li key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
                    <span>{req}</span>
                    <button
                      type="button"
                      onClick={() => setRequirements(requirements.filter((_, i) => i !== idx))}
                      className="text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  placeholder="Add a required question (e.g. Dimensions or Target audience)"
                  className="flex-1 p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100"
                />
                <button
                  type="button"
                  onClick={handleAddRequirement}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold"
                >
                  Add
                </button>
              </div>
            </div>

            {/* FAQs list */}
            <div className="pt-4 border-t border-slate-800">
              <label className="block text-xs font-bold text-slate-200 mb-2">
                Frequently Asked Questions
              </label>
              <div className="space-y-2 mb-3">
                {faqs.map((f, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-200">
                      <span>Q: {f.question}</span>
                      <button
                        type="button"
                        onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))}
                        className="text-slate-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-slate-400">A: {f.answer}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  value={newFaqQ}
                  onChange={(e) => setNewFaqQ(e.target.value)}
                  placeholder="Question (e.g. Do you provide commercial rights?)"
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFaqA}
                    onChange={(e) => setNewFaqA(e.target.value)}
                    placeholder="Answer (e.g. Yes, all designs include full commercial rights.)"
                    className="flex-1 p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100"
                  />
                  <button
                    type="button"
                    onClick={handleAddFaq}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold"
                  >
                    Add FAQ
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action submission buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white transition"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish Gig Live</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
