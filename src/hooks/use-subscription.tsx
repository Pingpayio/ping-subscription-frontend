
import { useState, useEffect, useCallback } from 'react';
import { subscriptionSDK } from '@/services/subscription-sdk';
import { Subscription, SubscriptionStatus } from '@/types/subscription-sdk';
import { toast } from 'sonner';

export const useSubscription = (userId?: string) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [activeSubscription, setActiveSubscription] = useState<Subscription | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscriptions = useCallback(async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const result = await subscriptionSDK.getUserSubscriptions(userId);
      setSubscriptions(result.subscriptions || []);
      
      // Find active subscription
      const active = result.subscriptions.find(sub => 
        sub.status === SubscriptionStatus.ACTIVE
      );
      setActiveSubscription(active);
    } catch (err) {
      console.error('Error fetching subscriptions:', err);
      setError('Failed to load subscriptions. Please try again later.');
      toast.error('Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const pauseSubscription = useCallback(async (subscriptionId: string) => {
    try {
      const result = await subscriptionSDK.pauseSubscription(subscriptionId);
      if (result.success) {
        toast.success(result.message || 'Subscription paused successfully');
        await fetchSubscriptions();
        return true;
      } else {
        toast.error(result.message || 'Failed to pause subscription');
        return false;
      }
    } catch (err) {
      console.error('Error pausing subscription:', err);
      toast.error('An error occurred while pausing the subscription');
      return false;
    }
  }, [fetchSubscriptions]);

  const resumeSubscription = useCallback(async (subscriptionId: string) => {
    try {
      const result = await subscriptionSDK.resumeSubscription(subscriptionId);
      if (result.success) {
        toast.success(result.message || 'Subscription resumed successfully');
        await fetchSubscriptions();
        return true;
      } else {
        toast.error(result.message || 'Failed to resume subscription');
        return false;
      }
    } catch (err) {
      console.error('Error resuming subscription:', err);
      toast.error('An error occurred while resuming the subscription');
      return false;
    }
  }, [fetchSubscriptions]);

  const cancelSubscription = useCallback(async (subscriptionId: string) => {
    try {
      const result = await subscriptionSDK.cancelSubscription(subscriptionId);
      if (result.success) {
        toast.success(result.message || 'Subscription canceled successfully');
        await fetchSubscriptions();
        return true;
      } else {
        toast.error(result.message || 'Failed to cancel subscription');
        return false;
      }
    } catch (err) {
      console.error('Error canceling subscription:', err);
      toast.error('An error occurred while canceling the subscription');
      return false;
    }
  }, [fetchSubscriptions]);

  useEffect(() => {
    if (userId) {
      fetchSubscriptions();
    }
  }, [userId, fetchSubscriptions]);

  return {
    subscriptions,
    activeSubscription,
    loading,
    error,
    refetch: fetchSubscriptions,
    pauseSubscription,
    resumeSubscription,
    cancelSubscription
  };
};
