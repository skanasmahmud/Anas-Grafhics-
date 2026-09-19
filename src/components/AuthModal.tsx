import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, UserCheck, Shield, Lock, Mail } from 'lucide-react';
import { UserRole } from '../types';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, switchRole, currentUser, showToast } = useApp();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('buyer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switchRole(selectedRole);
    setIsAuthModalOpen(false);
    showToast(
      authMode === 'login'
        ? `Logged in as ${selectedRole.toUpperCase()}`
        : `Account created as ${selectedRole.toUpperCase()}`,
      'success'
    );
  };

  const handleQuickSwitch = (role: UserRole) => {
    switchRole(role);
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 text-slate-100">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
              <Sparkles className="w-3 h-3" /> ANAS Graphics ID
            </div>
            <h2 className="text-lg font-bold text-white font-heading">
              {authMode === 'login' ? 'Welcome Back' : 'Join ANAS Graphics'}
            </h2>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Switcher Strip */}
        <div className="p-4 bg-slate-950/80 border-b border-slate-800/80">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
            Quick Persona Switch (Test All 3 Roles):
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickSwitch('buyer')}
              className={`p-2 rounded-xl text-xs font-semibold border transition text-center ${
                currentUser.role === 'buyer'
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Buyer Mode
            </button>
            <button
              type="button"
              onClick={() => handleQuickSwitch('seller')}
              className={`p-2 rounded-xl text-xs font-semibold border transition text-center ${
                currentUser.role === 'seller'
                  ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Seller / Creator
            </button>
            <button
              type="button"
              onClick={() => handleQuickSwitch('admin')}
              className={`p-2 rounded-xl text-xs font-semibold border transition text-center ${
                currentUser.role === 'admin'
                  ? 'bg-amber-600/20 border-amber-500 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Admin Mode
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Tab toggle */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-950 border border-slate-800">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`py-1.5 rounded-lg font-semibold transition ${
                authMode === 'login' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`py-1.5 rounded-lg font-semibold transition ${
                authMode === 'signup' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Account Role Selector */}
          <div>
            <label className="block font-bold text-slate-300 mb-1">Select Account Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedRole('buyer')}
                className={`p-2.5 rounded-xl border text-center font-semibold transition ${
                  selectedRole === 'buyer'
                    ? 'border-indigo-500 bg-indigo-950/40 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              >
                I Want to Hire
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('seller')}
                className={`p-2.5 rounded-xl border text-center font-semibold transition ${
                  selectedRole === 'seller'
                    ? 'border-indigo-500 bg-indigo-950/40 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              >
                I Want to Sell Design
              </button>
            </div>
          </div>

          {authMode === 'signup' && (
            <div>
              <label className="block font-bold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Maya Chen"
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition mt-2"
          >
            {authMode === 'login' ? 'Log In to Account' : 'Create Free Account'}
          </button>
        </form>
      </div>
    </div>
  );
};
