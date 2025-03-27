
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "./context/SidebarContext";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Bookings from "./pages/Bookings";
import Users from "./pages/Users";
import Reviews from "./pages/Reviews";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import Documentation from "./pages/Documentation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <SidebarProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
              <Route path="/properties" element={<PrivateRoute element={<Properties />} />} />
              <Route path="/properties/:id" element={<PrivateRoute element={<PropertyDetails />} />} />
              <Route path="/bookings" element={<PrivateRoute element={<Bookings />} />} />
              <Route path="/users" element={<PrivateRoute element={<Users />} />} />
              <Route path="/reviews" element={<PrivateRoute element={<Reviews />} />} />
              <Route path="/messages" element={<PrivateRoute element={<Messages />} />} />
              <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SidebarProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
