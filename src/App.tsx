
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Checkout from "@/pages/Checkout";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import { Toaster } from "@/components/ui/sonner";
import MerchantDashboard from "@/pages/MerchantDashboard";
import Subscriptions from "@/pages/Subscriptions";

function App() {
  return (
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
  );
}

export default App;
