import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getNextBillingDate, mockMerchant } from "@/data/mockData";
import { SubscriptionPlan } from "@/types/subscription";
import { useWalletSelector } from "@near-wallet-selector/react-hook";
import { SubscriptionSDK } from '@pingpay/subscription-sdk/dist/browser';
import * as nearAPI from "near-api-js";
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  format
} from "date-fns";
import {
  Calendar,
  CheckIcon,
  CreditCard,
  Mail,
  User,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface CheckoutFormProps {
  selectedPlan: SubscriptionPlan;
  onBack: () => void;
}

export function CheckoutForm({ selectedPlan, onBack }: CheckoutFormProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"crypto" | "card" | null>(
    null
  );
  const [showCardForm, setShowCardForm] = useState(false);
  const [maxDuration, setMaxDuration] = useState<string>("no-limit");
  const [customDuration, setCustomDuration] = useState<string>("");
  const [showDurationInput, setShowDurationInput] = useState<boolean>(false);

  const { signIn, signOut, signedAccountId, wallet } = useWalletSelector();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create a new SDK instance
      const sdk = new SubscriptionSDK({
        apiUrl: 'http://localhost:3000' // Optional, defaults to this value
      });

      // Calculate frequency in seconds based on the plan interval
      let frequency = 86400; // Default to daily (86400 seconds)
      switch (selectedPlan.interval) {
        case 'minute':
          frequency = 60;
          break;
        case 'hourly':
          frequency = 3600;
          break;
        case 'daily':
          frequency = 86400;
          break;
        case 'weekly':
          frequency = 604800;
          break;
        case 'monthly':
          frequency = 2592000; // 30 days
          break;
        case 'quarterly':
          frequency = 7776000; // 90 days
          break;
        case 'yearly':
          frequency = 31536000; // 365 days
          break;
      }

      // Convert price to yoctoNEAR (1 NEAR = 10^24 yoctoNEAR)
      const amount = (selectedPlan.price * 1e24).toString();
      
      // Set max payments based on duration if specified
      const maxPayments = maxDuration !== 'no-limit' ? parseInt(maxDuration) : undefined;

      // Create a subscription
      // const result = await sdk.createSubscription({
      //   merchantId: mockMerchant.id, // Use the merchant ID from mock data
      //   amount,
      //   frequency,
      //   maxPayments
      // });

      // if (!result.success || !result.subscriptionId) {
      //   throw new Error('Failed to create subscription');
      // }

      // Generate a function call access key for the subscription
      // Use the total price as the allowance if a duration is selected
      const allowance = (totalPrice * 1e24).toString(); // Convert to yoctoNEAR
      const subscriptionId = "1";
      const { transaction, keyPair } = sdk.createSubscriptionKeyTransaction(
        signedAccountId!, // Use the connected wallet account
        subscriptionId,
        mockMerchant.id,
        allowance // Use the calculated total price as the allowance
      );

      // Sign the transaction using the wallet selector
      try {
        // Sign and send the transaction
        const outcome = await wallet.signAndSendTransaction({
          signerId: signedAccountId!,
          receiverId: mockMerchant.id,
          actions: [transaction]
        });

        if (outcome && outcome.transaction_outcome) {
          console.log("Transaction succeeded:", outcome);
          
          // Only register the key and store the key if the transaction succeeds
          // Register the key with the contract
          await sdk.registerSubscriptionKey(
            subscriptionId,
            keyPair.publicKey
          );

          // Store the private key in the TEE
          await sdk.storeSubscriptionKey(
            subscriptionId,
            keyPair.privateKey,
            keyPair.publicKey
          );

          setLoading(false);
          toast.success("Subscription activated successfully!");
          navigate("/dashboard");
        } else {
          throw new Error("Transaction failed");
        }
      } catch (txError) {
        console.error("Transaction error:", txError);
        setLoading(false);
        toast.error("Failed to sign transaction. Please try again.");
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
      setLoading(false);
      toast.error("Failed to create subscription. Please try again.");
    }
  };

  const today = new Date();
  const nextBillingDate = getNextBillingDate(selectedPlan.interval, today);

  // Check if wallet is already connected
  useEffect(() => {
    if (signedAccountId) {
      setPaymentMethod("crypto");
      toast.success(`Wallet connected: ${signedAccountId}`);
    }
  }, [signedAccountId]);

  const handleConnectWallet = () => {
    try {
      signIn();
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
    }
  };

  const handleCardPayment = () => {
    // We'll show a toast indicating this option is not available
    toast.info(
      "Card payments are currently unavailable. Please connect wallet instead."
    );
  };

  // Handle custom duration input change
  const handleCustomDurationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === "" || /^\d+$/.test(value)) {
      setCustomDuration(value);
      if (value === "") {
        setMaxDuration("no-limit");
      } else {
        setMaxDuration(value);
      }
    }
  };

  // Get the appropriate unit label based on the interval
  const getIntervalUnitLabel = () => {
    switch (selectedPlan.interval) {
      case "daily":
        return "days";
      case "weekly":
        return "weeks";
      case "monthly":
        return "months";
      case "yearly":
        return "years";
      default:
        return selectedPlan.interval + "s";
    }
  };

  const getMaxDurationEndDate = () => {
    if (maxDuration === "no-limit") return "No end date";

    const durationNum = parseInt(maxDuration);
    let endDate = today; // Start with today's date

    if (selectedPlan.interval === "daily") {
      endDate = addDays(today, durationNum);
    } else if (selectedPlan.interval === "weekly") {
      endDate = addWeeks(today, durationNum);
    } else if (selectedPlan.interval === "monthly") {
      endDate = addMonths(today, durationNum);
    } else if (selectedPlan.interval === "yearly") {
      endDate = addYears(today, durationNum);
    }

    return format(endDate, "MMMM d, yyyy");
  };

  const getDurationLabel = () => {
    if (maxDuration === "no-limit") return "No Limit";

    const durationNum = parseInt(maxDuration);

    if (selectedPlan.interval === "daily") {
      return `${durationNum} day${durationNum !== 1 ? "s" : ""}`;
    } else if (selectedPlan.interval === "weekly") {
      return `${durationNum} week${durationNum !== 1 ? "s" : ""}`;
    } else if (selectedPlan.interval === "monthly") {
      return `${durationNum} month${durationNum !== 1 ? "s" : ""}`;
    } else if (selectedPlan.interval === "yearly") {
      return `${durationNum} year${durationNum !== 1 ? "s" : ""}`;
    }

    return `${durationNum} ${selectedPlan.interval}`;
  };

  // Simplified calculation that works for all plan types
  const calculateTotalPrice = (): number => {
    if (maxDuration === "no-limit") {
      return selectedPlan.price;
    }

    const durationNum = parseInt(maxDuration);
    return selectedPlan.price * durationNum;
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Complete your purchase
          </h2>
          <p className="mt-2 text-muted-foreground">
            Enter your billing details to subscribe to the {selectedPlan.name}{" "}
            plan
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
              <Label htmlFor="max-duration">
                Maximum Subscription Duration
              </Label>
              {!showDurationInput ? (
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-secondary hover:bg-accent/10"
                    onClick={() => setShowDurationInput(true)}
                  >
                    Set Limit
                  </Button>
                  <Button type="button" variant="secondary" className="flex-1">
                    No Limit (Default)
                  </Button>
                </div>
              ) : (
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                      id="max-duration"
                      type="text"
                      className="pl-10 bg-secondary/50 border-secondary"
                      placeholder={`Enter number of ${getIntervalUnitLabel()}`}
                      value={customDuration}
                      onChange={handleCustomDurationChange}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-secondary hover:bg-accent/10"
                    onClick={() => {
                      setCustomDuration("");
                      setMaxDuration("no-limit");
                      setShowDurationInput(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              )}
              {maxDuration !== "no-limit" && (
                <div className="text-sm text-muted-foreground mt-1 space-y-1">
                  <p>Duration: {maxDuration} {getIntervalUnitLabel()}</p>
                  <p>Total: {selectedPlan.price.toFixed(2)} NEAR × {maxDuration} = {totalPrice.toFixed(2)} NEAR</p>
                  <p>Your subscription will automatically end on {getMaxDurationEndDate()}.</p>
                </div>
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
                        <p className="text-xs text-muted-foreground">
                          Currently unavailable
                        </p>
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
                  <p className="text-sm text-muted-foreground mb-3">
                    {signedAccountId
                      ? `Connected account: ${signedAccountId}`
                      : "Your crypto wallet has been connected successfully."}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      signOut();
                      setPaymentMethod(null);
                    }}
                    className="border-secondary hover:bg-accent/10"
                  >
                    Disconnect
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
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                  >
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
                      <p className="font-medium">
                        {selectedPlan.price.toFixed(2)} NEAR
                      </p>
                      <p className="text-sm text-muted-foreground">
                        /{selectedPlan.interval}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-medium">{totalPrice.toFixed(2)} NEAR</p>
                      <p className="text-xs text-muted-foreground">
                        ({selectedPlan.price.toFixed(2)} × {maxDuration})
                      </p>
                    </>
                  )}
                </div>
              </div>

              {maxDuration !== "no-limit" && (
                <div className="rounded-lg bg-secondary/50 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Duration:</p>
                    <p className="text-sm">{getDurationLabel()}</p>
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
                {maxDuration !== "no-limit" && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Base price
                    </span>
                    <span>{selectedPlan.price.toFixed(2)} NEAR/{selectedPlan.interval}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    {maxDuration === "no-limit" ? "Subtotal" : `Subtotal (${maxDuration} ${getIntervalUnitLabel()})`}
                  </span>
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
              By completing this purchase, you agree to our Terms of Service and
              Privacy Policy.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
