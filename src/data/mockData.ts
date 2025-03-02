
import { 
  SubscriptionPlan, 
  User, 
  PaymentMethod, 
  PaymentHistory, 
  UserSubscription 
} from "@/types/subscription";
import { format, addDays, addWeeks, addMonths, addYears } from "date-fns";

export const minuteSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "tier1-minute",
    name: "Tier 1",
    description: "Basic tier subscription",
    price: 0.1,
    interval: "minute",
    features: [
      "Basic Features",
      "Limited Storage",
      "Email Support"
    ]
  },
  {
    id: "tier2-minute",
    name: "Tier 2",
    description: "Standard tier subscription",
    price: 0.2,
    interval: "minute",
    features: [
      "Standard Features",
      "More Storage",
      "Priority Support"
    ],
    isPopular: true
  },
  {
    id: "tier3-minute",
    name: "Tier 3",
    description: "Premium tier subscription",
    price: 0.5,
    interval: "minute",
    features: [
      "Premium Features",
      "Maximum Storage",
      "24/7 Support"
    ]
  }
];

export const hourlySubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "tier1-hourly",
    name: "Tier 1",
    description: "Basic tier subscription",
    price: 1,
    interval: "hourly",
    features: [
      "Basic Features",
      "Limited Storage",
      "Email Support"
    ]
  },
  {
    id: "tier2-hourly",
    name: "Tier 2",
    description: "Standard tier subscription",
    price: 2,
    interval: "hourly",
    features: [
      "Standard Features",
      "More Storage",
      "Priority Support"
    ],
    isPopular: true
  },
  {
    id: "tier3-hourly",
    name: "Tier 3",
    description: "Premium tier subscription",
    price: 5,
    interval: "hourly",
    features: [
      "Premium Features",
      "Maximum Storage",
      "24/7 Support"
    ]
  }
];

export const dailySubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "tier1-daily",
    name: "Tier 1",
    description: "Basic tier subscription",
    price: 5,
    interval: "daily",
    features: [
      "Basic Features",
      "Limited Storage",
      "Email Support"
    ]
  },
  {
    id: "tier2-daily",
    name: "Tier 2",
    description: "Standard tier subscription",
    price: 10,
    interval: "daily",
    features: [
      "Standard Features",
      "More Storage",
      "Priority Support"
    ],
    isPopular: true
  },
  {
    id: "tier3-daily",
    name: "Tier 3",
    description: "Premium tier subscription",
    price: 20,
    interval: "daily",
    features: [
      "Premium Features",
      "Maximum Storage",
      "24/7 Support"
    ]
  }
];

export const weeklySubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "tier1-weekly",
    name: "Tier 1",
    description: "Basic tier subscription",
    price: 25,
    interval: "weekly",
    features: [
      "Basic Features",
      "Limited Storage",
      "Email Support"
    ]
  },
  {
    id: "tier2-weekly",
    name: "Tier 2",
    description: "Standard tier subscription",
    price: 50,
    interval: "weekly",
    features: [
      "Standard Features",
      "More Storage",
      "Priority Support"
    ],
    isPopular: true
  },
  {
    id: "tier3-weekly",
    name: "Tier 3",
    description: "Premium tier subscription",
    price: 100,
    interval: "weekly",
    features: [
      "Premium Features",
      "Maximum Storage",
      "24/7 Support"
    ]
  }
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "tier1",
    name: "Tier 1",
    description: "Basic tier subscription",
    price: 50,
    interval: "monthly",
    features: [
      "Basic Features",
      "Limited Storage",
      "Email Support"
    ]
  },
  {
    id: "tier2",
    name: "Tier 2",
    description: "Standard tier subscription",
    price: 100,
    interval: "monthly",
    features: [
      "Standard Features",
      "More Storage",
      "Priority Support"
    ],
    isPopular: true
  },
  {
    id: "tier3",
    name: "Tier 3",
    description: "Premium tier subscription",
    price: 300,
    interval: "monthly",
    features: [
      "Premium Features",
      "Maximum Storage",
      "24/7 Support"
    ]
  }
];

