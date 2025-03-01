
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { subscriptionPlans } from "@/data/mockData";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-background px-4 py-6 md:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center">
            <div className="relative h-9 w-9 overflow-hidden rounded-full bg-primary">
              <div className="absolute inset-0 flex items-center justify-center text-primary-foreground font-bold">
                S
              </div>
            </div>
            <span className="ml-2 text-xl font-semibold">Subscription Haven</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/checkout">
              <Button size="sm">Sign Up</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="sm">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Subscription Plans Section */}
      <section className="flex-1 bg-muted/50 px-4 py-12">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Choose the plan that's right for you
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground">
              Select from our competitively priced plans designed to fit businesses of all sizes.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {subscriptionPlans.map((plan, i) => (
              <div 
                key={plan.id} 
                className="rounded-xl border bg-card p-6 shadow-sm hover-lift"
              >
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/checkout" className="block w-full">
                    <Button variant={i === 1 ? "default" : "outline"} className="w-full">
                      {i === 1 ? "Get Started" : "Choose Plan"}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="border-t bg-background px-4 py-4">
        <div className="mx-auto max-w-7xl text-center text-sm text-muted-foreground">
          © 2023 Subscription Haven. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
