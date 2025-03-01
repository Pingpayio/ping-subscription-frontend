
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CheckoutForm } from "@/components/CheckoutForm";
import { SubscriptionPlan } from "@/types/subscription";
import { Button } from "@/components/ui/button";
import { subscriptionPlans } from "@/data/mockData";

const Checkout = () => {
  // Pre-select the first plan from the available plans
  const [selectedPlan] = useState<SubscriptionPlan>(subscriptionPlans[0]);

  const handleBack = () => {
    // This function is kept for the back button in the checkout form
    // but doesn't change the view anymore since we're not showing plan selection
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-12 lg:py-16">
        <div className="mb-8 flex items-center">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-1 text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>
        <CheckoutForm selectedPlan={selectedPlan} onBack={handleBack} />
      </div>
    </div>
  );
};

export default Checkout;
