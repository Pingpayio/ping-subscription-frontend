
import { useState } from "react";
import { Subscription, getSubscriptionStatusColor, formatCurrency } from "@/lib/subscription-data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CreditCard, Calendar, DollarSign } from "lucide-react";
import { format } from "date-fns";

interface SubscriptionCardProps {
  subscription: Subscription;
}

const SubscriptionCard = ({ subscription }: SubscriptionCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const statusClasses = getSubscriptionStatusColor(subscription.status);
  
  const formattedStartDate = format(new Date(subscription.startDate), 'MMM d, yyyy');
  const formattedNextBillingDate = format(new Date(subscription.nextBillingDate), 'MMM d, yyyy');
  
  const isCryptoPayment = subscription.paymentMethod === 'crypto' || subscription.paymentMethod === 'bank_transfer';
  
  return (
    <Card 
      className={`border-border bg-card shadow-sm transition-all duration-300 ${isHovered ? 'shadow-md shadow-purple/10 transform scale-[1.01]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-base text-card-foreground mb-1">{subscription.customerName}</h3>
              <div className="flex items-center">
                <span 
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusClasses}`}
                >
                  {subscription.status.replace('_', ' ')}
                </span>
                <span className="ml-2 text-sm text-muted-foreground">{subscription.planName}</span>
              </div>
            </div>
            <div className="text-lg font-bold text-card-foreground">
              {formatCurrency(subscription.amount, subscription.currency)}
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Started on {formattedStartDate}</span>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Next billing on {formattedNextBillingDate}</span>
            </div>
            
            <div className="flex items-center">
              {isCryptoPayment ? (
                <>
                  <DollarSign className="h-4 w-4 mr-2 text-purple" />
                  <span className="text-purple font-medium">Crypto Payment</span>
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Card Payment {subscription.cardLastFour && `(ending in ${subscription.cardLastFour})`}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-end">
        <div className={`text-xs font-medium text-muted-foreground transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          ID: {subscription.id}
        </div>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionCard;
