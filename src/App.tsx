
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WaterDashboard from "./pages/water-dashboard"; 
import ElectricityDashboard from "./pages/electricity-dashboard";
import ContractorTracker from "./pages/contractor-tracker";
import STPPlantDashboard from "./pages/stp-plant-dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/water-dashboard" element={<WaterDashboard />} />
          <Route path="/electricity-dashboard" element={<ElectricityDashboard />} />
          <Route path="/stp-plant-dashboard" element={<STPPlantDashboard />} />
          <Route path="/contractor-tracker" element={<ContractorTracker />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
