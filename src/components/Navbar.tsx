import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Heart,
  MessageSquare,
  Bell,
  User,
  Shield,
  Briefcase,
  PlusCircle,
  Menu,
  X,
  Palette,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    switchRole,
    currentView,
    setCurrentView,
    searchQuery,
    setSearchQuery,
    favorites,
    unreadNotificationCount,
    markNotificationsAsRead,
    notifications,
    setIsAuthModalOpen,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentView('services');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 px-4 py-1.5 text-xs text-slate-300 border-b border-indigo-900/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Creative Hub
            </span>
            <span className="hidden sm:inline text-slate-300">
              Marketplace for graphic designers, PixelLab PLP & PSD resources
            </span>
            <span className="sm:hidden text-slate-300">ANAS Graphics Creative Market</span>
          </div>

          {/* Instant Role Switcher for seamless testing */}
          <div className="flex items-center gap-2 relative">
            <span className="text-[11px] text-slate-400 hidden md:inline">Mode:</span>
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-indigo-600/30 text-indigo-200 border border-indigo-500/40 hover:bg-indigo-600/50 transition-colors"
              >
                {currentUser.role === 'admin' && <Shield className="w-3.5 h-3.5 text-amber-400" />}
                {currentUser.role === 'seller' && <Briefcase className="w-3.5 h-3.5 text-emerald-400" />}
                {currentUser.role === 'buyer' && <User className="w-3.5 h-3.5 text-sky-400" />}
                <span className="capitalize">{currentUser.role} Mode</span>
                <span className="text-[10px] text-slate-400">▼</span>
              </button>

              {isRoleDropdownOpen && (
                <div
                  className="absolute right-0 mt-1 w-44 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-1 z-50 text-xs"
                  onClick={() => setIsRoleDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800">
                    Switch Active Persona
                  </div>
                  <button
                    onClick={() => switchRole('buyer')}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 transition ${
                      currentUser.role === 'buyer' ? 'text-indigo-400 font-semibold' : 'text-slate-200'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-sky-400" /> Buyer
                    </span>
                    {currentUser.role === 'buyer' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => switchRole('seller')}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 transition ${
                      currentUser.role === 'seller' ? 'text-indigo-400 font-semibold' : 'text-slate-200'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-emerald-400" /> Seller (Creator)
                    </span>
                    {currentUser.role === 'seller' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => switchRole('admin')}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 transition ${
                      currentUser.role === 'admin' ? 'text-indigo-400 font-semibold' : 'text-slate-200'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-amber-400" /> Platform Admin
                    </span>
                    {currentUser.role === 'admin' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-2.5 text-left group"
              id="brand-logo-btn"
            >
              {/* Custom ANAS Graphics Geometric Vector Mark */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
                <span className="font-heading font-extrabold text-white text-xl tracking-tighter">AG</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-white">
                    ANAS<span className="text-indigo-400">.</span>Graphics
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase hidden sm:block">
                  Creative Design Marketplace
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-2">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for graphic design, logo, poster, PLP, PSD..."
                className="w-full pl-10 pr-10 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                id="header-search-input"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>

          {/* Quick Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button
              onClick={() => setCurrentView('services')}
              className={`hover:text-white transition-colors ${currentView === 'services' ? 'text-indigo-400 font-semibold' : ''}`}
            >
              Browse Services
            </button>
            <button
              onClick={() => setCurrentView('digital-resources')}
              className={`flex items-center gap-1.5 hover:text-white transition-colors ${
                currentView === 'digital-resources' ? 'text-indigo-400 font-semibold' : ''
              }`}
            >
              <Palette className="w-4 h-4 text-violet-400" />
              <span>Digital Resources</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-violet-500/20 text-violet-300 rounded font-semibold border border-violet-500/30">
                PLP / PSD
              </span>
            </button>

            {currentUser.role === 'admin' ? (
              <button
                onClick={() => setCurrentView('admin')}
                className={`px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-semibold hover:bg-amber-500/20 flex items-center gap-1.5`}
              >
                <Shield className="w-3.5 h-3.5" /> Admin Panel
              </button>
            ) : currentUser.role === 'seller' ? (
              <button
                onClick={() => setCurrentView('create-service')}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Post Service
              </button>
            ) : (
              <button
                onClick={() => switchRole('seller')}
                className="text-indigo-300 hover:text-white transition-colors text-xs font-semibold border border-indigo-500/30 px-3 py-1.5 rounded-lg hover:bg-indigo-500/10"
              >
                Become a Seller
              </button>
            )}
          </nav>

          {/* Action Icons & User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Favorites Icon */}
            <button
              onClick={() => setCurrentView('favorites')}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 relative transition"
              title="Saved Favorites"
              id="header-favorites-btn"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Messages Icon */}
            <button
              onClick={() => setCurrentView('messages')}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 relative transition"
              title="Messages"
              id="header-messages-btn"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500"></span>
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  if (!isNotificationsOpen) {
                    markNotificationsAsRead();
                  }
                }}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 relative transition"
                title="Notifications"
                id="header-notifications-btn"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadNotificationCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown Panel */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl py-2 z-50 text-xs">
                  <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                    <span className="font-semibold text-slate-200">Notifications</span>
                    <button
                      onClick={markNotificationsAsRead}
                      className="text-[11px] text-indigo-400 hover:underline"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-slate-400">No notifications yet</div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            if (notif.linkAction === 'orders') {
                              setCurrentView(currentUser.role === 'seller' ? 'seller-dashboard' : 'buyer-dashboard');
                            } else if (notif.linkAction === 'messages') {
                              setCurrentView('messages');
                            }
                            setIsNotificationsOpen(false);
                          }}
                          className={`p-3.5 hover:bg-slate-800/70 cursor-pointer transition flex items-start gap-3 ${
                            !notif.isRead ? 'bg-indigo-950/20' : ''
                          }`}
                        >
                          <div className="w-2 h-2 rounded-full mt-1.5 bg-indigo-500 shrink-0" />
                          <div className="flex-1">
                            <p className="font-semibold text-slate-200 text-xs">{notif.title}</p>
                            <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">{notif.message}</p>
                            <span className="text-[10px] text-slate-500 mt-1 block">{notif.timestamp}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-800/60 transition"
                id="header-user-avatar-btn"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-xl object-cover ring-2 ring-indigo-500/40"
                />
                <span className="text-xs font-medium text-slate-200 hidden xl:block max-w-[100px] truncate">
                  {currentUser.name}
                </span>
              </button>

              {isProfileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl py-2 z-50 text-xs"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  <div className="px-4 py-2.5 border-b border-slate-800">
                    <p className="font-semibold text-slate-100 text-sm">{currentUser.name}</p>
                    <p className="text-slate-400 text-[11px]">@{currentUser.username}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 capitalize">
                      {currentUser.role} Account
                    </span>
                  </div>

                  <div className="py-1">
                    {currentUser.role === 'seller' ? (
                      <button
                        onClick={() => setCurrentView('seller-dashboard')}
                        className="w-full text-left px-4 py-2 hover:bg-slate-800 text-slate-200 flex items-center gap-2.5"
                      >
                        <Briefcase className="w-4 h-4 text-emerald-400" /> Seller Dashboard
                      </button>
                    ) : (
                      <button
                        onClick={() => setCurrentView('buyer-dashboard')}
                        className="w-full text-left px-4 py-2 hover:bg-slate-800 text-slate-200 flex items-center gap-2.5"
                      >
                        <User className="w-4 h-4 text-sky-400" /> Buyer Dashboard
                      </button>
                    )}

                    <button
                      onClick={() => setCurrentView('messages')}
                      className="w-full text-left px-4 py-2 hover:bg-slate-800 text-slate-200 flex items-center gap-2.5"
                    >
                      <MessageSquare className="w-4 h-4 text-indigo-400" /> My Chats
                    </button>

                    <button
                      onClick={() => setCurrentView('favorites')}
                      className="w-full text-left px-4 py-2 hover:bg-slate-800 text-slate-200 flex items-center gap-2.5"
                    >
                      <Heart className="w-4 h-4 text-pink-400" /> Saved Favorites
                    </button>

                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => setCurrentView('admin')}
                        className="w-full text-left px-4 py-2 hover:bg-slate-800 text-amber-300 flex items-center gap-2.5"
                      >
                        <Shield className="w-4 h-4 text-amber-400" /> Admin Control
                      </button>
                    )}
                  </div>

                  <div className="border-t border-slate-800 pt-1">
                    <button
                      onClick={() => setIsAuthModalOpen(true)}
                      className="w-full text-left px-4 py-2 hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                    >
                      Sign In / Switch User
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60"
              id="mobile-menu-toggle-btn"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar in Header */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search graphic design, PLP, PSD..."
              className="w-full pl-9 pr-9 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Mobile Slide-Out Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setCurrentView('services');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-left hover:border-slate-700"
            >
              <div className="font-semibold text-white text-xs">All Services</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Explore 15 categories</div>
            </button>
            <button
              onClick={() => {
                setCurrentView('digital-resources');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 bg-indigo-950/40 border border-indigo-800/50 rounded-xl text-left hover:border-indigo-600"
            >
              <div className="font-semibold text-indigo-300 text-xs">Digital Resources</div>
              <div className="text-[10px] text-indigo-400/80 mt-0.5">PLP, PSD & Templates</div>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800/80 space-y-1 text-sm">
            <button
              onClick={() => {
                setCurrentView(currentUser.role === 'seller' ? 'seller-dashboard' : 'buyer-dashboard');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-900 text-slate-200 flex items-center justify-between"
            >
              <span>{currentUser.role === 'seller' ? 'Seller Dashboard' : 'Buyer Dashboard'}</span>
              <span className="text-xs text-indigo-400">View →</span>
            </button>
            {currentUser.role === 'seller' && (
              <button
                onClick={() => {
                  setCurrentView('create-service');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg bg-indigo-600 text-white font-medium flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" /> Create New Service
              </button>
            )}
            {currentUser.role === 'admin' && (
              <button
                onClick={() => {
                  setCurrentView('admin');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium flex items-center gap-2"
              >
                <Shield className="w-4 h-4" /> Admin Dashboard
              </button>
            )}
            <button
              onClick={() => {
                setIsAuthModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-slate-400 text-xs hover:text-white"
            >
              Switch Account / Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
