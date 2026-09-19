export type UserRole = 'buyer' | 'seller' | 'admin';

export type OrderStatus = 
  | 'Pending' 
  | 'Active' 
  | 'Delivered' 
  | 'Revision Requested' 
  | 'Completed' 
  | 'Cancelled';

export type PaymentStatus = 
  | 'Pending' 
  | 'Paid' 
  | 'Failed' 
  | 'Refunded';

export type ResourceFileType = 'PLP' | 'PSD' | 'Canva' | 'Font' | 'Mockup' | 'Social Media' | 'Poster';

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: UserRole;
  avatar: string;
  status: 'active' | 'suspended';
  createdAt: string;
}

export interface Profile {
  userId: string;
  bio: string;
  skills: string[];
  languages: string[];
  country: string;
  timezone: string;
  portfolioUrl?: string;
  responseRate: number; // percentage
  responseTime: string; // e.g. "1 hour"
}

export interface Seller {
  id: string;
  userId: string;
  displayName: string;
  username: string;
  avatar: string;
  coverImage?: string;
  badge: 'Rising Creator' | 'Level 2 Seller' | 'Top Rated' | 'Verified Pro';
  tagline: string;
  bio: string;
  skills: string[];
  languages: string[];
  country: string;
  rating: number;
  reviewCount: number;
  completedOrders: number;
  activeOrders: number;
  totalEarnings: number;
  profileViews: number;
  joinedDate: string;
  responseTime: string;
  portfolio: {
    title: string;
    image: string;
    category: string;
  }[];
}

export interface PackageTier {
  id: string;
  name: string; // Basic, Standard, Premium
  title: string;
  description: string;
  price: number;
  deliveryDays: number;
  revisions: number | 'Unlimited';
  features: string[];
}

export interface Service {
  id: string;
  sellerId: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  subcategory: string;
  tags: string[];
  gallery: string[];
  videoUrl?: string;
  packages: {
    basic: PackageTier;
    standard: PackageTier;
    premium: PackageTier;
  };
  rating: number;
  reviewCount: number;
  status: 'active' | 'pending' | 'draft' | 'rejected';
  featured?: boolean;
  requirements: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  serviceCount: number;
  isPopular?: boolean;
}

export interface OrderItem {
  serviceId: string;
  serviceTitle: string;
  packageTier: 'basic' | 'standard' | 'premium';
  packageName: string;
  price: number;
  deliveryDays: number;
  revisions: number | 'Unlimited';
}

export interface Order {
  id: string;
  orderNumber: string;
  buyerId: string;
  buyerName: string;
  buyerAvatar: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  item: OrderItem;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  requirementsNotes?: string;
  requirementsFiles?: string[];
  deliveryNotes?: string;
  deliveryFiles?: {
    fileName: string;
    fileUrl: string;
    fileSize: string;
  }[];
  revisionNotes?: string;
  totalAmount: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  receiverId: string;
  text: string;
  attachment?: {
    name: string;
    url: string;
    size: string;
    type: string;
  };
  orderRefId?: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantRole: 'buyer' | 'seller';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  orderRefNumber?: string;
}

export interface Review {
  id: string;
  serviceId: string;
  sellerId?: string;
  orderId: string;
  buyerId: string;
  buyerName: string;
  buyerAvatar: string;
  buyerCountry: string;
  rating: number; // 1-5
  communicationRating?: number;
  serviceQualityRating?: number;
  deliveryRating?: number;
  comment: string;
  date: string;
  sellerReply?: {
    comment: string;
    date: string;
  };
}

export interface Favorite {
  id: string;
  userId: string;
  type: 'service' | 'seller' | 'resource';
  targetId: string;
  createdAt: string;
}

export interface DigitalResource {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  title: string;
  description: string;
  previewImage: string;
  fileType: ResourceFileType;
  fileSize: string;
  price: number; // 0 = Free
  isFree: boolean;
  category: string;
  tags: string[];
  downloadCount: number;
  rating: number;
  downloadUrl: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'message' | 'review' | 'system';
  isRead: boolean;
  linkAction?: string;
  timestamp: string;
}

export interface Payment {
  id: string;
  orderId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  currency: string;
  paymentMethod: 'Credit Card' | 'PayPal' | 'Wallet' | 'Stripe Demo';
  status: PaymentStatus;
  transactionId: string;
  createdAt: string;
}

export interface Report {
  id: string;
  reporterId: string;
  reportedItemId: string;
  itemType: 'service' | 'user' | 'resource' | 'message';
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
}