export const quarterlySubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "tier1-quarterly",
    name: "Tier 1",
    description: "Basic tier subscription",
    price: 135,
    interval: "quarterly",
    features: [
      "Basic Features",
      "Limited Storage",
      "Email Support"
    ]
  },
  {
    id: "tier2-quarterly",
    name: "Tier 2",
    description: "Standard tier subscription",
    price: 270,
    interval: "quarterly",
    features: [
      "Standard Features", 
      "More Storage",
      "Priority Support"
    ],
    isPopular: true
  },
  {
    id: "tier3-quarterly",
    name: "Tier 3",
    description: "Premium tier subscription",
    price: 810,
    interval: "quarterly",
    features: [
      "Premium Features",
      "Maximum Storage",
      "24/7 Support"
    ]
  }
];

export const yearlySubscriptionPlans: SubscriptionPlan[] = subscriptionPlans.map(plan => ({
  ...plan,
  id: `${plan.id}-yearly`,
  interval: "yearly",
  price: Math.round(plan.price * 10 * 12) / 10 * 0.8, // 20% discount for yearly
}));

export const allPlans = [
  ...minuteSubscriptionPlans,
  ...hourlySubscriptionPlans,
  ...dailySubscriptionPlans, 
  ...weeklySubscriptionPlans, 
  ...subscriptionPlans,
  ...quarterlySubscriptionPlans,
  ...yearlySubscriptionPlans
];

const today = new Date();

export const mockUser: User = {
  id: "user-1",
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  subscriptions: [
    {
      id: "sub-1",
      planId: "tier2",
      status: "active",
      currentPeriodEnd: format(addMonths(today, 1), 'yyyy-MM-dd'),
      cancelAtPeriodEnd: false,
      startDate: format(addMonths(today, -2), 'yyyy-MM-dd')
    }
  ],
  paymentMethods: [
    {
      id: "pm-1",
      type: "card",
      details: "Visa ending in 4242",
      isDefault: true,
      expiryDate: "12/24",
      lastFour: "4242"
    },
    {
      id: "pm-2",
      type: "paypal",
      details: "alex.morgan@example.com",
      isDefault: false
    }
  ],
  paymentHistory: [
    {
      id: "ph-1",
      date: format(addMonths(today, -2), 'yyyy-MM-dd'),
      amount: 100,
      status: "successful",
      planName: "Tier 2",
      paymentMethod: "Visa ending in 4242"
    },
    {
      id: "ph-2",
      date: format(addMonths(today, -1), 'yyyy-MM-dd'),
      amount: 100,
      status: "successful",
      planName: "Tier 2",
      paymentMethod: "Visa ending in 4242"
    },
    {
      id: "ph-3",
      date: format(today, 'yyyy-MM-dd'),
      amount: 100,
      status: "successful",
      planName: "Tier 2",
      paymentMethod: "Visa ending in 4242"
    }
  ]
};

export function getSubscriptionPlan(planId: string): SubscriptionPlan | undefined {
  return allPlans.find(plan => plan.id === planId);
}

export function getNextBillingDate(interval: 'daily' | 'weekly' | 'monthly' | 'yearly', startDate: Date = new Date()): string {
  switch (interval) {
    case 'daily':
      return format(addDays(startDate, 1), 'MMMM d, yyyy');
    case 'weekly':
      return format(addWeeks(startDate, 1), 'MMMM d, yyyy');
    case 'monthly':
      return format(addMonths(startDate, 1), 'MMMM d, yyyy');
    case 'yearly':
      return format(addYears(startDate, 1), 'MMMM d, yyyy');
    default:
      return format(addMonths(startDate, 1), 'MMMM d, yyyy');
  }
}
