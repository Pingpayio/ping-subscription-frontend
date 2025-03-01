
import { format, parseISO } from "date-fns";
import { CalendarIcon, CreditCard, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserSubscription } from "@/types/subscription";
import { getSubscriptionPlan } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface UserSubscriptionCardProps {
  subscription: UserSubscription;
}

export function UserSubscriptionCard({ subscription }: UserSubscriptionCardProps) {
  const plan = getSubscriptionPlan(subscription.planId);
  
  if (!plan) {
    return null;
  }
  
  const handleCancelSubscription = () => {
    toast.success("Subscription updated. Changes will take effect at the end of your billing period.");
  };
  
  const handleRenewSubscription = () => {
    toast.success("Subscription renewed. Your subscription will continue at the end of your current period.");
  };
  
  const getStatusIndicator = () => {
    switch (subscription.status) {
      case "active":
        return (
          <div className="flex items-center text-green-500">
            <CheckCircle className="mr-1 h-4 w-4" />
            <span className="text-xs font-medium">Active</span>
          </div>
        );
      case "canceled":
        return (
          <div className="flex items-center text-orange-500">
            <AlertCircle className="mr-1 h-4 w-4" />
            <span className="text-xs font-medium">Canceled</span>
          </div>
        );
      case "trial":
        return (
          <div className="flex items-center text-blue-500">
            <Clock className="mr-1 h-4 w-4" />
            <span className="text-xs font-medium">Trial</span>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <Card className="overflow-hidden hover-lift">
      <CardHeader className={cn(
        "p-6",
        subscription.status === "active" ? "bg-primary/5" :
        subscription.status === "canceled" ? "bg-orange-500/5" : 
        subscription.status === "trial" ? "bg-blue-500/5" : "bg-muted"
      )}>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{plan.name} Plan</CardTitle>
            <CardDescription>
              {plan.interval === "monthly" ? "Monthly subscription" : "Annual subscription"}
            </CardDescription>
          </div>
          {getStatusIndicator()}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <CreditCard className="mr-1 h-4 w-4" />
              <span>${plan.price.toFixed(2)}/{plan.interval}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="mr-1 h-4 w-4" />
              <span>
                {subscription.status === "canceled" 
                  ? "Ends on " 
                  : "Renews on "}
                {format(parseISO(subscription.currentPeriodEnd), "MMMM d, yyyy")}
              </span>
            </div>
          </div>
          
          <div className="rounded-md bg-muted p-4">
            <h4 className="mb-2 font-medium">Plan features:</h4>
            <ul className="space-y-1 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-6 pt-0">
        {subscription.status === "active" && !subscription.cancelAtPeriodEnd ? (
          <Button 
            variant="outline" 
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={handleCancelSubscription}
          >
            Cancel Subscription
          </Button>
        ) : subscription.status === "canceled" || subscription.cancelAtPeriodEnd ? (
          <Button 
            variant="outline"
            onClick={handleRenewSubscription}
          >
            Renew Subscription
          </Button>
        ) : null}
        <Button variant="outline">Change Plan</Button>
      </CardFooter>
    </Card>
  );
}
