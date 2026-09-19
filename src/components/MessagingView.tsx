import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Send,
  Paperclip,
  Image,
  FileCode,
  CheckCheck,
  Search,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { Message } from '../types';

export const MessagingView: React.FC = () => {
  const {
    messages,
    sendMessage,
    currentUser,
    sellers,
    activeConversationSellerId,
    setActiveConversationSellerId,
    services,
    setSelectedService,
    setCurrentView,
  } = useApp();

  const [messageText, setMessageText] = useState('');
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);

  // Active seller ID defaulting to first seller
  const activeSellerId =
    activeConversationSellerId || sellers[0]?.id || 'user-seller-anas';
  const activeSeller = sellers.find((s) => s.id === activeSellerId) || sellers[0];

  // Filter messages for current thread
  const conversationMessages = messages.filter(
    (m) =>
      (m.senderId === currentUser.id && m.receiverId === activeSellerId) ||
      (m.senderId === activeSellerId && m.receiverId === currentUser.id)
  );

  // Determine if there is a linked service
  const lastOrderRef = conversationMessages.find((m) => m.orderRefId)?.orderRefId;
  const linkedService = services.find((s) => s.sellerId === activeSellerId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !activeSeller) return;

    sendMessage(activeSeller.id, messageText.trim(), lastOrderRef);
    setMessageText('');
    setShowAttachmentMenu(false);
  };

  const handleSendSimulatedAttachment = (type: 'PLP' | 'PSD' | 'ZIP' | 'IMAGE') => {
    if (!activeSeller) return;
    const attachmentMap = {
      PLP: {
        name: 'modern_poster_template.plp',
        url: '#download',
        type: 'file',
        size: '12.4 MB',
      },
      PSD: {
        name: 'brand_stationery_mockup.psd',
        url: '#download',
        type: 'file',
        size: '48.2 MB',
      },
      ZIP: {
        name: 'vector_source_package.zip',
        url: '#download',
        type: 'file',
        size: '31.5 MB',
      },
      IMAGE: {
        name: 'design_concept_preview.png',
        url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
        type: 'image',
        size: '3.8 MB',
      },
    };

    const att = attachmentMap[type];
    sendMessage(
      activeSeller.id,
      `Shared project attachment: ${att.name}`,
      lastOrderRef,
      att
    );
    setShowAttachmentMenu(false);
  };

  return (
    <div className="py-6 sm:py-8 bg-slate-950 min-h-[calc(100vh-4rem)] text-slate-100 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Chat Card Shell */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 h-[720px]">
          {/* Left Column: Conversations List */}
          <div className="md:col-span-4 border-r border-slate-800 flex flex-col bg-slate-950/40">
            <div className="p-4 border-b border-slate-800">
              <h2 className="text-base font-bold text-white font-heading flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                <span>Direct Messages</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Collaborate with designers & clients
              </p>
            </div>

            {/* Conversation list items */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 no-scrollbar">
              {sellers.map((seller) => {
                const isCurrent = activeSeller?.id === seller.id;
                const thread = messages.filter(
                  (m) =>
                    (m.senderId === currentUser.id && m.receiverId === seller.id) ||
                    (m.senderId === seller.id && m.receiverId === currentUser.id)
                );
                const lastMsg = thread[thread.length - 1];

                return (
                  <div
                    key={seller.id}
                    onClick={() => setActiveConversationSellerId(seller.id)}
                    className={`p-3.5 flex items-center gap-3 cursor-pointer transition ${
                      isCurrent
                        ? 'bg-indigo-600/10 border-l-4 border-indigo-500'
                        : 'hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={seller.avatar}
                        alt={seller.displayName}
                        className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-700"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className="text-xs font-bold text-white truncate">
                          {seller.displayName}
                        </h4>
                        <span className="text-[10px] text-slate-500">
                          {lastMsg ? lastMsg.timestamp : 'Online'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">
                        {lastMsg ? lastMsg.text : `${seller.tagline}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Chat Screen & Timeline */}
          <div className="md:col-span-8 flex flex-col bg-slate-900/70">
            {activeSeller ? (
              <>
                {/* Active Chat Header with Order reference */}
                <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeSeller.avatar}
                      alt={activeSeller.displayName}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-indigo-500/40"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{activeSeller.displayName}</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        {activeSeller.badge} • Replies in {activeSeller.responseTime}
                      </p>
                    </div>
                  </div>

                  {/* Gig / Service Reference if linked */}
                  {linkedService && (
                    <button
                      onClick={() => {
                        setSelectedService(linkedService);
                        setCurrentView('service-detail');
                      }}
                      className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-indigo-300 hover:text-white transition"
                    >
                      <span>{linkedService.title.slice(0, 24)}...</span>
                      <ExternalLink className="w-3 h-3 text-indigo-400" />
                    </button>
                  )}
                </div>

                {/* Messages Timeline */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 no-scrollbar">
                  {conversationMessages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        Start a conversation with {activeSeller.displayName}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm">
                        Ask questions about custom design briefs, PixelLab files, turnaround times, or request a custom quote.
                      </p>
                    </div>
                  ) : (
                    conversationMessages.map((msg) => {
                      const isMine = msg.senderId === currentUser.id;

                      return (
                        <div
                          key={msg.id}
                          className={`flex gap-3 max-w-[85%] ${
                            isMine ? 'ml-auto flex-row-reverse' : ''
                          }`}
                        >
                          <img
                            src={isMine ? currentUser.avatar : activeSeller.avatar}
                            alt="Avatar"
                            className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-800 shrink-0 mt-1"
                          />
                          <div className="space-y-1">
                            <div
                              className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                                isMine
                                  ? 'bg-indigo-600 text-white rounded-tr-none'
                                  : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700/60'
                              }`}
                            >
                              <p>{msg.text}</p>

                              {/* Attachment rendering */}
                              {msg.attachment && (
                                <div className="mt-2.5 pt-2 border-t border-white/20 space-y-1.5">
                                  <div className="flex items-center gap-2 p-1.5 rounded bg-black/20 text-[11px]">
                                    <Paperclip className="w-3.5 h-3.5 shrink-0" />
                                    <span className="truncate font-mono">{msg.attachment.name}</span>
                                    {msg.attachment.size && (
                                      <span className="opacity-70 text-[10px]">
                                        ({msg.attachment.size})
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div
                              className={`flex items-center gap-1 text-[10px] text-slate-500 ${
                                isMine ? 'justify-end' : 'justify-start'
                              }`}
                            >
                              <span>{msg.timestamp}</span>
                              {isMine && <CheckCheck className="w-3 h-3 text-indigo-400" />}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Chat Input Bar & Attachment Controls */}
                <div className="p-4 border-t border-slate-800 bg-slate-950/80 relative">
                  {showAttachmentMenu && (
                    <div className="absolute bottom-16 left-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-2 flex flex-col gap-1 z-20 text-xs text-slate-300">
                      <button
                        type="button"
                        onClick={() => handleSendSimulatedAttachment('PLP')}
                        className="px-3 py-1.5 hover:bg-slate-800 rounded-lg text-left flex items-center gap-2"
                      >
                        <FileCode className="w-4 h-4 text-violet-400" />
                        <span>Attach PixelLab (.PLP) Project</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSendSimulatedAttachment('PSD')}
                        className="px-3 py-1.5 hover:bg-slate-800 rounded-lg text-left flex items-center gap-2"
                      >
                        <FileCode className="w-4 h-4 text-sky-400" />
                        <span>Attach Photoshop (.PSD) File</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSendSimulatedAttachment('ZIP')}
                        className="px-3 py-1.5 hover:bg-slate-800 rounded-lg text-left flex items-center gap-2"
                      >
                        <Paperclip className="w-4 h-4 text-emerald-400" />
                        <span>Attach Source (.ZIP) Archive</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSendSimulatedAttachment('IMAGE')}
                        className="px-3 py-1.5 hover:bg-slate-800 rounded-lg text-left flex items-center gap-2"
                      >
                        <Image className="w-4 h-4 text-amber-400" />
                        <span>Attach Concept Preview Image</span>
                      </button>
                    </div>
                  )}

                  <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition"
                      title="Attach file (PLP, PSD, ZIP, Image)"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>

                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder={`Message ${activeSeller.displayName}...`}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <button
                      type="submit"
                      disabled={!messageText.trim()}
                      className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white shadow-md transition"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-500 text-xs">
                Select a creator from the left to start messaging.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
