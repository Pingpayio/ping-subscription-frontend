
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { subscriptionPlans } from "@/data/mockData";

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Header */}
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
              <Button variant="outline" size="sm">
                Sign Up
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="sm">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-1 items-center justify-center bg-background px-4 py-12 md:py-24 lg:py-32">
        <div className="mx-auto max-w-5xl space-y-10 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Simplified Subscription Management
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Everything you need to manage your subscription experience in one beautiful, intuitive platform.
            </p>
          </div>

          <div className="mx-auto flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link to="/checkout" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full transition-all"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Get Started
                <ArrowRight className={`ml-2 h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
              </Button>
            </Link>
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full">
                View Demo
              </Button>
            </Link>
          </div>

          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-4 md:gap-8">
            {['Seamless Management', 'Easy Billing', 'Cancel Anytime', '24/7 Support'].map((feature) => (
              <div key={feature} className="flex items-center rounded-full bg-muted px-3 py-1">
                <Check className="mr-1 h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature section */}
      <section className="bg-muted/50 px-4 py-12 md:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Choose the plan that's right for you
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Select from our competitively priced plans designed to fit businesses of all sizes.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {subscriptionPlans.map((plan, i) => (
              <div 
                key={plan.id} 
                className={`rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow`}
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

      {/* Footer */}
      <footer className="border-t bg-background px-4 py-6 md:px-6 md:py-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary">
                <div className="absolute inset-0 flex items-center justify-center text-primary-foreground font-bold">
                  S
                </div>
              </div>
              <span className="ml-2 text-lg font-semibold">Subscription Haven</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground">
                Contact
              </a>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2023 Subscription Haven. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
