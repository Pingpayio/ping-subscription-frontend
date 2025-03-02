
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
  XCircle,
  PauseCircle,
  AlertCircle
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { 
  Subscription, 
  SubscriptionStatus, 
  SubscriptionFrequency, 
  mapFrequencyToDisplay, 
  mapStatusToColor
} from "@/types/subscription-sdk";

interface DashboardStatsProps {
  subscription?: Subscription;
}

export function DashboardStats({ subscription }: DashboardStatsProps) {
  // Function to render the appropriate status icon
  const renderStatusIcon = (status?: SubscriptionStatus) => {
    if (!status) return <XCircle className="h-6 w-6 text-muted-foreground" />;
    
    switch (status) {
      case SubscriptionStatus.ACTIVE:
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case SubscriptionStatus.PAUSED:
        return <PauseCircle className="h-6 w-6 text-amber-500" />;
      case SubscriptionStatus.CANCELED:
        return <XCircle className="h-6 w-6 text-muted-foreground" />;
      case SubscriptionStatus.FAILED:
        return <AlertCircle className="h-6 w-6 text-destructive" />;
      default:
        return <XCircle className="h-6 w-6 text-muted-foreground" />;
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {subscription ? (
        <>
          <Card className="animate-fadeIn hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Subscription
              </CardTitle>
              <CreditCard className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {parseFloat(subscription.amount).toFixed(2)} NEAR
              </div>
              <p className="text-xs text-muted-foreground">
                Per {mapFrequencyToDisplay(subscription.frequency)}
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
              <div className="text-2xl font-bold">
                {format(parseISO(subscription.nextPaymentDate), 'MMM d, yyyy')}
              </div>
              <p className="text-xs text-muted-foreground">
                {subscription.maxPayments ? 
                  `${subscription.paymentsMade} of ${subscription.maxPayments} payments made` : 
                  `${subscription.paymentsMade} payments made so far`}
              </p>
            </CardContent>
          </Card>
          
          <Card className="animate-fadeIn hover-lift animation-delay-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Status
              </CardTitle>
              {renderStatusIcon(subscription.status)}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${mapStatusToColor(subscription.status)}`}>
                {subscription.status}
              </div>
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
