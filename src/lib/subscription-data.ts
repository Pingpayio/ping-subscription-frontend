
export type Subscription = {
  id: string;
  customerName: string;
  planName: string;
  status: 'active' | 'trialing' | 'past_due' | 'canceled';
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
    planName: 'Premium Plan',
    status: 'active',
    amount: 49.99,
    currency: 'USD',
    startDate: '2023-02-15',
    nextBillingDate: '2023-06-15',
    paymentMethod: 'credit_card',
    cardLastFour: '4242',
  },
  {
    id: 'sub_2M3YuJ',
    customerName: 'Michael Chen',
    planName: 'Business Plan',
    status: 'active',
    amount: 99.99,
    currency: 'USD',
    startDate: '2023-01-10',
    nextBillingDate: '2023-06-10',
    paymentMethod: 'credit_card',
    cardLastFour: '1234',
  },
  {
    id: 'sub_3K4XtH',
    customerName: 'Emma Rodriguez',
    planName: 'Basic Plan',
    status: 'trialing',
    amount: 19.99,
    currency: 'USD',
    startDate: '2023-05-30',
    nextBillingDate: '2023-06-30',
    paymentMethod: 'paypal',
  },
  {
    id: 'sub_4J5WsG',
    customerName: 'David Kim',
    planName: 'Enterprise Plan',
    status: 'active',
    amount: 299.99,
    currency: 'USD',
    startDate: '2022-11-05',
    nextBillingDate: '2023-06-05',
    paymentMethod: 'bank_transfer',
  },
  {
    id: 'sub_5H6VrF',
    customerName: 'Olivia Thompson',
    planName: 'Premium Plan',
    status: 'past_due',
    amount: 49.99,
    currency: 'USD',
    startDate: '2023-03-20',
    nextBillingDate: '2023-05-20',
    paymentMethod: 'credit_card',
    cardLastFour: '5678',
  },
  {
    id: 'sub_6G7UqE',
    customerName: 'Liam Wilson',
    planName: 'Business Plan',
    status: 'active',
    amount: 99.99,
    currency: 'USD',
    startDate: '2023-04-12',
    nextBillingDate: '2023-06-12',
    paymentMethod: 'credit_card',
    cardLastFour: '9012',
  }
];

export const getSubscriptionStatusColor = (status: Subscription['status']): string => {
  switch (status) {
    case 'active':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'trialing':
      return 'bg-blue-50 text-blue-700 border-blue-200';
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
