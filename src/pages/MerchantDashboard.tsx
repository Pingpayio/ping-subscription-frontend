
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import Dashboard from "@/components/Dashboard";
import { useState } from "react";

const MerchantDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Merchant Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and manage your subscription business
          </p>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-lg font-semibold">Total Revenue</h3>
                <p className="text-3xl font-bold">1,245 NEAR</p>
                <p className="text-sm text-muted-foreground">+12.3% from last month</p>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-lg font-semibold">Active Subscribers</h3>
                <p className="text-3xl font-bold">42</p>
                <p className="text-sm text-muted-foreground">+5 new this month</p>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-lg font-semibold">Churn Rate</h3>
                <p className="text-3xl font-bold">2.1%</p>
                <p className="text-sm text-muted-foreground">-0.5% from last month</p>
              </div>
            </div>
            <Dashboard />
          </TabsContent>
          <TabsContent value="subscriptions">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Active Subscriptions</h2>
              <p className="text-muted-foreground">Manage your customer subscriptions</p>
            </div>
            <Dashboard />
          </TabsContent>
          <TabsContent value="payments">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Payment History</h2>
              <p className="text-muted-foreground">Review all transactions</p>
            </div>
            <div className="rounded-lg border">
              <div className="p-6">
                <p className="text-center text-muted-foreground">No payment history available</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MerchantDashboard;
