
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Store, Users } from "lucide-react";

export default function Index() {
  return <div className="flex flex-col h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center">
          <div className="flex items-center space-x-2">
            <img src="/lovable-uploads/6d47a643-2439-46b1-a4d9-a4d81a096357.png" alt="PingPay Logo" className="h-8 w-auto" />
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center">
        <section className="w-full">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl lg:text-8xl/[1.1] bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 max-w-[15ch] mx-auto">
                  Secure Automated Recurring Payments
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground text-xl md:text-2xl">
                  Seamless management and payment for subscriptions services.
                  <br />
                  All-in-one payment services curated for your use case.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-5 mt-8">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="min-w-[240px] gap-3 text-lg px-12 py-7 h-16 rounded-[4px] border-primary/20 text-primary hover:bg-primary/5"
                  asChild
                >
                  <Link to="/subscriptions">
                    <Users size={24} />
                    For Customers
                  </Link>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="min-w-[240px] gap-3 text-lg px-12 py-7 h-16 rounded-[4px] border-primary/20 text-primary hover:bg-primary/5"
                  asChild
                >
                  <Link to="/merchant-dashboard">
                    <Store size={24} />
                    For Merchants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>;
}
