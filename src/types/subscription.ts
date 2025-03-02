
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'daily' | 'weekly' | 'monthly' | 'yearly';
  features: string[];
  isPopular?: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  details: string;
  isDefault: boolean;
  expiryDate?: string;
  lastFour?: string;
}

export interface PaymentHistory {
  id: string;
  date: string;
  amount: string | number; // Updated to accept both string and number
  status: 'successful' | 'failed' | 'pending' | 'refunded';
  planName: string;
  paymentMethod: string;
}

export interface UserSubscription {
  id: string;
  planId: string;
  status: 'active' | 'canceled' | 'expired' | 'trial';
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  startDate: string;
  maxDuration?: number; // in days
}

export interface User {
  id: string;
  name: string;
  email: string;
  subscriptions: UserSubscription[];
  paymentMethods: PaymentMethod[];
  paymentHistory: PaymentHistory[];
}
