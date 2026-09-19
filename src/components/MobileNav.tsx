import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Compass, Layers, MessageSquare, User, Shield, Briefcase } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { currentView, setCurrentView, currentUser, unreadNotificationCount } = useApp();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1.5 safe-area-pb">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => setCurrentView('home')}
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition ${
            currentView === 'home' ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'
          }`}
          id="mobile-nav-home"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium">Home</span>
        </button>

        {/* Explore Services */}
        <button
          onClick={() => setCurrentView('services')}
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition ${
            currentView === 'services' || currentView === 'categories'
              ? 'text-indigo-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          id="mobile-nav-explore"
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium">Services</span>
        </button>

        {/* Digital Resources (PLP & PSD) */}
        <button
          onClick={() => setCurrentView('digital-resources')}
          className={`flex flex-col items-center justify-center w-16 py-1 rounded-xl transition ${
            currentView === 'digital-resources'
              ? 'text-violet-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          id="mobile-nav-resources"
        >
          <div className="relative">
            <Layers className="w-5 h-5" />
            <span className="absolute -top-1 -right-2 text-[8px] px-1 bg-violet-600 text-white rounded-full font-bold">
              PLP
            </span>
          </div>
          <span className="text-[10px] mt-0.5 font-medium">Resources</span>
        </button>

        {/* Messages */}
        <button
          onClick={() => setCurrentView('messages')}
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition relative ${
            currentView === 'messages' ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'
          }`}
          id="mobile-nav-messages"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium">Chats</span>
        </button>

        {/* Dashboard / Persona Profile */}
        <button
          onClick={() => {
            if (currentUser.role === 'admin') {
              setCurrentView('admin');
            } else if (currentUser.role === 'seller') {
              setCurrentView('seller-dashboard');
            } else {
              setCurrentView('buyer-dashboard');
            }
          }}
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition relative ${
            currentView === 'buyer-dashboard' ||
            currentView === 'seller-dashboard' ||
            currentView === 'admin'
              ? 'text-indigo-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          id="mobile-nav-profile"
        >
          {currentUser.role === 'admin' ? (
            <Shield className="w-5 h-5 text-amber-400" />
          ) : currentUser.role === 'seller' ? (
            <Briefcase className="w-5 h-5 text-emerald-400" />
          ) : (
            <User className="w-5 h-5" />
          )}
          <span className="text-[10px] mt-0.5 font-medium capitalize truncate max-w-[55px]">
            {currentUser.role === 'seller' ? 'Seller' : currentUser.role === 'admin' ? 'Admin' : 'Me'}
          </span>
          {unreadNotificationCount > 0 && (
            <span className="absolute top-1 right-2.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-slate-950" />
          )}
        </button>
      </div>
    </nav>
  );
};
