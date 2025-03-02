
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

// Define separate link sets for customer and merchant flows
const customerLinks = [
  { name: "Home", href: "/", exact: true },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Settings", href: "/settings" },
];

const merchantLinks = [
  { name: "Home", href: "/", exact: true },
];

export function Navbar() {
  const location = useLocation();
  
  // Determine if we're in the merchant dashboard to show appropriate links
  const isMerchantDashboard = location.pathname === "/merchant-dashboard";
  const links = isMerchantDashboard ? merchantLinks : customerLinks;
  
  const isActive = (path: string, exact: boolean = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-background border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/6d47a643-2439-46b1-a4d9-a4d81a096357.png" 
              alt="Logo" 
              className="h-8 w-auto"
            />
          </Link>
          <nav className="hidden md:flex gap-6 items-center">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex items-center",
                  isActive(link.href, link.exact)
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
