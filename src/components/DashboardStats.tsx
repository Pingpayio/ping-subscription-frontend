
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  CreditCard, 
  CalendarDays, 
  CheckCircle, 
  BarChart3
} from "lucide-react";

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="animate-fadeIn hover-lift">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Subscription
          </CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Professional</div>
          <p className="text-xs text-muted-foreground">
            $19.99/month
          </p>
        </CardContent>
      </Card>
      
      <Card className="animate-fadeIn hover-lift animation-delay-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Next Payment
          </CardTitle>
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">June 15, 2023</div>
          <p className="text-xs text-muted-foreground">
            Auto-renewal enabled
          </p>
        </CardContent>
      </Card>
      
      <Card className="animate-fadeIn hover-lift animation-delay-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Usage
          </CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">65%</div>
          <div className="mt-2 h-2 w-full rounded-full bg-muted">
            <div 
              className="h-2 rounded-full bg-primary" 
              style={{ width: '65%' }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            3/5 projects used
          </p>
        </CardContent>
      </Card>
      
      <Card className="animate-fadeIn hover-lift animation-delay-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Status
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Active</div>
          <p className="text-xs text-muted-foreground">
            Member since March 2023
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
