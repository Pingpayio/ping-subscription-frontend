
/**
 * Subscription status enum
 */
export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  CANCELED = "CANCELED",
  FAILED = "FAILED"
}

/**
 * Subscription frequency enum
 */
export enum SubscriptionFrequency {
  MINUTE = "MINUTE",
  HOURLY = "HOURLY",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  YEARLY = "YEARLY"
}

/**
 * Payment method enum
 */
export enum PaymentMethod {
  NEAR = "NEAR"
}

/**
 * Subscription interface
 */
export interface Subscription {
  id: string;
  userId: string;
  merchantId: string;
  amount: string;
  frequency: SubscriptionFrequency;
  nextPaymentDate: string; // ISO date string
  status: SubscriptionStatus;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  paymentMethod: PaymentMethod;
  maxPayments?: number;
  paymentsMade: number;
  endDate?: string; // ISO date string
  tokenAddress?: string;
}

/**
 * Worker status interface
 */
export interface WorkerStatus {
  accountId?: string;
  registered?: boolean;
  verified?: boolean;
}

/**
 * Merchant interface
 */
export interface Merchant {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  active: boolean;
}

/**
 * Payment result interface
 */
export interface PaymentResult {
  success: boolean;
  error?: string;
  transactionHash?: string;
  amount?: string;
  timestamp?: string; // ISO date string
}

/**
 * Monitoring status interface
 */
export interface MonitoringStatus {
  isMonitoring: boolean;
  processingQueue?: {
    id: string;
    status: "PROCESSING" | "RETRYING";
    retryCount: number;
  }[];
}

export interface CreateSubscriptionParams {
  merchantId: string;
  amount: string;
  frequency: number;
  maxPayments?: number;
  tokenAddress?: string;
}

export interface SubscriptionSDK {
  getWorkerAddress(): Promise<string>;
  isWorkerVerified(): Promise<boolean>;
  getWorkerAccount(): Promise<WorkerStatus>;
  registerWorker(): Promise<boolean>;
  getMerchants(): Promise<{ merchants: Merchant[] }>;
  createSubscription(params: CreateSubscriptionParams): Promise<{ success: boolean; subscriptionId: string }>;
  getSubscription(subscriptionId: string): Promise<{ subscription: Subscription }>;
  getUserSubscriptions(accountId: string): Promise<{ subscriptions: Subscription[] }>;
  pauseSubscription(subscriptionId: string): Promise<{ success: boolean; message: string }>;
  resumeSubscription(subscriptionId: string): Promise<{ success: boolean; message: string }>;
  cancelSubscription(subscriptionId: string): Promise<{ success: boolean; message: string }>;
  startMonitoring(interval?: number): Promise<{ success: boolean; message: string; isMonitoring: boolean }>;
  stopMonitoring(): Promise<{ success: boolean; message: string; isMonitoring: boolean }>;
  getMonitoringStatus(): Promise<MonitoringStatus>;
}

// Helper functions for SDK integration
export const mapFrequencyToDisplay = (frequency: SubscriptionFrequency): string => {
  switch (frequency) {
    case SubscriptionFrequency.MINUTE: return "minute";
    case SubscriptionFrequency.HOURLY: return "hour";
    case SubscriptionFrequency.DAILY: return "day";
    case SubscriptionFrequency.WEEKLY: return "week";
    case SubscriptionFrequency.MONTHLY: return "month";
    case SubscriptionFrequency.QUARTERLY: return "quarter";
    case SubscriptionFrequency.YEARLY: return "year";
    default: return "month";
  }
};

export const mapStatusToIcon = (status: SubscriptionStatus) => {
  switch (status) {
    case SubscriptionStatus.ACTIVE:
      return "CheckCircle";
    case SubscriptionStatus.PAUSED:
      return "Pause";
    case SubscriptionStatus.CANCELED:
      return "XCircle";
    case SubscriptionStatus.FAILED:
      return "AlertCircle";
    default:
      return "HelpCircle";
  }
};

export const mapStatusToColor = (status: SubscriptionStatus): string => {
  switch (status) {
    case SubscriptionStatus.ACTIVE:
      return "text-green-500";
    case SubscriptionStatus.PAUSED:
      return "text-amber-500";
    case SubscriptionStatus.CANCELED:
      return "text-muted-foreground";
    case SubscriptionStatus.FAILED:
      return "text-destructive";
    default:
      return "text-muted-foreground";
  }
};
