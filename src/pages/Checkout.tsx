
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CheckoutForm } from "@/components/CheckoutForm";
import { SubscriptionPlan } from "@/types/subscription";
import { Button } from "@/components/ui/button";
import { 
  subscriptionPlans, 
  allPlans,
  getSubscriptionPlan
} from "@/data/mockData";
import { toast } from "sonner";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  
  useEffect(() => {
    // Get the plan ID from the URL
    const searchParams = new URLSearchParams(location.search);
    const planId = searchParams.get('plan');
    
    if (planId) {
      // Find the plan in our allPlans array using the utility function
      const plan = getSubscriptionPlan(planId);
      if (plan) {
        setSelectedPlan(plan);
      } else {
        // Plan not found, redirect to subscriptions page
        toast.error("Selected plan not found");
        navigate('/subscriptions');
      }
    } else {
      // No plan selected, default to the first plan
      setSelectedPlan(subscriptionPlans[0]);
    }
  }, [location.search, navigate]);

  const handleBack = () => {
    // Go back to the subscription plans page
    navigate('/subscriptions');
  };

  if (!selectedPlan) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <p>Loading plan details...</p>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-12 lg:py-16">
        <div className="mb-8 flex items-center">
          <Link to="/subscriptions">
            <Button variant="ghost" size="sm" className="gap-1 text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Plans
            </Button>
          </Link>
        </div>
        <CheckoutForm selectedPlan={selectedPlan} onBack={handleBack} />
      </div>
    </div>
  );
};

export default Checkout;
