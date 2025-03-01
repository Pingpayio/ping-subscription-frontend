
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'monthly' | 'yearly';
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
  amount: number;
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
}

export interface User {
  id: string;
  name: string;
  email: string;
  subscriptions: UserSubscription[];
  paymentMethods: PaymentMethod[];
  paymentHistory: PaymentHistory[];
}
