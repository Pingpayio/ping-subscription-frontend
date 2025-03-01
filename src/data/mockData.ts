
import { 
  SubscriptionPlan, 
  User, 
  PaymentMethod, 
  PaymentHistory, 
  UserSubscription 
} from "@/types/subscription";
import { format, addDays, addWeeks, addMonths, addYears } from "date-fns";

export const dailySubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic-daily",
    name: "Basic",
    description: "Perfect for short-term personal projects",
    price: 0.99,
    interval: "daily",
    features: [
      "1 Project",
      "5GB Storage",
      "Basic Analytics",
      "Email Support"
    ]
  },
  {
    id: "pro-daily",
    name: "Professional",
    description: "Ideal for short-term professional projects",
    price: 1.99,
    interval: "daily",
    features: [
      "5 Projects",
      "20GB Storage",
      "Advanced Analytics",
      "Priority Support",
      "Team Collaboration"
    ],
    isPopular: true
  },
  {
    id: "business-daily",
    name: "Business",
    description: "For short-term organizational needs",
    price: 4.99,
    interval: "daily",
    features: [
      "Unlimited Projects",
      "100GB Storage",
      "Premium Analytics",
      "24/7 Support",
      "Team Collaboration",
      "Custom Integrations",
      "Dedicated Account Manager"
    ]
  }
];

export const weeklySubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic-weekly",
    name: "Basic",
    description: "Perfect for weekly personal projects",
    price: 4.99,
    interval: "weekly",
    features: [
      "1 Project",
      "5GB Storage",
      "Basic Analytics",
      "Email Support"
    ]
  },
  {
    id: "pro-weekly",
    name: "Professional",
    description: "Ideal for weekly professional work",
    price: 9.99,
    interval: "weekly",
    features: [
      "5 Projects",
      "20GB Storage",
      "Advanced Analytics",
      "Priority Support",
      "Team Collaboration"
    ],
    isPopular: true
  },
  {
    id: "business-weekly",
    name: "Business",
    description: "For weekly organizational needs",
    price: 24.99,
    interval: "weekly",
    features: [
      "Unlimited Projects",
      "100GB Storage",
      "Premium Analytics",
      "24/7 Support",
      "Team Collaboration",
      "Custom Integrations",
      "Dedicated Account Manager"
    ]
  }
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for personal projects and individual use",
    price: 9.99,
    interval: "monthly",
    features: [
      "1 Project",
      "5GB Storage",
      "Basic Analytics",
      "Email Support"
    ]
  },
  {
    id: "pro",
    name: "Professional",
    description: "Ideal for professionals and small teams",
    price: 19.99,
    interval: "monthly",
    features: [
      "5 Projects",
      "20GB Storage",
      "Advanced Analytics",
      "Priority Support",
      "Team Collaboration"
    ],
    isPopular: true
  },
  {
    id: "business",
    name: "Business",
    description: "For organizations with advanced needs",
    price: 49.99,
    interval: "monthly",
    features: [
      "Unlimited Projects",
      "100GB Storage",
      "Premium Analytics",
      "24/7 Support",
      "Team Collaboration",
      "Custom Integrations",
      "Dedicated Account Manager"
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
  ...dailySubscriptionPlans, 
  ...weeklySubscriptionPlans, 
  ...subscriptionPlans, 
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
      planId: "pro",
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
      amount: 19.99,
      status: "successful",
      planName: "Professional Plan",
      paymentMethod: "Visa ending in 4242"
    },
    {
      id: "ph-2",
      date: format(addMonths(today, -1), 'yyyy-MM-dd'),
      amount: 19.99,
      status: "successful",
      planName: "Professional Plan",
      paymentMethod: "Visa ending in 4242"
    },
    {
      id: "ph-3",
      date: format(today, 'yyyy-MM-dd'),
      amount: 19.99,
      status: "successful",
      planName: "Professional Plan",
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
