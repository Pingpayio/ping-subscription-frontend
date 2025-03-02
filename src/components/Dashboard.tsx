
import { useState, useEffect } from "react";
import { Subscription, subscriptions } from "@/lib/subscription-data";
import SubscriptionCard from "./SubscriptionCard";
import MetricsOverview from "./MetricsOverview";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const Dashboard = () => {
  const [allSubscriptions, setAllSubscriptions] = useState<Subscription[]>([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<Subscription[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch with a delay for animations
    const timer = setTimeout(() => {
      setAllSubscriptions(subscriptions);
      setFilteredSubscriptions(subscriptions);
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters whenever search term or status filter changes
    let results = allSubscriptions;
    
    if (searchTerm) {
      results = results.filter(sub => 
        sub.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        sub.planName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== "all") {
      results = results.filter(sub => sub.status === statusFilter);
    }
    
    setFilteredSubscriptions(results);
  }, [searchTerm, statusFilter, allSubscriptions]);

  return (
    <div className="space-y-8 pb-10">
      <MetricsOverview />
      
      <div className="border-b border-border pb-5">
        <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-6 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search customer or plan"
              className="pl-8 bg-card border-border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full sm:w-40 bg-card border-border">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="past_due">Past Due</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 rounded-md bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <div>
          {filteredSubscriptions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No subscriptions found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSubscriptions.map((subscription, index) => (
                <div 
                  key={subscription.id} 
                  className="opacity-0 animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <SubscriptionCard subscription={subscription} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
