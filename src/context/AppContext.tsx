import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  Service,
  Seller,
  Category,
  DigitalResource,
  Order,
  Review,
  Message,
  Notification,
  OrderStatus,
  ResourceFileType,
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_SELLERS,
  INITIAL_SERVICES,
  INITIAL_RESOURCES,
  INITIAL_REVIEWS,
  INITIAL_ORDERS,
  INITIAL_MESSAGES,
  INITIAL_NOTIFICATIONS,
  DEMO_USERS,
} from '../data/mockData';

export type AppView = 
  | 'home' 
  | 'categories' 
  | 'services' 
  | 'service-detail' 
  | 'digital-resources' 
  | 'seller-profile' 
  | 'buyer-dashboard' 
  | 'seller-dashboard' 
  | 'create-service' 
  | 'edit-service' 
  | 'admin' 
  | 'favorites' 
  | 'messages' 
  | 'order-detail';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
  users: User[];
  toggleUserStatus: (userId: string) => void;
  
  // Navigation & View state
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedService: Service | null;
  setSelectedService: (service: Service | null) => void;
  selectedSeller: Seller | null;
  setSelectedSeller: (seller: Seller | null) => void;
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
  selectedOrder: Order | null;
  setSelectedOrder: (order: Order | null) => void;
  activeConversationSellerId: string | null;
  setActiveConversationSellerId: (sellerId: string | null) => void;

  // Services
  services: Service[];
  createService: (service: Omit<Service, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewCount' | 'slug'>) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;
  approveService: (id: string) => void;
  rejectService: (id: string) => void;
  toggleFeaturedService: (id: string) => void;

  // Sellers
  sellers: Seller[];
  getSellerById: (id: string) => Seller | undefined;
  updateSellerProfile: (sellerId: string, updates: Partial<Seller>) => void;

  // Categories
  categories: Category[];

  // Digital Resources
  resources: DigitalResource[];
  createResource: (res: Omit<DigitalResource, 'id' | 'createdAt' | 'downloadCount' | 'rating'>) => void;
  deleteResource: (id: string) => void;
  downloadResource: (id: string) => void;

  // Orders
  orders: Order[];
  createOrder: (service: Service, packageTierKey: 'basic' | 'standard' | 'premium', requirementsText: string) => Order;
  deliverOrder: (orderId: string, notes: string, fileNames: string[]) => void;
  requestOrderRevision: (orderId: string, notes: string) => void;
  acceptAndCompleteOrder: (orderId: string) => void;
  cancelOrder: (orderId: string) => void;

  // Reviews
  reviews: Review[];
  createReview: (orderId: string, serviceId: string, rating: number, comment: string) => void;
  replyToReview: (reviewId: string, replyText: string) => void;

  // Messages
  messages: Message[];
  sendMessage: (receiverId: string, text: string, orderRefId?: string, attachment?: { name: string; url: string; size: string; type: string }) => void;
  openChatWithSeller: (sellerId: string, orderRefId?: string) => void;

  // Favorites
  favorites: { id: string; targetId: string; type: 'service' | 'seller' | 'resource' }[];
  toggleFavorite: (targetId: string, type: 'service' | 'seller' | 'resource') => void;
  isFavorite: (targetId: string) => boolean;

  // Notifications
  notifications: Notification[];
  unreadNotificationCount: number;
  markNotificationsAsRead: () => void;

  // Search & Filtering
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFilterCategory: string;
  setSelectedFilterCategory: (cat: string) => void;
  priceFilter: [number, number];
  setPriceFilter: (range: [number, number]) => void;
  deliveryFilter: number; // 0 = any, 1 = 24h, 3 = 3 days, 7 = 7 days
  setDeliveryFilter: (days: number) => void;
  ratingFilter: number;
  setRatingFilter: (rating: number) => void;
  sellerLevelFilter: string;
  setSellerLevelFilter: (level: string) => void;
  sortBy: 'relevance' | 'newest' | 'popular' | 'price-asc' | 'price-desc';
  setSortBy: (sort: 'relevance' | 'newest' | 'popular' | 'price-asc' | 'price-desc') => void;
  resourceTypeFilter: string;
  setResourceTypeFilter: (type: string) => void;
  resourceFreePaidFilter: 'all' | 'free' | 'paid';
  setResourceFreePaidFilter: (val: 'all' | 'free' | 'paid') => void;

  // Modals & UI helpers
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isOrderModalOpen: boolean;
  setIsOrderModalOpen: (open: boolean) => void;
  orderModalPackage: 'basic' | 'standard' | 'premium';
  setOrderModalPackage: (pkg: 'basic' | 'standard' | 'premium') => void;
  isReviewModalOpen: boolean;
  setIsReviewModalOpen: (open: boolean) => void;
  reviewModalOrder: Order | null;
  setReviewModalOrder: (order: Order | null) => void;
  isUploadResourceModalOpen: boolean;
  setIsUploadResourceModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Users & Role state
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('anas_users');
    return saved ? JSON.parse(saved) : DEMO_USERS;
  });
  
  const [currentUser, setCurrentUser] = useState<User>(() => {
    return DEMO_USERS[0]; // Alex Mercer (Buyer) by default
  });

  // Views & Routing state
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeConversationSellerId, setActiveConversationSellerId] = useState<string | null>('seller-anas');

  // Core entities state with localStorage caching
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('anas_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [sellers, setSellers] = useState<Seller[]>(() => {
    const saved = localStorage.getItem('anas_sellers');
    return saved ? JSON.parse(saved) : INITIAL_SELLERS;
  });

  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);

  const [resources, setResources] = useState<DigitalResource[]>(() => {
    const saved = localStorage.getItem('anas_resources');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('anas_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('anas_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('anas_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [favorites, setFavorites] = useState<{ id: string; targetId: string; type: 'service' | 'seller' | 'resource' }[]>(() => {
    const saved = localStorage.getItem('anas_favorites');
    return saved ? JSON.parse(saved) : [
      { id: 'fav-1', targetId: 'srv-1', type: 'service' },
      { id: 'fav-2', targetId: 'res-1', type: 'resource' },
    ];
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('anas_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<[number, number]>([0, 200]);
  const [deliveryFilter, setDeliveryFilter] = useState<number>(0);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [sellerLevelFilter, setSellerLevelFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'popular' | 'price-asc' | 'price-desc'>('relevance');
  const [resourceTypeFilter, setResourceTypeFilter] = useState<string>('all');
  const [resourceFreePaidFilter, setResourceFreePaidFilter] = useState<'all' | 'free' | 'paid'>('all');

  // Modals & UI
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderModalPackage, setOrderModalPackage] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewModalOrder, setReviewModalOrder] = useState<Order | null>(null);
  const [isUploadResourceModalOpen, setIsUploadResourceModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('anas_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('anas_resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('anas_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('anas_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('anas_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('anas_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('anas_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('anas_users', JSON.stringify(users));
  }, [users]);

  // Toast helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Role switching
  const switchRole = (role: UserRole) => {
    if (role === 'buyer') {
      const buyerUser = users.find((u) => u.role === 'buyer') || DEMO_USERS[0];
      setCurrentUser(buyerUser);
      showToast('Switched to Buyer Mode', 'info');
    } else if (role === 'seller') {
      const sellerUser = users.find((u) => u.role === 'seller') || DEMO_USERS[1];
      setCurrentUser(sellerUser);
      showToast('Switched to Seller Mode (Anas Mahmud)', 'info');
    } else if (role === 'admin') {
      const adminUser = users.find((u) => u.role === 'admin') || DEMO_USERS[2];
      setCurrentUser(adminUser);
      showToast('Switched to Admin Mode', 'info');
    }
  };

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' }
          : u
      )
    );
    showToast('User account status updated', 'success');
  };

  const getSellerById = (id: string) => {
    return sellers.find((s) => s.id === id);
  };

  const updateSellerProfile = (sellerId: string, updates: Partial<Seller>) => {
    setSellers((prev) =>
      prev.map((s) => (s.id === sellerId ? { ...s, ...updates } : s))
    );
    showToast('Seller profile updated successfully', 'success');
  };

  // Services Management
  const createService = (newSrv: Omit<Service, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewCount' | 'slug'>) => {
    const id = `srv-${Date.now()}`;
    const slug = newSrv.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const service: Service = {
      ...newSrv,
      id,
      slug,
      rating: 5.0,
      reviewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setServices((prev) => [service, ...prev]);
    showToast('Service published successfully!', 'success');
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s))
    );
    showToast('Service updated', 'success');
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    showToast('Service deleted', 'info');
  };

  const approveService = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'active' } : s))
    );
    showToast('Service approved for marketplace', 'success');
  };

  const rejectService = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'rejected' } : s))
    );
    showToast('Service rejected', 'error');
  };

  const toggleFeaturedService = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, featured: !s.featured } : s))
    );
    showToast('Featured status updated', 'success');
  };

  // Digital Resources Management
  const createResource = (res: Omit<DigitalResource, 'id' | 'createdAt' | 'downloadCount' | 'rating'>) => {
    const id = `res-${Date.now()}`;
    const resource: DigitalResource = {
      ...res,
      id,
      downloadCount: 0,
      rating: 5.0,
      createdAt: new Date().toISOString(),
    };
    setResources((prev) => [resource, ...prev]);
    showToast('Digital resource listed for download!', 'success');
  };

  const deleteResource = (id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
    showToast('Resource removed', 'info');
  };

  const downloadResource = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, downloadCount: r.downloadCount + 1 } : r))
    );
    showToast('Download started for digital asset!', 'success');
  };

  // Orders Management
  const createOrder = (
    service: Service,
    packageTierKey: 'basic' | 'standard' | 'premium',
    requirementsText: string
  ): Order => {
    const pkg = service.packages[packageTierKey];
    const seller = getSellerById(service.sellerId);
    const orderNumber = `AG-${Math.floor(1000 + Math.random() * 9000)}`;
    const due = new Date();
    due.setDate(due.getDate() + pkg.deliveryDays);

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      buyerAvatar: currentUser.avatar,
      sellerId: service.sellerId,
      sellerName: seller?.displayName || 'ANAS Creator',
      sellerAvatar: seller?.avatar || service.gallery[0],
      item: {
        serviceId: service.id,
        serviceTitle: service.title,
        packageTier: packageTierKey,
        packageName: pkg.name + ' Package',
        price: pkg.price,
        deliveryDays: pkg.deliveryDays,
        revisions: pkg.revisions,
      },
      status: 'Pending',
      paymentStatus: 'Paid',
      requirementsNotes: requirementsText,
      totalAmount: pkg.price,
      dueDate: due.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Send a system message into conversation
    const welcomeMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'system',
      senderName: 'ANAS Graphics System',
      senderAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
      receiverId: service.sellerId,
      text: `Order #${orderNumber} placed by ${currentUser.name} for "${service.title}" (${pkg.name} Package - $${pkg.price}). Requirements: "${requirementsText || 'Standard request'}"`,
      orderRefId: newOrder.id,
      timestamp: 'Just now',
      isRead: false,
    };
    setMessages((prev) => [...prev, welcomeMsg]);

    // Notification for buyer
    const notif: Notification = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      title: 'Order Placed Successfully!',
      message: `Your order #${orderNumber} has been submitted to ${seller?.displayName}.`,
      type: 'order',
      isRead: false,
      timestamp: 'Just now',
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast(`Order #${orderNumber} placed successfully!`, 'success');
    return newOrder;
  };

  const deliverOrder = (orderId: string, notes: string, fileNames: string[]) => {
    const deliveryFiles = fileNames.map((fn) => ({
      fileName: fn,
      fileUrl: `#download-${fn.toLowerCase().replace(/\s+/g, '-')}`,
      fileSize: '12.4 MB',
    }));

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: 'Delivered',
              deliveryNotes: notes,
              deliveryFiles,
              updatedAt: new Date().toISOString(),
            }
          : o
      )
    );

    showToast('Order files successfully delivered to client!', 'success');
  };

  const requestOrderRevision = (orderId: string, notes: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: 'Revision Requested',
              revisionNotes: notes,
              updatedAt: new Date().toISOString(),
            }
          : o
      )
    );
    showToast('Revision request sent to the seller', 'info');
  };

  const acceptAndCompleteOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: 'Completed',
              updatedAt: new Date().toISOString(),
            }
          : o
      )
    );
    const ord = orders.find((o) => o.id === orderId);
    if (ord) {
      setReviewModalOrder(ord);
      setIsReviewModalOpen(true);
    }
    showToast('Order marked as Completed! Please share a review.', 'success');
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Cancelled' } : o))
    );
    showToast('Order cancelled', 'info');
  };

  // Reviews Management
  const createReview = (orderId: string, serviceId: string, rating: number, comment: string) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      serviceId,
      orderId,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      buyerAvatar: currentUser.avatar,
      buyerCountry: 'Client',
      rating,
      comment,
      date: 'Just now',
    };
    setReviews((prev) => [newRev, ...prev]);

    // Recalculate service rating
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === serviceId) {
          const srvReviews = [...reviews.filter((r) => r.serviceId === serviceId), newRev];
          const avg = srvReviews.reduce((sum, r) => sum + r.rating, 0) / srvReviews.length;
          return {
            ...s,
            rating: Number(avg.toFixed(2)),
            reviewCount: srvReviews.length,
          };
        }
        return s;
      })
    );

    showToast('Review submitted! Thank you for supporting the designer.', 'success');
  };

  const replyToReview = (reviewId: string, replyText: string) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              sellerReply: {
                comment: replyText,
                date: 'Just now',
              },
            }
          : r
      )
    );
    showToast('Reply published to public review', 'success');
  };

  // Messaging Management
  const sendMessage = (
    receiverId: string,
    text: string,
    orderRefId?: string,
    attachment?: { name: string; url: string; size: string; type: string }
  ) => {
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      receiverId,
      text,
      orderRefId,
      attachment,
      timestamp: 'Just now',
      isRead: false,
    };
    setMessages((prev) => [...prev, newMsg]);
    showToast('Message sent', 'info');
  };

  const openChatWithSeller = (sellerId: string, orderRefId?: string) => {
    setActiveConversationSellerId(sellerId);
    setCurrentView('messages');
  };

  // Favorites
  const toggleFavorite = (targetId: string, type: 'service' | 'seller' | 'resource') => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.targetId === targetId);
      if (exists) {
        showToast('Removed from favorites', 'info');
        return prev.filter((f) => f.targetId !== targetId);
      } else {
        showToast('Saved to favorites!', 'success');
        return [...prev, { id: `fav-${Date.now()}`, targetId, type }];
      }
    });
  };

  const isFavorite = (targetId: string) => {
    return favorites.some((f) => f.targetId === targetId);
  };

  // Notifications
  const unreadNotificationCount = notifications.filter((n) => !n.isRead).length;

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        users,
        toggleUserStatus,
        currentView,
        setCurrentView,
        selectedService,
        setSelectedService,
        selectedSeller,
        setSelectedSeller,
        selectedCategory,
        setSelectedCategory,
        selectedOrder,
        setSelectedOrder,
        activeConversationSellerId,
        setActiveConversationSellerId,
        services,
        createService,
        updateService,
        deleteService,
        approveService,
        rejectService,
        toggleFeaturedService,
        sellers,
        getSellerById,
        updateSellerProfile,
        categories,
        resources,
        createResource,
        deleteResource,
        downloadResource,
        orders,
        createOrder,
        deliverOrder,
        requestOrderRevision,
        acceptAndCompleteOrder,
        cancelOrder,
        reviews,
        createReview,
        replyToReview,
        messages,
        sendMessage,
        openChatWithSeller,
        favorites,
        toggleFavorite,
        isFavorite,
        notifications,
        unreadNotificationCount,
        markNotificationsAsRead,
        searchQuery,
        setSearchQuery,
        selectedFilterCategory,
        setSelectedFilterCategory,
        priceFilter,
        setPriceFilter,
        deliveryFilter,
        setDeliveryFilter,
        ratingFilter,
        setRatingFilter,
        sellerLevelFilter,
        setSellerLevelFilter,
        sortBy,
        setSortBy,
        resourceTypeFilter,
        setResourceTypeFilter,
        resourceFreePaidFilter,
        setResourceFreePaidFilter,
        toasts,
        showToast,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isOrderModalOpen,
        setIsOrderModalOpen,
        orderModalPackage,
        setOrderModalPackage,
        isReviewModalOpen,
        setIsReviewModalOpen,
        reviewModalOrder,
        setReviewModalOrder,
        isUploadResourceModalOpen,
        setIsUploadResourceModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
