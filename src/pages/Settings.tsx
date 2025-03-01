
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PaymentMethodCard } from "@/components/PaymentMethodCard";
import { mockUser } from "@/data/mockData";
import { PaymentMethod } from "@/types/subscription";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CreditCard, Mail, User, Plus } from "lucide-react";

const Settings = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockUser.paymentMethods);
  
  const handleSetDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(methods => 
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };
  
  const handleDeletePaymentMethod = (id: string) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile information updated successfully");
  };
  
  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password updated successfully");
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        
        <Tabs defaultValue="profile" className="space-y-8">
          <div className="border-b">
            <div className="flex overflow-x-auto py-2">
              <TabsList className="inline-flex h-9 items-center rounded-lg bg-muted p-1 text-muted-foreground">
                <TabsTrigger value="profile" className="rounded-md px-3 py-1 text-sm font-medium">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="billing" className="rounded-md px-3 py-1 text-sm font-medium">
                  Billing & Payments
                </TabsTrigger>
                <TabsTrigger value="security" className="rounded-md px-3 py-1 text-sm font-medium">
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="rounded-md px-3 py-1 text-sm font-medium">
                  Notifications
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account profile information
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSaveProfile}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="name" 
                        className="pl-10" 
                        defaultValue={mockUser.name} 
                        placeholder="Enter your full name" 
                      />
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
                        defaultValue={mockUser.email} 
                        placeholder="Enter your email address" 
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Save Changes</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">Payment Methods</h2>
                <Button size="sm">
                  <Plus className="mr-1 h-4 w-4" />
                  Add Payment Method
                </Button>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {paymentMethods.map(method => (
                  <PaymentMethodCard
                    key={method.id}
                    paymentMethod={method}
                    onSetDefault={handleSetDefaultPaymentMethod}
                    onDelete={handleDeletePaymentMethod}
                  />
                ))}
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Billing Address</CardTitle>
                <CardDescription>
                  Update your billing information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" placeholder="123 Main St" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="San Francisco" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" placeholder="California" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">Zip/Postal Code</Label>
                    <Input id="zip" placeholder="94103" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" placeholder="United States" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Address</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSavePassword}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Update Password</Button>
                </CardFooter>
              </form>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">SMS Authentication</div>
                      <div className="text-sm text-muted-foreground">
                        Receive a code via SMS to verify your identity
                      </div>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Authenticator App</div>
                      <div className="text-sm text-muted-foreground">
                        Use an authenticator app to generate verification codes
                      </div>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Choose which emails you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <input 
                      type="checkbox" 
                      id="billing" 
                      defaultChecked 
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <div className="space-y-1">
                      <label htmlFor="billing" className="font-medium">
                        Billing and Subscription Updates
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about payment confirmations, upcoming renewals, and plan changes
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <input 
                      type="checkbox" 
                      id="product" 
                      defaultChecked 
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <div className="space-y-1">
                      <label htmlFor="product" className="font-medium">
                        Product Updates
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Stay informed about new features, improvements, and changes to the platform
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <input 
                      type="checkbox" 
                      id="marketing" 
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <div className="space-y-1">
                      <label htmlFor="marketing" className="font-medium">
                        Marketing and Promotions
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Receive special offers, promotions, and marketing communications
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2023 Subscription Haven. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Need help? <a href="#" className="underline">Contact support</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Settings;
