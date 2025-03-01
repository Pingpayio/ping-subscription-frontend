
import { Navbar } from "@/components/Navbar";
import { UserSubscriptionCard } from "@/components/UserSubscriptionCard";
import { PlanSelector } from "@/components/PlanSelector";
import { mockUser } from "@/data/mockData";
import { SubscriptionPlan } from "@/types/subscription";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentHistoryTable } from "@/components/PaymentHistoryTable";

const Subscriptions = () => {
  const handleSelectPlan = (plan: SubscriptionPlan) => {
    toast.success("Plan selection saved. You will be redirected to checkout.");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
          <p className="text-muted-foreground">
            Manage your subscription plans and billing preferences.
          </p>
        </div>
        
        <Tabs defaultValue="current" className="space-y-8">
          <TabsList>
            <TabsTrigger value="current">Current Plan</TabsTrigger>
            <TabsTrigger value="upgrade">Upgrade Plan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">Current Subscription</h2>
                <p className="text-sm text-muted-foreground">
                  Your active subscription plan and details
                </p>
              </div>
              
              {mockUser.subscriptions.map((subscription) => (
                <UserSubscriptionCard key={subscription.id} subscription={subscription} />
              ))}
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">Billing History</h2>
                <p className="text-sm text-muted-foreground">Recent payments and upcoming bills</p>
              </div>
              
              <PaymentHistoryTable payments={mockUser.paymentHistory} />
            </div>
          </TabsContent>
          
          <TabsContent value="upgrade" className="space-y-8">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">Upgrade Your Plan</h2>
              <p className="text-sm text-muted-foreground">
                Choose a new plan to upgrade your subscription
              </p>
            </div>
            
            <PlanSelector onSelectPlan={handleSelectPlan} />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2023 Subscription Haven. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Need help? <a href="#" className="underline">Contact support</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Subscriptions;
