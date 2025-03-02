
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CreditCard, Users } from "lucide-react";
export default function Index() {
  return <div className="flex flex-col min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center">
          <div className="flex items-center space-x-2">
            <img src="/lovable-uploads/6d47a643-2439-46b1-a4d9-a4d81a096357.png" alt="PingPay Logo" className="h-8 w-auto" />
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl lg:text-8xl/[1.1] xl:text-9xl/[1.1] bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 max-w-[15ch] mx-auto">
                  Secure Automated Reoccurring Payments
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Seamlessly manage and pay for subscriptions all-in-one place with Pingpay for all use cases</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/dashboard">
                  <Button size="lg" className="min-w-[220px] gap-2 text-base px-10 py-6 h-14">
                    <Users size={22} />
                    For Customers
                  </Button>
                </Link>
                <Link to="/merchant-dashboard">
                  <Button size="lg" variant="outline" className="min-w-[220px] gap-2 text-base px-10 py-6 h-14">
                    <CreditCard size={22} />
                    For Merchants
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>;
}
