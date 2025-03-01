
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Wallet, CreditCard, CheckIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SubscriptionPlan } from "@/types/subscription";
import { toast } from "sonner";
import { format, addMonths, addYears } from "date-fns";
import * as nearAPI from 'near-api-js';

interface CheckoutFormProps {
  selectedPlan: SubscriptionPlan;
  onBack: () => void;
}

export function CheckoutForm({ selectedPlan, onBack }: CheckoutFormProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"crypto" | "card" | null>(null);
  const [showCardForm, setShowCardForm] = useState(false);
  const [nearWallet, setNearWallet] = useState<nearAPI.WalletConnection | null>(null);
  const [nearAccountId, setNearAccountId] = useState<string | null>(null);
  
  // Initialize NEAR
  useEffect(() => {
    const initNear = async () => {
      try {
        const { connect, keyStores, WalletConnection } = nearAPI;
        
        // Configure NEAR connection
        const config = {
          networkId: 'testnet',
          keyStore: new keyStores.BrowserLocalStorageKeyStore(),
          nodeUrl: 'https://rpc.testnet.near.org',
          walletUrl: 'https://wallet.testnet.near.org',
          helperUrl: 'https://helper.testnet.near.org',
          explorerUrl: 'https://explorer.testnet.near.org',
        };
        
        // Connect to NEAR
        const near = await connect(config);
        const wallet = new WalletConnection(near, 'crypto-subscription-app');
        
        setNearWallet(wallet);
        
        // Check if user is already signed in
        if (wallet.isSignedIn()) {
          setNearAccountId(wallet.getAccountId());
          setPaymentMethod("crypto");
          toast.success(`Connected to NEAR wallet: ${wallet.getAccountId()}`);
        }
      } catch (error) {
        console.error("Error initializing NEAR:", error);
        toast.error("Failed to initialize NEAR wallet");
      }
    };
    
    initNear();
  }, []);
  
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
  const nextBillingDate = selectedPlan.interval === "monthly" 
    ? format(addMonths(today, 1), "MMMM d, yyyy")
    : format(addYears(today, 1), "MMMM d, yyyy");
  
  const handleConnectNearWallet = async () => {
    try {
      if (!nearWallet) {
        toast.error("NEAR wallet not initialized");
        return;
      }
      
      if (nearWallet.isSignedIn()) {
        setNearAccountId(nearWallet.getAccountId());
        setPaymentMethod("crypto");
        toast.success(`Connected to NEAR wallet: ${nearWallet.getAccountId()}`);
      } else {
        // Redirect to NEAR wallet for authorization
        // Adding the required keyType property to fix the TypeScript error
        nearWallet.requestSignIn({
          contractId: 'dev-1234567890123',  // Replace with your actual contract ID
          methodNames: ['makePayment'],      // Optional list of methods to be allowed
          successUrl: window.location.href,  // URL to redirect after successful login
          failureUrl: window.location.href,  // URL to redirect after failed login
          keyType: 'ed25519'                 // Add the required keyType property
        });
      }
    } catch (error) {
      console.error("Error connecting to NEAR wallet:", error);
      toast.error("Failed to connect to NEAR wallet");
    }
  };
  
  const handleDisconnectNearWallet = () => {
    if (nearWallet) {
      nearWallet.signOut();
      setNearAccountId(null);
      setPaymentMethod(null);
      toast.info("Disconnected from NEAR wallet");
    }
  };
  
  const handleCardPayment = () => {
    setPaymentMethod("card");
    setShowCardForm(true);
  };
  
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
              <Separator />
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="first-name" 
                    className="pl-10" 
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
                    className="pl-10" 
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
                  className="pl-10" 
                  placeholder="john.doe@example.com" 
                  required 
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Payment Method</h3>
              <Separator />
            </div>
            
            <div className="flex flex-col gap-4">
              {!paymentMethod && (
                <>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex justify-between items-center h-auto p-4"
                    onClick={handleConnectNearWallet}
                  >
                    <div className="flex items-center">
                      <Wallet className="mr-2 h-5 w-5" />
                      <div className="text-left">
                        <p className="font-medium">Connect NEAR Wallet</p>
                        <p className="text-sm text-muted-foreground">Pay with NEAR cryptocurrency</p>
                      </div>
                    </div>
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex justify-between items-center h-auto p-4"
                    onClick={handleCardPayment}
                  >
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" />
                      <div className="text-left">
                        <p className="font-medium">Credit Card</p>
                        <p className="text-sm text-muted-foreground">Pay with Visa, Mastercard, or American Express</p>
                      </div>
                    </div>
                  </Button>
                </>
              )}
              
              {paymentMethod === "crypto" && (
                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="h-5 w-5 text-green-500" />
                    <span className="font-medium">NEAR Wallet Connected</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Connected account: <span className="font-mono">{nearAccountId}</span>
                  </p>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={handleDisconnectNearWallet}
                  >
                    Disconnect Wallet
                  </Button>
                </div>
              )}
              
              {paymentMethod === "card" && showCardForm && (
                <div className="p-4 border rounded-md space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-blue-500" />
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
                    >
                      Change
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input 
                        id="card-number" 
                        className="pl-3" 
                        placeholder="1234 5678 9012 3456" 
                        required 
                      />
                    </div>
                    
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input 
                          id="expiry" 
                          className="pl-3" 
                          placeholder="MM/YY" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input 
                          id="cvc" 
                          className="pl-3" 
                          placeholder="123" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="zip">Zip Code</Label>
                        <Input 
                          id="zip" 
                          className="pl-3" 
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
              className="sm:flex-1" 
              onClick={onBack}
            >
              Back
            </Button>
            <Button 
              type="submit" 
              className="sm:flex-1" 
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
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/50 p-6">
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Review your subscription details</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{selectedPlan.name} Plan</p>
                  <p className="text-sm text-muted-foreground">
                    Billed {selectedPlan.interval}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${selectedPlan.price.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">/{selectedPlan.interval}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <p className="font-medium">What's included:</p>
                <ul className="space-y-2">
                  {selectedPlan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Separator />
              
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span>${selectedPlan.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${selectedPlan.price.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="rounded-lg bg-muted/50 p-4 text-sm">
                <p className="font-medium">Subscription details:</p>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>Next billing date: {nextBillingDate}</li>
                  <li>14-day free trial included</li>
                  <li>Cancel anytime, no questions asked</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/20 p-6 pt-0">
            <div className="text-sm text-muted-foreground">
              By completing this purchase, you agree to our Terms of Service and Privacy Policy.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
