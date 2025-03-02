import { Toaster } from "@/components/ui/sonner";
import Checkout from "@/pages/Checkout";
import Dashboard from "@/pages/Dashboard";
import Index from "@/pages/Index";
import MerchantDashboard from "@/pages/MerchantDashboard";
import NotFound from "@/pages/NotFound";
import Settings from "@/pages/Settings";
import Subscriptions from "@/pages/Subscriptions";
import { NetworkId } from "@near-wallet-selector/core";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { WalletSelectorProvider } from "@near-wallet-selector/react-hook";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "@near-wallet-selector/modal-ui/styles.css";

// Wallet selector configuration
const walletSelectorConfig = {
  network: "testnet" as NetworkId,
  modules: [setupMyNearWallet(), setupMeteorWallet(), setupHereWallet()],
};

function App() {
  return (
    <WalletSelectorProvider config={walletSelectorConfig}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/merchant-dashboard" element={<MerchantDashboard />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </WalletSelectorProvider>
  );
}

export default App;
