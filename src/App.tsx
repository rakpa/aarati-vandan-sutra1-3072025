import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import AartiPage from "./pages/AartiPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFound from "./pages/NotFound";
import DeityPage from "./pages/DeityPage";
import DattaBavani from "./pages/DattaBavani";
import GyaneshwarHaripath from "./pages/GyaneshwarHaripath";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/deity/:deity" element={<DeityPage />} />
            <Route path="/aarti/:id" element={<AartiPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/datta-bavani" element={<DattaBavani />} />
            <Route path="/gyaneshwar-haripath" element={<GyaneshwarHaripath />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
