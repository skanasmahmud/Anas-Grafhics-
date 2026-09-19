import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { CategoriesBar } from './components/CategoriesBar';
import { MobileNav } from './components/MobileNav';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ServicesListView } from './components/ServicesListView';
import { ServiceDetailView } from './components/ServiceDetailView';
import { DigitalResourcesView } from './components/DigitalResourcesView';
import { BuyerDashboardView } from './components/BuyerDashboardView';
import { SellerDashboardView } from './components/SellerDashboardView';
import { SellerProfileView } from './components/SellerProfileView';
import { CreateServiceView } from './components/CreateServiceView';
import { MessagingView } from './components/MessagingView';
import { AdminPanelView } from './components/AdminPanelView';
import { FavoritesView } from './components/FavoritesView';
import { OrderModal } from './components/OrderModal';
import { ReviewModal } from './components/ReviewModal';
import { UploadResourceModal } from './components/UploadResourceModal';
import { AuthModal } from './components/AuthModal';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, toasts } = useApp();

  // Scroll to top upon view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Global Top Navbar */}
      <Navbar />

      {/* Categories Bar */}
      <CategoriesBar />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'services' && <ServicesListView />}
        {currentView === 'service-detail' && <ServiceDetailView />}
        {currentView === 'digital-resources' && <DigitalResourcesView />}
        {currentView === 'buyer-dashboard' && <BuyerDashboardView />}
        {currentView === 'seller-dashboard' && <SellerDashboardView />}
        {currentView === 'seller-profile' && <SellerProfileView />}
        {currentView === 'create-service' && <CreateServiceView />}
        {currentView === 'messages' && <MessagingView />}
        {currentView === 'admin' && <AdminPanelView />}
        {currentView === 'favorites' && <FavoritesView />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Bottom Navigation for Mobile Devices */}
      <MobileNav />

      {/* Interactive Global Modals */}
      <OrderModal />
      <ReviewModal />
      <UploadResourceModal />
      <AuthModal />

      {/* Interactive Toast Notifications Stack */}
      {toasts && toasts.length > 0 && (
        <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`p-3.5 rounded-2xl shadow-2xl backdrop-blur-md border flex items-center justify-between gap-3 text-xs pointer-events-auto ${
                toast.type === 'success'
                  ? 'bg-slate-900/95 border-emerald-500/50 text-emerald-300'
                  : toast.type === 'error'
                  ? 'bg-slate-900/95 border-rose-500/50 text-rose-300'
                  : 'bg-slate-900/95 border-indigo-500/50 text-indigo-300'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {toast.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                ) : toast.type === 'error' ? (
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                ) : (
                  <Info className="w-4 h-4 shrink-0 text-indigo-400" />
                )}
                <span className="font-medium truncate">{toast.message}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
