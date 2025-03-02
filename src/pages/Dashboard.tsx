
import { Navbar } from "@/components/Navbar";
import { DashboardStats } from "@/components/DashboardStats";
import { UserSubscriptionCard } from "@/components/UserSubscriptionCard";
import { PaymentHistoryTable } from "@/components/PaymentHistoryTable";
import { mockUser } from "@/data/mockData";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {mockUser.name}! Here's an overview of your subscription.
          </p>
        </div>
        
        <div className="space-y-8">
          <DashboardStats />
          
          <div className="w-full">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">Your Subscription</h2>
              <p className="text-sm text-muted-foreground">Manage your current subscription plan</p>
            </div>
            <div className="mt-4">
              {mockUser.subscriptions.map((subscription) => (
                <UserSubscriptionCard key={subscription.id} subscription={subscription} />
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">Payment History</h2>
              <p className="text-sm text-muted-foreground">View your recent transactions</p>
            </div>
            <PaymentHistoryTable payments={mockUser.paymentHistory} />
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
