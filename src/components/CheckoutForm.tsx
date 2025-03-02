
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Wallet, CreditCard, CheckIcon, Calendar } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SubscriptionPlan } from "@/types/subscription";
import { toast } from "sonner";
import { format, addDays, addWeeks, addMonths, addYears } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getNextBillingDate } from "@/data/mockData";

interface CheckoutFormProps {
  selectedPlan: SubscriptionPlan;
  onBack: () => void;
}

export function CheckoutForm({ selectedPlan, onBack }: CheckoutFormProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"crypto" | "card" | null>(null);
  const [showCardForm, setShowCardForm] = useState(false);
  const [maxDuration, setMaxDuration] = useState<string>("no-limit");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Subscription activated successfully!");
      navigate("/dashboard");
    }, 1500);
  };
  
  const today = new Date();
  const nextBillingDate = getNextBillingDate(selectedPlan.interval, today);
  
  const handleConnectWallet = () => {
    setPaymentMethod("crypto");
    toast.success("Wallet connected successfully!");
  };
  
  const handleCardPayment = () => {
    // We'll show a toast indicating this option is not available
    toast.info("Card payments are currently unavailable. Please connect wallet instead.");
  };
  
  const getDurationOptions = () => {
    const options = [
      { value: "no-limit", label: "No Limit" }
    ];
    
    if (selectedPlan.interval === "daily") {
      options.push(
        { value: "7", label: "7 days" },
        { value: "14", label: "14 days" },
        { value: "30", label: "30 days" },
        { value: "90", label: "90 days" }
      );
    } else if (selectedPlan.interval === "weekly") {
      options.push(
        { value: "4", label: "4 weeks" },
        { value: "12", label: "12 weeks" },
        { value: "24", label: "24 weeks" },
        { value: "52", label: "52 weeks" }
      );
    } else if (selectedPlan.interval === "monthly") {
      options.push(
        { value: "3", label: "3 months" },
        { value: "6", label: "6 months" },
        { value: "9", label: "9 months" },
        { value: "12", label: "12 months" }
      );
    } else if (selectedPlan.interval === "yearly") {
      options.push(
        { value: "2", label: "2 years" },
        { value: "3", label: "3 years" },
        { value: "5", label: "5 years" }
      );
    }
    
    return options;
  };
  
  const getMaxDurationEndDate = () => {
    if (maxDuration === "no-limit") return "No end date";
    
    const durationNum = parseInt(maxDuration);
    let endDate;
    
    if (selectedPlan.interval === "daily") {
      endDate = addDays(today, durationNum);
    } else if (selectedPlan.interval === "weekly") {
      endDate = addWeeks(today, durationNum);
    } else if (selectedPlan.interval === "monthly") {
      endDate = addMonths(today, durationNum);
    } else if (selectedPlan.interval === "yearly") {
      endDate = addYears(today, durationNum);
    }
    
    return endDate ? format(endDate, "MMMM d, yyyy") : "Unknown";
  };
  
  const calculateTotalPrice = (): number => {
    if (maxDuration === "no-limit") {
      return selectedPlan.price;
    }
    
    const durationNum = parseInt(maxDuration);
    let multiplier = 1;
    
    if (selectedPlan.interval === "daily") {
      multiplier = durationNum; // X days
    } else if (selectedPlan.interval === "weekly") {
      multiplier = durationNum; // X weeks
    } else if (selectedPlan.interval === "monthly") {
      multiplier = durationNum; // X months
    } else if (selectedPlan.interval === "yearly") {
      multiplier = durationNum; // X years
    }
    
    return selectedPlan.price * multiplier;
  };
  
  const totalPrice = calculateTotalPrice();
  
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Complete your purchase</h2>
          <p className="mt-2 text-muted-foreground">
            Enter your billing details to subscribe to the {selectedPlan.name} plan
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Personal Information</h3>
              <Separator className="bg-muted/50" />
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="first-name" 
                    className="pl-10 bg-secondary/50 border-secondary" 
                    placeholder="John" 
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="last-name" 
                    className="pl-10 bg-secondary/50 border-secondary" 
                    placeholder="Doe" 
                    required 
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  className="pl-10 bg-secondary/50 border-secondary" 
                  placeholder="john.doe@example.com" 
                  required 
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Subscription Duration</h3>
              <Separator className="bg-muted/50" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="max-duration">Maximum Subscription Duration</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Select 
                  value={maxDuration} 
                  onValueChange={setMaxDuration}
                >
                  <SelectTrigger id="max-duration" className="pl-10 bg-secondary/50 border-secondary">
                    <SelectValue placeholder="Select maximum duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {getDurationOptions().map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {maxDuration !== "no-limit" && (
                <p className="text-sm text-muted-foreground mt-1">
                  Your subscription will automatically end on {getMaxDurationEndDate()}.
                </p>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Payment Method</h3>
              <Separator className="bg-muted/50" />
            </div>
            
            <div className="flex flex-col gap-4">
              {!paymentMethod && (
                <>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex justify-between items-center h-auto p-4 border-secondary bg-secondary/50 hover:bg-accent/10"
                    onClick={handleConnectWallet}
                  >
                    <div className="flex items-center">
                      <Wallet className="mr-2 h-5 w-5" />
                      <div className="text-left">
                        <p className="font-medium">Connect Wallet</p>
                      </div>
                    </div>
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex justify-between items-center h-auto p-4 border-secondary bg-secondary/50 hover:bg-accent/10 opacity-50 cursor-not-allowed"
                    onClick={handleCardPayment}
                    disabled
                  >
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" />
                      <div className="text-left">
                        <p className="font-medium">Pay with Card</p>
                        <p className="text-xs text-muted-foreground">Currently unavailable</p>
                      </div>
                    </div>
                  </Button>
                </>
              )}
              
              {paymentMethod === "crypto" && (
                <div className="p-4 border border-secondary rounded-md bg-secondary/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="h-5 w-5 text-primary" />
                    <span className="font-medium">Wallet Connected</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Your crypto wallet has been connected successfully.</p>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setPaymentMethod(null)}
                    className="border-secondary hover:bg-accent/10"
                  >
                    Change
                  </Button>
                </div>
              )}
              
              {paymentMethod === "card" && showCardForm && (
                <div className="p-4 border border-secondary rounded-md bg-secondary/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <span className="font-medium">Credit Card</span>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setPaymentMethod(null);
                        setShowCardForm(false);
                      }}
                      className="hover:bg-accent/10"
                    >
                      Change
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input 
                        id="card-number" 
                        className="pl-3 bg-secondary/70 border-secondary" 
                        placeholder="1234 5678 9012 3456" 
                        required 
                      />
                    </div>
                    
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input 
                          id="expiry" 
                          className="pl-3 bg-secondary/70 border-secondary" 
                          placeholder="MM/YY" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input 
                          id="cvc" 
                          className="pl-3 bg-secondary/70 border-secondary" 
                          placeholder="123" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="zip">Zip Code</Label>
                        <Input 
                          id="zip" 
                          className="pl-3 bg-secondary/70 border-secondary" 
                          placeholder="12345" 
                          required 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button 
              type="button" 
              variant="outline" 
              className="sm:flex-1 border-secondary hover:bg-accent/10" 
              onClick={onBack}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="sm:flex-1 bg-primary hover:bg-primary/90" 
              disabled={loading || !paymentMethod}
            >
              {loading ? (
                <>
                  <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </>
              ) : (
                "Complete Subscription"
              )}
            </Button>
          </div>
        </form>
      </div>
      
      <div className="lg:sticky lg:top-20 lg:self-start">
        <Card className="overflow-hidden border-secondary bg-secondary/30">
          <CardHeader className="bg-muted/20 p-6">
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Review your subscription details</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{selectedPlan.name} Plan</p>
                  <p className="text-sm text-muted-foreground">
                    {maxDuration === "no-limit" 
                      ? `Billed ${selectedPlan.interval}`
                      : `${maxDuration} × ${selectedPlan.interval} billing periods`}
                  </p>
                </div>
                <div className="text-right">
                  {maxDuration === "no-limit" ? (
                    <>
                      <p className="font-medium">{selectedPlan.price.toFixed(2)} NEAR</p>
                      <p className="text-sm text-muted-foreground">/{selectedPlan.interval}</p>
                    </>
                  ) : (
                    <p className="font-medium">{totalPrice.toFixed(2)} NEAR</p>
                  )}
                </div>
              </div>
              
              {maxDuration !== "no-limit" && (
                <div className="rounded-lg bg-secondary/50 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Duration:</p>
                    <p className="text-sm">{getDurationOptions().find(opt => opt.value === maxDuration)?.label}</p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm font-medium">End Date:</p>
                    <p className="text-sm">{getMaxDurationEndDate()}</p>
                  </div>
                </div>
              )}
              
              <Separator className="bg-muted/50" />
              
              <div className="space-y-2">
                <p className="font-medium">What's included:</p>
                <ul className="space-y-2">
                  {selectedPlan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Separator className="bg-muted/50" />
              
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span>{totalPrice.toFixed(2)} NEAR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tax</span>
                  <span>0.00 NEAR</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{totalPrice.toFixed(2)} NEAR</span>
                </div>
              </div>
              
              <div className="rounded-lg bg-secondary/50 p-4 text-sm">
                <p className="font-medium">Subscription details:</p>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  {maxDuration === "no-limit" ? (
                    <li>Next billing date: {nextBillingDate}</li>
                  ) : (
                    <li>One-time payment for the entire duration</li>
                  )}
                  <li>Cancel anytime, no questions asked</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/10 p-6 pt-0">
            <div className="text-sm text-muted-foreground">
              By completing this purchase, you agree to our Terms of Service and Privacy Policy.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
