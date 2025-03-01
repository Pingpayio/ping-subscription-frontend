
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Settings, Menu, X } from "lucide-react";

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const routes = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ];
  
  return (
    <nav className="bg-background/95 sticky top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Link to="/" className="mr-4 flex items-center">
          <div className="relative h-8 w-8 mr-2 overflow-hidden rounded-full bg-primary">
            <div className="absolute inset-0 flex items-center justify-center text-primary-foreground font-bold">
              S
            </div>
          </div>
          <span className="font-semibold">Subscription Haven</span>
        </Link>
        
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-4">
          {routes.map((route) => (
            <Link key={route.path} to={route.path}>
              <Button 
                variant={location.pathname === route.path ? "default" : "ghost"} 
                className={cn(
                  "h-9",
                  location.pathname === route.path ? "bg-primary text-primary-foreground" : ""
                )}
              >
                {route.icon}
                {route.name}
              </Button>
            </Link>
          ))}
        </div>
        
        <div className="flex md:hidden flex-1 justify-end">
          <Button 
            variant="ghost" 
            className="px-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b animate-slideDown">
          <div className="space-y-1 px-4 py-3">
            {routes.map((route) => (
              <Link 
                key={route.path} 
                to={route.path} 
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                  location.pathname === route.path 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-accent"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {route.icon}
                {route.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
