
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { DashboardStats } from "@/components/DashboardStats";
import { UserSubscriptionCard } from "@/components/UserSubscriptionCard";
import { PaymentHistoryTable } from "@/components/PaymentHistoryTable";
import { Subscription, SubscriptionFrequency, SubscriptionStatus, PaymentMethod } from "@/types/subscription-sdk";
import { PaymentHistory } from "@/types/subscription";
import { Button } from "@/components/ui/button";

// Mock data would eventually be replaced by real API calls to fetch user's subscription
const mockSubscription: Subscription | undefined = {
  id: "sub-1",
  userId: "user-123",
  merchantId: "merchant-456",
  amount: "19.99",
  frequency: SubscriptionFrequency.MONTHLY,
  nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  status: SubscriptionStatus.ACTIVE,
  createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
  paymentMethod: PaymentMethod.NEAR,
  paymentsMade: 2,
  maxPayments: 12,
  name: "John Doe", // Subscriber name
};

const mockPaymentHistory: PaymentHistory[] = [
  {
    id: "ph-1",
    date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    amount: "19.99",
    status: "successful", // Explicitly typed as 'successful'
    planName: "Monthly Subscription",
    paymentMethod: "NEAR"
  },
  {
    id: "ph-2",
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    amount: "19.99",
    status: "successful", // Explicitly typed as 'successful'
    planName: "Monthly Subscription",
    paymentMethod: "NEAR"
  },
];

const Dashboard = () => {
  // In a real app, we would fetch the subscription data from an API
  const [subscription, setSubscription] = useState<Subscription | undefined>(mockSubscription);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const NoSubscriptionView = () => (
    <div className="text-center py-12 bg-card rounded-lg border shadow-sm px-6">
      <h3 className="text-xl font-semibold mb-3">No Active Subscription</h3>
      <p className="text-muted-foreground mb-6">
        You currently don't have any active subscriptions. 
        Explore our subscription plans to get started with our services.
      </p>
      <Link to="/subscriptions">
        <Button className="rounded-xl">
          View Subscription Options
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            {subscription?.name 
              ? `Welcome back, ${subscription.name}! Here's an overview of your subscription.`
              : 'Welcome back! Here\'s an overview of your account.'}
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
                <NoSubscriptionView />
              )}
            </div>
          </div>
          
          {subscription && (
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
          )}
        </div>
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground"></p>
          <p className="text-sm text-muted-foreground"></p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
