import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, UploadCloud, Sparkles } from 'lucide-react';
import { ResourceFileType } from '../types';

export const UploadResourceModal: React.FC = () => {
  const { isUploadResourceModalOpen, setIsUploadResourceModalOpen, createResource, currentUser, showToast } =
    useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileType, setFileType] = useState<ResourceFileType>('PLP');
  const [fileSize, setFileSize] = useState('14.2 MB');
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState('0');
  const [previewImage, setPreviewImage] = useState(
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80'
  );
  const [tags, setTags] = useState('pixellab, mobile, poster, editable');

  if (!isUploadResourceModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createResource({
      title: title.trim(),
      description: description.trim(),
      fileType,
      fileSize,
      isFree,
      price: isFree ? 0 : parseFloat(price) || 5,
      previewImage:
        previewImage.trim() ||
        'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80',
      downloadUrl: '#download-asset',
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      creatorId: currentUser.id,
      creatorName: currentUser.name,
      creatorAvatar: currentUser.avatar,
      category: 'Templates',
    });

    setIsUploadResourceModalOpen(false);
    showToast('Digital resource published successfully!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 text-slate-100">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-violet-400">
              <Sparkles className="w-3 h-3" /> Creator Asset Publisher
            </div>
            <h2 className="text-lg font-bold text-white font-heading">
              Upload Digital Resource
            </h2>
          </div>
          <button
            onClick={() => setIsUploadResourceModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-300 mb-1">
              Resource Title <span className="text-violet-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Modern Ramadan Poster PixelLab PLP Kit"
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-300 mb-1">File Format</label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value as ResourceFileType)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              >
                <option value="PLP">PixelLab Project (.PLP)</option>
                <option value="PSD">Photoshop (.PSD)</option>
                <option value="Canva">Canva Template Link</option>
                <option value="Font">Font (.OTF / .TTF)</option>
                <option value="Mockup">Realistic Mockup</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Estimated File Size</label>
              <input
                type="text"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                placeholder="e.g. 18.5 MB"
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Pricing Model */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="block font-bold text-slate-300">Access & Pricing</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="radio"
                  name="pricingModel"
                  checked={isFree}
                  onChange={() => setIsFree(true)}
                  className="accent-violet-500"
                />
                <span>Free Community Resource</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="radio"
                  name="pricingModel"
                  checked={!isFree}
                  onChange={() => setIsFree(false)}
                  className="accent-violet-500"
                />
                <span>Paid Resource</span>
              </label>
            </div>

            {!isFree && (
              <div className="pt-2 flex items-center gap-2">
                <span className="text-slate-400">Price ($ USD):</span>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-24 p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-center font-bold"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Preview Image URL</label>
            <input
              type="url"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Description & Usage Instructions</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain how to open the .plp file in PixelLab or edit layers in Photoshop..."
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 transition"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Publish Resource to Market</span>
          </button>
        </form>
      </div>
    </div>
  );
};
