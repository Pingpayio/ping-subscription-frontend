
import { useState } from "react";
import { CreditCard, Trash2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PaymentMethod } from "@/types/subscription";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod;
  onSetDefault: (id: string) => void;
  onDelete: (id: string) => void;
}

export function PaymentMethodCard({
  paymentMethod,
  onSetDefault,
  onDelete,
}: PaymentMethodCardProps) {
  const [isHovering, setIsHovering] = useState(false);

  const getIcon = () => {
    switch (paymentMethod.type) {
      case "card":
        return <CreditCard className="h-6 w-6" />;
      case "paypal":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 11l5-7v3h4l-5 7v-3H7z" />
          </svg>
        );
      default:
        return <CreditCard className="h-6 w-6" />;
    }
  };

  const handleDelete = () => {
    onDelete(paymentMethod.id);
    toast.success("Payment method removed successfully");
  };

  const handleSetDefault = () => {
    if (!paymentMethod.isDefault) {
      onSetDefault(paymentMethod.id);
      toast.success("Default payment method updated");
    }
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all hover-lift",
        paymentMethod.isDefault && "border-primary/50"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {paymentMethod.isDefault && (
        <div className="absolute right-2 top-2 z-10">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Default
          </span>
        </div>
      )}
      <CardHeader className="p-6">
        <div className="flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
            {getIcon()}
          </div>
          <div>
            <CardTitle className="text-lg">{paymentMethod.details}</CardTitle>
            <CardDescription>
              {paymentMethod.type === "card" && paymentMethod.expiryDate
                ? `Expires ${paymentMethod.expiryDate}`
                : `${paymentMethod.type.charAt(0).toUpperCase() + paymentMethod.type.slice(1)} Account`}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between p-6 pt-0">
        {!paymentMethod.isDefault && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleSetDefault}
            className="text-sm"
          >
            <Check className="mr-1 h-4 w-4" />
            Set as default
          </Button>
        )}
        {paymentMethod.isDefault ? (
          <div className="text-sm text-muted-foreground">
            Used for recurring payments
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="mr-1 h-4 w-4" />
            Remove
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
