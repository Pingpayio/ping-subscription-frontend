
import { format, parseISO } from "date-fns";
import { CalendarIcon, CreditCard, CheckCircle, AlertCircle, PauseCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Subscription, 
  SubscriptionStatus, 
  mapFrequencyToDisplay, 
  mapStatusToColor 
} from "@/types/subscription-sdk";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface UserSubscriptionCardProps {
  subscription: Subscription;
}

export function UserSubscriptionCard({ subscription }: UserSubscriptionCardProps) {
  const handlePauseSubscription = async () => {
    // In a real implementation, this would use the SDK
    // try {
    //   const sdk = new SubscriptionSDK();
    //   const result = await sdk.pauseSubscription(subscription.id);
    //   if (result.success) {
    //     toast.success(result.message || "Subscription paused successfully");
    //   } else {
    //     toast.error(result.message || "Failed to pause subscription");
    //   }
    // } catch (error) {
    //   toast.error("An error occurred while pausing the subscription");
    // }
    
    toast.success("Subscription paused. Your subscription will be paused after the current period.");
  };
  
  const handleResumeSubscription = async () => {
    // In a real implementation, this would use the SDK
    // try {
    //   const sdk = new SubscriptionSDK();
    //   const result = await sdk.resumeSubscription(subscription.id);
    //   if (result.success) {
    //     toast.success(result.message || "Subscription resumed successfully");
    //   } else {
    //     toast.error(result.message || "Failed to resume subscription");
    //   }
    // } catch (error) {
    //   toast.error("An error occurred while resuming the subscription");
    // }
    
    toast.success("Subscription resumed. Your subscription will continue at the end of your current period.");
  };
  
  const handleCancelSubscription = async () => {
    // In a real implementation, this would use the SDK
    // try {
    //   const sdk = new SubscriptionSDK();
    //   const result = await sdk.cancelSubscription(subscription.id);
    //   if (result.success) {
    //     toast.success(result.message || "Subscription canceled successfully");
    //   } else {
    //     toast.error(result.message || "Failed to cancel subscription");
    //   }
    // } catch (error) {
    //   toast.error("An error occurred while canceling the subscription");
    // }
    
    toast.success("Subscription canceled. Your subscription will end after the current billing period.");
  };
  
  const getStatusIndicator = () => {
    switch (subscription.status) {
      case SubscriptionStatus.ACTIVE:
        return (
          <div className="flex items-center text-green-500">
            <CheckCircle className="mr-1 h-4 w-4" />
            <span className="text-xs font-medium">Active</span>
          </div>
        );
      case SubscriptionStatus.PAUSED:
        return (
          <div className="flex items-center text-amber-500">
            <PauseCircle className="mr-1 h-4 w-4" />
            <span className="text-xs font-medium">Paused</span>
          </div>
        );
      case SubscriptionStatus.CANCELED:
        return (
          <div className="flex items-center text-muted-foreground">
            <XCircle className="mr-1 h-4 w-4" />
            <span className="text-xs font-medium">Canceled</span>
          </div>
        );
      case SubscriptionStatus.FAILED:
        return (
          <div className="flex items-center text-destructive">
            <AlertCircle className="mr-1 h-4 w-4" />
            <span className="text-xs font-medium">Failed</span>
          </div>
        );
      default:
        return null;
    }
  };
  
  const getBgColorByStatus = (status: SubscriptionStatus): string => {
    switch (status) {
      case SubscriptionStatus.ACTIVE:
        return "bg-primary/5";
      case SubscriptionStatus.PAUSED:
        return "bg-amber-500/5";
      case SubscriptionStatus.CANCELED:
        return "bg-muted/50";
      case SubscriptionStatus.FAILED:
        return "bg-destructive/5";
      default:
        return "bg-muted";
    }
  };
  
  return (
    <Card className="overflow-hidden hover-lift">
      <CardHeader className={cn(
        "p-6",
        getBgColorByStatus(subscription.status)
      )}>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">NEAR Subscription</CardTitle>
            <CardDescription>
              {mapFrequencyToDisplay(subscription.frequency)} subscription
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
              <span>{parseFloat(subscription.amount).toFixed(2)} NEAR/{mapFrequencyToDisplay(subscription.frequency)}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="mr-1 h-4 w-4" />
              <span>
                {subscription.status === SubscriptionStatus.CANCELED 
                  ? "Ends on " 
                  : "Next payment on "}
                {format(parseISO(subscription.nextPaymentDate), "MMMM d, yyyy")}
              </span>
            </div>
          </div>
          
          <div className="rounded-[4px] bg-muted p-4">
            <h4 className="mb-2 font-medium">Subscription details:</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start">
                <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                <span>Created on {format(parseISO(subscription.createdAt), "MMMM d, yyyy")}</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                <span>Payment method: {subscription.paymentMethod}</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                <span>Payments made: {subscription.paymentsMade}{subscription.maxPayments ? ` of ${subscription.maxPayments}` : ''}</span>
              </li>
              {subscription.endDate && (
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                  <span>End date: {format(parseISO(subscription.endDate), "MMMM d, yyyy")}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-6 pt-0">
        {subscription.status === SubscriptionStatus.ACTIVE && (
          <>
            <Button 
              variant="outline" 
              className="text-amber-500 hover:bg-amber-500/10 hover:text-amber-500"
              onClick={handlePauseSubscription}
            >
              Pause Subscription
            </Button>
            <Button 
              variant="outline" 
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={handleCancelSubscription}
            >
              Cancel Subscription
            </Button>
          </>
        )}
        {subscription.status === SubscriptionStatus.PAUSED && (
          <Button 
            variant="outline"
            onClick={handleResumeSubscription}
          >
            Resume Subscription
          </Button>
        )}
        {subscription.status === SubscriptionStatus.CANCELED && (
          <Button variant="outline">View Details</Button>
        )}
      </CardFooter>
    </Card>
  );
}
