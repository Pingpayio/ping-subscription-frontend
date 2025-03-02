
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { subscriptionSDK } from '@/services/subscription-sdk';
import { WorkerStatus } from '@/types/subscription-sdk';

interface UserContextType {
  accountId: string | null;
  isLoading: boolean;
  workerStatus: WorkerStatus | null;
  refreshWorkerStatus: () => Promise<void>;
  registerWorker: () => Promise<boolean>;
}

const UserContext = createContext<UserContextType>({
  accountId: null,
  isLoading: true,
  workerStatus: null,
  refreshWorkerStatus: async () => {},
  registerWorker: async () => false,
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [accountId, setAccountId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [workerStatus, setWorkerStatus] = useState<WorkerStatus | null>(null);

  const refreshWorkerStatus = async () => {
    try {
      const status = await subscriptionSDK.getWorkerAccount();
      setWorkerStatus(status);
      if (status.accountId) {
        setAccountId(status.accountId);
      }
    } catch (error) {
      console.error('Error fetching worker status:', error);
    }
  };

  const registerWorker = async (): Promise<boolean> => {
    try {
      const success = await subscriptionSDK.registerWorker();
      if (success) {
        await refreshWorkerStatus();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error registering worker:', error);
      return false;
    }
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const address = await subscriptionSDK.getWorkerAddress();
        setAccountId(address);
        await refreshWorkerStatus();
      } catch (error) {
        console.error('Error initializing user context:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  return (
    <UserContext.Provider
      value={{
        accountId,
        isLoading,
        workerStatus,
        refreshWorkerStatus,
        registerWorker,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
