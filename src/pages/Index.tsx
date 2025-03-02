import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Ping pay
                </h1>
              </div>
              <div className="space-y-4">
                <Link to="/dashboard">
                  <Button className="w-full min-w-[200px]">For Customers</Button>
                </Link>
                <Link to="/merchant-dashboard">
                  <Button className="w-full min-w-[200px]" variant="outline">For Merchants</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
