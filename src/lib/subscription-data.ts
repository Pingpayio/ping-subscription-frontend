export type Subscription = {
  id: string;
  customerName: string;
  planName: string;
  status: 'active' | 'past_due' | 'canceled';
  amount: number;
  currency: string;
  startDate: string;
  nextBillingDate: string;
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer' | 'crypto';
  cardLastFour?: string;
};

export const subscriptions: Subscription[] = [
  {
    id: 'sub_1N2ZvK',
    customerName: 'Sarah Johnson',
    planName: 'Tier 1',
    status: 'active',
    amount: 50,
    currency: 'NEAR',
    startDate: '2025-02-15',
    nextBillingDate: '2025-06-15',
    paymentMethod: 'credit_card',
    cardLastFour: '4242',
  },
  {
    id: 'sub_2M3YuJ',
    customerName: 'Michael Chen',
    planName: 'Tier 2',
    status: 'active',
    amount: 100,
    currency: 'NEAR',
    startDate: '2025-01-10',
    nextBillingDate: '2025-06-10',
    paymentMethod: 'credit_card',
    cardLastFour: '1234',
  },
  {
    id: 'sub_3K4XtH',
    customerName: 'Emma Rodriguez',
    planName: 'Tier 1',
    status: 'active', // Changed from trialing to active
    amount: 50,
    currency: 'NEAR',
    startDate: '2025-05-30',
    nextBillingDate: '2025-06-30',
    paymentMethod: 'paypal',
  },
  {
    id: 'sub_4J5WsG',
    customerName: 'David Kim',
    planName: 'Tier 3',
    status: 'active',
    amount: 300,
    currency: 'NEAR',
    startDate: '2025-11-05',
    nextBillingDate: '2025-06-05',
    paymentMethod: 'bank_transfer',
  },
  {
    id: 'sub_5H6VrF',
    customerName: 'Olivia Thompson',
    planName: 'Tier 1',
    status: 'past_due',
    amount: 50,
    currency: 'NEAR',
    startDate: '2025-03-20',
    nextBillingDate: '2025-05-20',
    paymentMethod: 'credit_card',
    cardLastFour: '5678',
  },
  {
    id: 'sub_6G7UqE',
    customerName: 'Liam Wilson',
    planName: 'Tier 2',
    status: 'active',
    amount: 100,
    currency: 'NEAR',
    startDate: '2025-04-12',
    nextBillingDate: '2025-06-12',
    paymentMethod: 'credit_card',
    cardLastFour: '9012',
  }
];

export const getSubscriptionStatusColor = (status: Subscription['status']): string => {
  switch (status) {
    case 'active':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'past_due':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'canceled':
      return 'bg-gray-50 text-gray-700 border-gray-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

export const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const getMetricsOverview = () => {
  const totalActive = subscriptions.filter(sub => sub.status === 'active').length;
  const totalPastDue = subscriptions.filter(sub => sub.status === 'past_due').length;
  const totalTrialing = subscriptions.filter(sub => sub.status === 'trialing').length;
  
  const totalRevenue = subscriptions
    .filter(sub => sub.status === 'active' || sub.status === 'trialing')
    .reduce((sum, sub) => sum + sub.amount, 0);
    
  return {
    totalSubscriptions: subscriptions.length,
    activeSubscriptions: totalActive,
    pastDueSubscriptions: totalPastDue,
    trialingSubscriptions: totalTrialing,
    monthlyRecurringRevenue: totalRevenue
  };
};
