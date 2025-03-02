
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { DashboardStats } from "@/components/DashboardStats";
import { UserSubscriptionCard } from "@/components/UserSubscriptionCard";
import { PaymentHistoryTable } from "@/components/PaymentHistoryTable";
import { Subscription } from "@/types/subscription-sdk";

// This would be replaced with actual SDK initialization
const mockSubscription: Subscription = {
  id: "sub-1",
  userId: "user-123",
  merchantId: "merchant-456",
  amount: "19.99",
  frequency: "MONTHLY" as any,
  nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  status: "ACTIVE" as any,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  paymentMethod: "NEAR" as any,
  paymentsMade: 2,
  maxPayments: 12,
};

// Mock payment history data structure that would come from the SDK
const mockPaymentHistory = [
  {
    id: "ph-1",
    date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    amount: "19.99",
    status: "successful",
    planName: "Monthly Subscription",
    paymentMethod: "NEAR"
  },
  {
    id: "ph-2",
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    amount: "19.99",
    status: "successful",
    planName: "Monthly Subscription",
    paymentMethod: "NEAR"
  },
];

const Dashboard = () => {
  const [subscription, setSubscription] = useState<Subscription | undefined>(mockSubscription);
  const [isLoading, setIsLoading] = useState(true);

  // Simulating SDK data fetching
  useEffect(() => {
    // In a real implementation, this would use the SDK to fetch user data
    // const fetchData = async () => {
    //   try {
    //     const sdk = new SubscriptionSDK();
    //     const accountId = await sdk.getWorkerAddress();
    //     const { subscriptions } = await sdk.getUserSubscriptions(accountId);
    //     if (subscriptions && subscriptions.length > 0) {
    //       setSubscription(subscriptions[0]);
    //     }
    //   } catch (error) {
    //     console.error("Failed to fetch subscription data:", error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    
    // fetchData();
    
    // Simulating API call with timeout
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your subscription.
          </p>
        </div>
        
        <div className="space-y-8">
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 animate-pulse bg-muted rounded-[4px]"></div>
              ))}
            </div>
          ) : (
            <DashboardStats subscription={subscription} />
          )}
          
          <div className="w-full">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">Your Subscription</h2>
              <p className="text-sm text-muted-foreground">Manage your current subscription plan</p>
            </div>
            <div className="mt-4">
              {isLoading ? (
                <div className="h-64 animate-pulse bg-muted rounded-[4px]"></div>
              ) : subscription ? (
                <UserSubscriptionCard subscription={subscription} />
              ) : (
                <div className="text-center py-12 border rounded-[4px] bg-card">
                  <p className="text-muted-foreground">No active subscriptions found.</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">Payment History</h2>
              <p className="text-sm text-muted-foreground">View your recent transactions</p>
            </div>
            {isLoading ? (
              <div className="h-64 animate-pulse bg-muted rounded-[4px]"></div>
            ) : (
              <PaymentHistoryTable payments={mockPaymentHistory} />
            )}
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2023 Subscription Haven. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Version 1.0.0
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
