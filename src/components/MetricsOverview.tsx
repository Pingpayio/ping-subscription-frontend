
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMetricsOverview, formatCurrency } from "@/lib/subscription-data";
import { CreditCard, DollarSign, Check } from "lucide-react";

const MetricsOverview = () => {
  const [metrics, setMetrics] = useState({
    totalSubscriptions: 0,
    activeSubscriptions: 0,
    pastDueSubscriptions: 0,
    trialingSubscriptions: 0,
    monthlyRecurringRevenue: 0
  });
  
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Simulating data fetch with a slight delay for animation
    const timer = setTimeout(() => {
      setMetrics(getMetricsOverview());
      setVisible(true);
    }, 400);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-opacity duration-700 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <Card className="bg-charcoal-light border-[#2A2A2A] shadow-md hover:shadow-lg hover:shadow-purple/10 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-light">Total Subscriptions</CardTitle>
          <Check className="h-4 w-4 text-purple" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{metrics.totalSubscriptions}</div>
          <p className="text-xs text-gray-light mt-1">
            {metrics.activeSubscriptions} active subscriptions
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-charcoal-light border-[#2A2A2A] shadow-md hover:shadow-lg hover:shadow-purple/10 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-light">Monthly Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-purple" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{formatCurrency(metrics.monthlyRecurringRevenue, 'USD')}</div>
          <p className="text-xs text-gray-light mt-1">
            From all active subscriptions
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-charcoal-light border-[#2A2A2A] shadow-md hover:shadow-lg hover:shadow-purple/10 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-light">Past Due</CardTitle>
          <CreditCard className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{metrics.pastDueSubscriptions}</div>
          <p className="text-xs text-gray-light mt-1">
            Require payment attention
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsOverview;
