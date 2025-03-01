
import { useState } from "react";
import { SubscriptionPlan } from "@/types/subscription";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PricingCard } from "@/components/PricingCard";
import { 
  dailySubscriptionPlans, 
  weeklySubscriptionPlans, 
  subscriptionPlans, 
  yearlySubscriptionPlans 
} from "@/data/mockData";

interface PlanSelectorProps {
  onSelectPlan: (plan: SubscriptionPlan) => void;
}

export function PlanSelector({ onSelectPlan }: PlanSelectorProps) {
  const [intervalType, setIntervalType] = useState<"daily" | "weekly" | "monthly" | "yearly">("monthly");
  
  const handleIntervalChange = (value: string) => {
    setIntervalType(value as "daily" | "weekly" | "monthly" | "yearly");
  };

  return (
    <div className="w-full space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Choose Your Plan</h2>
        <p className="mt-2 text-muted-foreground">
          Select the perfect plan for your needs. Upgrade or downgrade at any time.
        </p>
      </div>
      
      <Tabs
        defaultValue="monthly"
        className="w-full"
        onValueChange={handleIntervalChange}
      >
        <div className="flex justify-center">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">
              Yearly
              <span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                Save 20%
              </span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="daily" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dailySubscriptionPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} onSelectPlan={onSelectPlan} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="weekly" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {weeklySubscriptionPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} onSelectPlan={onSelectPlan} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="monthly" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subscriptionPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} onSelectPlan={onSelectPlan} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="yearly" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {yearlySubscriptionPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} onSelectPlan={onSelectPlan} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted-foreground">
        <p>
          All plans include a 14-day free trial. No credit card required until your trial expires.
          Cancel anytime with no questions asked.
        </p>
      </div>
    </div>
  );
}
