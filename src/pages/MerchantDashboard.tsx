
import Dashboard from "@/components/Dashboard";
import { Navbar } from "@/components/Navbar";

const MerchantDashboard = () => {
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

        <div className="space-y-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Overview</h2>
            <p className="text-muted-foreground">Your business at a glance</p>
          </div>
          <Dashboard />
        </div>
      </main>
    </div>
  );
};

export default MerchantDashboard;
