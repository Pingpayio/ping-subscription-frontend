
import Dashboard from "@/components/Dashboard";
import { Navbar } from "@/components/Navbar";

const MerchantDashboard = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Merchant Subscriptions</h1>
          <p className="text-muted-foreground">
            View and manage your subscriptions
          </p>
        </div>
        <Dashboard />
      </main>
    </div>
  );
};

export default MerchantDashboard;
