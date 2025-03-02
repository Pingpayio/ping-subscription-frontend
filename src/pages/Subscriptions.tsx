
import { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  subscriptionPlans, 
  dailySubscriptionPlans, 
  weeklySubscriptionPlans, 
  yearlySubscriptionPlans 
} from "@/data/mockData";
import type { SubscriptionPlan } from "@/types/subscription";

const Subscriptions = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<"daily" | "weekly" | "monthly" | "yearly">("monthly");
  
  // Get the appropriate plans based on the selected period
  const getPlansForPeriod = (): SubscriptionPlan[] => {
    switch (selectedPeriod) {
      case "daily":
        return dailySubscriptionPlans;
      case "weekly":
        return weeklySubscriptionPlans;
      case "monthly":
        return subscriptionPlans;
      case "yearly":
        return yearlySubscriptionPlans;
      default:
        return subscriptionPlans;
    }
  };

  const currentPlans = getPlansForPeriod();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-background px-4 py-6 md:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <img 
                src="/lovable-uploads/6d47a643-2439-46b1-a4d9-a4d81a096357.png" 
                alt="Logo" 
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Subscription Plans Section */}
      <section className="flex-1 bg-muted/50 px-4 py-12">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Choose your subscription tier
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground">
              Select from our simple tiered plans designed to fit your needs.
            </p>
          </div>

          {/* Billing Period Selector */}
          <div className="flex justify-center mb-8">
            <Tabs 
              defaultValue="monthly" 
              value={selectedPeriod}
              onValueChange={(value) => setSelectedPeriod(value as "daily" | "weekly" | "monthly" | "yearly")}
              className="w-full max-w-md"
            >
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">
                  Yearly
                  <span className="ml-1.5 text-xs rounded-full bg-primary/10 px-2 py-0.5">Save 20%</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {currentPlans.map((plan, i) => (
              <div 
                key={plan.id} 
                className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{plan.price} NEAR</span>
                    <span className="ml-1 text-muted-foreground">/{plan.interval}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={`/checkout?plan=${plan.id}`} className="block w-full">
                    <Button variant={i === 1 ? "default" : "outline"} className="w-full">
                      {i === 1 ? "Get Started" : "Choose Plan"}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Empty Footer */}
      <footer className="border-t bg-background px-4 py-4">
        <div className="mx-auto max-w-7xl text-center"></div>
      </footer>
    </div>
  );
};

export default Subscriptions;
