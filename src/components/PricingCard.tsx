
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SubscriptionPlan } from "@/types/subscription";

interface PricingCardProps {
  plan: SubscriptionPlan;
  onSelectPlan: (plan: SubscriptionPlan) => void;
}

export function PricingCard({ plan, onSelectPlan }: PricingCardProps) {
  return (
    <Card className={cn(
      "w-full max-w-sm border border-border transition-all duration-300 hover-lift",
      plan.isPopular ? "border-primary/50 shadow-lg" : "border-border"
    )}>
      <CardHeader className="p-6">
        <div className="space-y-2">
          {plan.isPopular && (
            <Badge variant="outline" className="absolute right-4 top-4 bg-primary/10 text-primary">
              Popular Choice
            </Badge>
          )}
          <h3 className="text-2xl font-bold leading-none tracking-tight">{plan.name}</h3>
          <p className="text-sm text-muted-foreground">{plan.description}</p>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="flex items-baseline text-3xl font-bold">
          ${plan.price}
          <span className="ml-1 text-sm font-medium text-muted-foreground">
            /{plan.interval}
          </span>
        </div>
        <ul className="mt-6 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={() => onSelectPlan(plan)} 
          className={cn(
            "w-full transition-all",
            plan.isPopular 
              ? "bg-primary text-primary-foreground hover:bg-primary/90" 
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          {plan.isPopular ? "Get Started" : "Choose Plan"}
        </Button>
      </CardFooter>
    </Card>
  );
}
