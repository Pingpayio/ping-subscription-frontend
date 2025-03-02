
import { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  subscriptionPlans, 
  dailySubscriptionPlans, 
  weeklySubscriptionPlans, 
  yearlySubscriptionPlans,
  minuteSubscriptionPlans,
  hourlySubscriptionPlans,
  quarterlySubscriptionPlans
} from "@/data/mockData";
import type { SubscriptionPlan } from "@/types/subscription";
import { SubscriptionFrequency } from "@/types/subscription-sdk";

const Subscriptions = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<keyof typeof SubscriptionFrequency>("MONTHLY");
  
  const getPlansForPeriod = (): SubscriptionPlan[] => {
    switch (selectedPeriod) {
      case "MINUTE":
        return minuteSubscriptionPlans;
      case "HOURLY":
        return hourlySubscriptionPlans;
      case "DAILY":
        return dailySubscriptionPlans;
      case "WEEKLY":
        return weeklySubscriptionPlans;
      case "MONTHLY":
        return subscriptionPlans;
      case "QUARTERLY":
        return quarterlySubscriptionPlans;
      case "YEARLY":
        return yearlySubscriptionPlans;
      default:
        return subscriptionPlans;
    }
  };

  const currentPlans = getPlansForPeriod();

  const formatPeriodDisplay = (period: string): string => {
    return period.charAt(0) + period.slice(1).toLowerCase();
  };

  return (
    <div className="flex min-h-screen flex-col">
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

          <div className="flex justify-center mb-8">
            <Tabs 
              defaultValue="MONTHLY" 
              value={selectedPeriod}
              onValueChange={(value) => setSelectedPeriod(value as keyof typeof SubscriptionFrequency)}
              className="w-full max-w-4xl overflow-x-auto"
            >
              <TabsList className="grid grid-cols-7 w-full rounded-xl">
                <TabsTrigger value="MINUTE">{formatPeriodDisplay("MINUTE")}</TabsTrigger>
                <TabsTrigger value="HOURLY">{formatPeriodDisplay("HOURLY")}</TabsTrigger>
                <TabsTrigger value="DAILY">{formatPeriodDisplay("DAILY")}</TabsTrigger>
                <TabsTrigger value="WEEKLY">{formatPeriodDisplay("WEEKLY")}</TabsTrigger>
                <TabsTrigger value="MONTHLY">{formatPeriodDisplay("MONTHLY")}</TabsTrigger>
                <TabsTrigger value="QUARTERLY">{formatPeriodDisplay("QUARTERLY")}</TabsTrigger>
                <TabsTrigger value="YEARLY">{formatPeriodDisplay("YEARLY")}</TabsTrigger>
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
                    <Button 
                      variant="outline" 
                      className="w-full rounded-xl"
                    >
                      Choose Plan
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t bg-background px-4 py-4">
        <div className="mx-auto max-w-7xl text-center"></div>
      </footer>
    </div>
  );
};

export default Subscriptions;
