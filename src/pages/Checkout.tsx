
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PlanSelector } from "@/components/PlanSelector";
import { CheckoutForm } from "@/components/CheckoutForm";
import { SubscriptionPlan } from "@/types/subscription";
import { Button } from "@/components/ui/button";

const Checkout = () => {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleBack = () => {
    setSelectedPlan(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-12 lg:py-16 min-h-screen">
      {selectedPlan ? (
        <CheckoutForm selectedPlan={selectedPlan} onBack={handleBack} />
      ) : (
        <>
          <div className="mb-8 flex items-center">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          <PlanSelector onSelectPlan={handleSelectPlan} />
        </>
      )}
    </div>
  );
};

export default Checkout;
