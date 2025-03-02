import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CreditCard, Users } from "lucide-react";

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/6d47a643-2439-46b1-a4d9-a4d81a096357.png" 
              alt="PingPay Logo" 
              className="h-8 w-auto"
            />
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                  Subscription Management Simplified
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Manage all your recurring payments in one place with PingPay's powerful subscription platform.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/dashboard">
                  <Button size="lg" className="min-w-[200px] gap-2">
                    <Users size={20} />
                    For Customers
                  </Button>
                </Link>
                <Link to="/merchant-dashboard">
                  <Button size="lg" variant="outline" className="min-w-[200px] gap-2">
                    <CreditCard size={20} />
                    For Merchants
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 hover-lift">
                <h3 className="text-lg font-semibold">Simple Integration</h3>
                <p className="text-muted-foreground mt-2">Connect your payment methods and start managing subscriptions in minutes.</p>
              </div>
              <div className="rounded-lg border bg-card p-6 hover-lift">
                <h3 className="text-lg font-semibold">Smart Notifications</h3>
                <p className="text-muted-foreground mt-2">Get alerted before payments are due and avoid unexpected charges.</p>
              </div>
              <div className="rounded-lg border bg-card p-6 hover-lift">
                <h3 className="text-lg font-semibold">Detailed Analytics</h3>
                <p className="text-muted-foreground mt-2">Track spending patterns and optimize your subscription costs.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/6d47a643-2439-46b1-a4d9-a4d81a096357.png" 
              alt="PingPay Logo" 
              className="h-6 w-auto"
            />
            <span>© 2023 PingPay. All rights reserved.</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-primary">Terms</a>
            <a href="#" className="text-muted-foreground hover:text-primary">Privacy</a>
            <a href="#" className="text-muted-foreground hover:text-primary">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
