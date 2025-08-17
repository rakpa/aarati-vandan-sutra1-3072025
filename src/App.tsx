import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import AartiPage from "./pages/AartiPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFound from "./pages/NotFound";
import DeityPage from "./pages/DeityPage";
import DattaBavani from "./pages/DattaBavani";
import GyaneshwarHaripath from "./pages/GyaneshwarHaripath";

const queryClient = new QueryClient();

const Router = Capacitor.isNativePlatform() ? HashRouter : BrowserRouter;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/deity/:deity" element={<DeityPage />} />
            <Route path="/aarti/:id" element={<AartiPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/datta-bavani" element={<DattaBavani />} />
            <Route path="/gyaneshwar-haripath" element={<GyaneshwarHaripath />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
