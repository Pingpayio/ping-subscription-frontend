
import { 
  CreateSubscriptionParams,
  SubscriptionSDK,
  Subscription,
  WorkerStatus,
  Merchant,
  MonitoringStatus,
  SubscriptionStatus,
  SubscriptionFrequency,
  PaymentMethod
} from "@/types/subscription-sdk";

// This is a mock implementation for demo purposes
// In a real app, this would interact with an actual SDK
export class MockSubscriptionSDK implements SubscriptionSDK {
  private _isMonitoring: boolean = false;
  
  async getWorkerAddress(): Promise<string> {
    return "demo.near";
  }
  
  async isWorkerVerified(): Promise<boolean> {
    return true;
  }
  
  async getWorkerAccount(): Promise<WorkerStatus> {
    return {
      accountId: "demo.near",
      registered: true,
      verified: true
    };
  }
  
  async registerWorker(): Promise<boolean> {
    return true;
  }
  
  async getMerchants(): Promise<{ merchants: Merchant[] }> {
    return {
      merchants: [
        {
          id: "merchant-1",
          name: "Demo Merchant",
          ownerId: "owner.near",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          active: true
        }
      ]
    };
  }
  
  async createSubscription(params: CreateSubscriptionParams): Promise<{ success: boolean; subscriptionId: string }> {
    return {
      success: true,
      subscriptionId: "sub-" + Math.random().toString(36).substring(2, 9)
    };
  }
  
  async getSubscription(subscriptionId: string): Promise<{ subscription: Subscription }> {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    return {
      subscription: {
        id: subscriptionId,
        userId: "user-123",
        merchantId: "merchant-1",
        amount: "19.99",
        frequency: SubscriptionFrequency.MONTHLY,
        nextPaymentDate: nextMonth.toISOString(),
        status: SubscriptionStatus.ACTIVE,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        paymentMethod: PaymentMethod.NEAR,
        paymentsMade: 1,
        maxPayments: 12
      }
    };
  }
  
  async getUserSubscriptions(accountId: string): Promise<{ subscriptions: Subscription[] }> {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    return {
      subscriptions: [
        {
          id: "sub-" + Math.random().toString(36).substring(2, 9),
          userId: accountId,
          merchantId: "merchant-1",
          amount: "19.99",
          frequency: SubscriptionFrequency.MONTHLY,
          nextPaymentDate: nextMonth.toISOString(),
          status: SubscriptionStatus.ACTIVE,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          paymentMethod: PaymentMethod.NEAR,
          paymentsMade: 1,
          maxPayments: 12
        }
      ]
    };
  }
  
  async pauseSubscription(subscriptionId: string): Promise<{ success: boolean; message: string }> {
    return {
      success: true,
      message: "Subscription paused successfully"
    };
  }
  
  async resumeSubscription(subscriptionId: string): Promise<{ success: boolean; message: string }> {
    return {
      success: true,
      message: "Subscription resumed successfully"
    };
  }
  
  async cancelSubscription(subscriptionId: string): Promise<{ success: boolean; message: string }> {
    return {
      success: true,
      message: "Subscription canceled successfully"
    };
  }
  
  async startMonitoring(interval?: number): Promise<{ success: boolean; message: string; isMonitoring: boolean }> {
    this._isMonitoring = true;
    return {
      success: true,
      message: "Monitoring started successfully",
      isMonitoring: true
    };
  }
  
  async stopMonitoring(): Promise<{ success: boolean; message: string; isMonitoring: boolean }> {
    this._isMonitoring = false;
    return {
      success: true,
      message: "Monitoring stopped successfully",
      isMonitoring: false
    };
  }
  
  async getMonitoringStatus(): Promise<MonitoringStatus> {
    return {
      isMonitoring: this._isMonitoring
    };
  }
}

// Create a singleton instance of the SDK to use throughout the app
export const subscriptionSDK = new MockSubscriptionSDK();
