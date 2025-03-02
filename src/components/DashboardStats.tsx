
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  CreditCard, 
  CalendarDays, 
  CheckCircle,
  XCircle
} from "lucide-react";
import { mockUser } from "@/data/mockData";
import { getSubscriptionPlan } from "@/data/mockData";

export function DashboardStats() {
  // Find active subscription
  const activeSubscription = mockUser.subscriptions.find(sub => sub.status === 'active');
  const subscriptionPlan = activeSubscription ? getSubscriptionPlan(activeSubscription.planId) : null;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {activeSubscription ? (
        <>
          <Card className="animate-fadeIn hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Subscription
              </CardTitle>
              <CreditCard className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subscriptionPlan?.name || "Unknown"}</div>
              <p className="text-xs text-muted-foreground">
                ${subscriptionPlan?.price || 0}/{subscriptionPlan?.interval}
              </p>
            </CardContent>
          </Card>
          
          <Card className="animate-fadeIn hover-lift animation-delay-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Next Payment
              </CardTitle>
              <CalendarDays className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeSubscription.currentPeriodEnd}</div>
              <p className="text-xs text-muted-foreground">
                {activeSubscription.cancelAtPeriodEnd ? "Cancels after this period" : "Auto-renewal enabled"}
              </p>
            </CardContent>
          </Card>
          
          <Card className="animate-fadeIn hover-lift animation-delay-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Status
              </CardTitle>
              <CheckCircle className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Active</div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="animate-fadeIn hover-lift col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Subscription Status
            </CardTitle>
            <XCircle className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">No Active Subscription</div>
            <p className="text-xs text-muted-foreground mt-1">
              Subscribe to a plan to get started with our services
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
