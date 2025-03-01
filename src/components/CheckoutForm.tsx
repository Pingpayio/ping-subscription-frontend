
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Wallet, CreditCard, CheckIcon, Calendar } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getNextBillingDate } from "@/data/mockData";
import { SubscriptionPlan } from "@/types/subscription";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format"),
  cvc: z.string().regex(/^\d{3,4}$/, "CVC must be 3 or 4 digits"),
  maxDuration: z.string().optional(),
});

export function CheckoutForm({ selectedPlan, onBack }: { selectedPlan: SubscriptionPlan, onBack: () => void }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "wallet" | null>(null);
  const [showCardForm, setShowCardForm] = useState(false);
  const [maxDuration, setMaxDuration] = useState<string>("no-limit");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      maxDuration: "no-limit",
    },
  });
  
  const handleWalletConnect = () => {
    setPaymentMethod("wallet");
    toast({
      title: "Wallet connection requested",
      description: "This is a demo feature. In a real app, a wallet connection dialog would appear.",
    });
  };
  
  const handleCardPayment = () => {
    setPaymentMethod("card");
    setShowCardForm(true);
  };
  
  const getDurationOptions = () => {
    const options = [
      { value: "no-limit", label: "No Limit" }
    ];
    
    switch (selectedPlan.interval) {
      case "daily":
        options.push(
          { value: "7-days", label: "7 days" },
          { value: "14-days", label: "14 days" },
          { value: "30-days", label: "30 days" }
        );
        break;
      case "weekly":
        options.push(
          { value: "4-weeks", label: "4 weeks" },
          { value: "8-weeks", label: "8 weeks" },
          { value: "12-weeks", label: "12 weeks" }
        );
        break;
      case "monthly":
        options.push(
          { value: "3-months", label: "3 months" },
          { value: "6-months", label: "6 months" },
          { value: "12-months", label: "12 months" }
        );
        break;
      case "yearly":
        options.push(
          { value: "2-years", label: "2 years" },
          { value: "3-years", label: "3 years" },
          { value: "5-years", label: "5 years" }
        );
        break;
    }
    
    return options;
  };
  
  const getMaxDurationEndDate = () => {
    if (maxDuration === "no-limit") return "No end date";
    
    const today = new Date();
    const [amount, unit] = maxDuration.split("-");
    const amountNum = parseInt(amount);
    
    switch (unit) {
      case "days":
        return new Date(today.setDate(today.getDate() + amountNum)).toLocaleDateString();
      case "weeks":
        return new Date(today.setDate(today.getDate() + amountNum * 7)).toLocaleDateString();
      case "months":
        return new Date(today.setMonth(today.getMonth() + amountNum)).toLocaleDateString();
      case "years":
        return new Date(today.setFullYear(today.getFullYear() + amountNum)).toLocaleDateString();
      default:
        return "No end date";
    }
  };
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Subscription created!",
      description: `You are now subscribed to the ${selectedPlan.name} plan.`,
    });
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  }
  
  const nextBillingDate = getNextBillingDate(selectedPlan.interval);
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(selectedPlan.price);

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="order-2 md:order-1">
        <Card>
          <CardHeader>
            <CardTitle>Complete Purchase</CardTitle>
            <CardDescription>Enter your information to create your subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-xl font-semibold">{selectedPlan.name} Plan</div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{formattedPrice}</span>
                  <span className="ml-1 text-muted-foreground">/{selectedPlan.interval}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  Next billing date: {nextBillingDate}
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-sm font-medium">Choose a payment method</div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Button
                    variant="outline"
                    className={`flex h-24 flex-col items-center justify-center border-2 ${
                      paymentMethod === "wallet" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={handleWalletConnect}
                  >
                    <div className="flex items-center">
                      <Wallet className="mr-2 h-5 w-5" />
                      <div className="text-left">
                        <p className="font-medium">Connect Wallet</p>
                      </div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className={`flex h-24 flex-col items-center justify-center border-2 ${
                      paymentMethod === "card" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={handleCardPayment}
                  >
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" />
                      <div className="text-left">
                        <p className="font-medium">Pay with Card</p>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
              
              {showCardForm && (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="John Doe" className="pl-9" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="john.doe@example.com" className="pl-9" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="1234 5678 9012 3456" className="pl-9" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="expiryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                              <Input placeholder="MM/YY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cvc"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVC</FormLabel>
                            <FormControl>
                              <Input placeholder="123" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="maxDuration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Subscription Duration</FormLabel>
                          <Select 
                            defaultValue={field.value} 
                            onValueChange={(value) => {
                              field.onChange(value);
                              setMaxDuration(value);
                            }}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a maximum duration" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {getDurationOptions().map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-sm text-muted-foreground mt-1">
                            {maxDuration !== "no-limit" ? `Subscription will end on: ${getMaxDurationEndDate()}` : "Your subscription will continue until canceled"}
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">Complete Purchase</Button>
                  </form>
                </Form>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="order-1 md:order-2">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Summary</CardTitle>
            <CardDescription>Review your subscription details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-2 text-lg font-semibold">{selectedPlan.name} Plan</div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-medium">
                    {formattedPrice}/{selectedPlan.interval}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Billing cycle</span>
                  <span className="font-medium">
                    Every {selectedPlan.interval}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next billing date</span>
                  <span className="font-medium">{nextBillingDate}</span>
                </div>
              </div>
              <div>
                <div className="mb-2 text-lg font-semibold">Features</div>
                <ul className="space-y-2">
                  {selectedPlan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckIcon className="mr-2 h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start space-y-2 border-t px-6 py-4">
            <div className="flex w-full justify-between">
              <span className="text-lg font-medium">Today's charge</span>
              <span className="text-lg font-semibold">{formattedPrice}</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
