
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "next-themes"
import Index from "./pages/Index"
import NotFound from "./pages/NotFound"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminReservations from "./pages/admin/AdminReservations"
import AdminOrders from "./pages/admin/AdminOrders"
import AdminClients from "./pages/admin/AdminClients"
import AdminNewsletter from "./pages/admin/AdminNewsletter"
import AdminMessages from "./pages/admin/AdminMessages"
import AdminVisitors from "./pages/admin/AdminVisitors"
import "./i18n"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/reservations" element={<AdminReservations />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/clients" element={<AdminClients />} />
              <Route path="/admin/newsletter" element={<AdminNewsletter />} />
              <Route path="/admin/messages" element={<AdminMessages />} />
              <Route path="/admin/visitors" element={<AdminVisitors />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
