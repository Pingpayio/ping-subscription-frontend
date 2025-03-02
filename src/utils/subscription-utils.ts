
import { SubscriptionFrequency, SubscriptionStatus } from "@/types/subscription-sdk";

// Convert frequency to milliseconds for calculations
export const frequencyToMilliseconds = (frequency: SubscriptionFrequency): number => {
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day; // Approximation
  const quarter = 3 * month;
  const year = 365 * day;

  switch (frequency) {
    case SubscriptionFrequency.MINUTE:
      return minute;
    case SubscriptionFrequency.HOURLY:
      return hour;
    case SubscriptionFrequency.DAILY:
      return day;
    case SubscriptionFrequency.WEEKLY:
      return week;
    case SubscriptionFrequency.MONTHLY:
      return month;
    case SubscriptionFrequency.QUARTERLY:
      return quarter;
    case SubscriptionFrequency.YEARLY:
      return year;
    default:
      return month;
  }
};

// Calculate total cost of a subscription with maxPayments
export const calculateTotalCost = (amount: string, maxPayments?: number): string => {
  if (!maxPayments) return "Recurring";
  
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount)) return "Invalid amount";
  
  return (numAmount * maxPayments).toFixed(2);
};

// Check if a subscription is active
export const isActiveSubscription = (status: SubscriptionStatus): boolean => {
  return status === SubscriptionStatus.ACTIVE;
};

// Generate human-readable status message
export const getStatusMessage = (status: SubscriptionStatus): string => {
  switch (status) {
    case SubscriptionStatus.ACTIVE:
      return "Your subscription is active and payments will be processed according to the schedule.";
    case SubscriptionStatus.PAUSED:
      return "Your subscription is paused. No payments will be processed until you resume it.";
    case SubscriptionStatus.CANCELED:
      return "Your subscription has been canceled. No further payments will be processed.";
    case SubscriptionStatus.FAILED:
      return "Your subscription has failed. Please check your payment method and try again.";
    default:
      return "Unknown subscription status.";
  }
};

// Missing functions that should be added to the SDK:
// 1. updateSubscription - to modify existing subscription parameters
// 2. getPaymentHistory - to retrieve payment history for a subscription
// 3. verifyPayment - to verify if a payment was processed correctly
// 4. getSubscriptionMetrics - to get metrics about subscription usage
// 5. createOneTimePayment - for users who want to make a one-time payment instead of subscription
