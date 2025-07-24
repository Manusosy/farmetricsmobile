import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Demographics from "./pages/auth/Demographics";
import Confirmation from "./pages/auth/Confirmation";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Farms from "./pages/Farms";
import FarmDetails from "./pages/FarmDetails";
import VisitDetails from "./pages/VisitDetails";
import AddFarmer from "./pages/AddFarmer";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import MyVisits from "./pages/MyVisits";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <div className="mobile-container">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/index" element={<Index />} />
              <Route path="/register" element={<Register />} />
              <Route path="/demographics" element={<Demographics />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/home" element={<Home />} />
              <Route path="/farms" element={<Farms />} />
              <Route path="/farms/:farmId" element={<FarmDetails />} />
              <Route path="/visits/:visitId" element={<VisitDetails />} />
              <Route path="/add-farmer" element={<AddFarmer />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/my-visits" element={<MyVisits />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;