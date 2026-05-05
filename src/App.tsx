import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Machines from "./pages/Machines";
import MachineDetail from "./pages/MachineDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Quiz from "./pages/Quiz";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Legal from "./pages/Legal";
import ResourcePage from "./pages/ResourcePage";
import Blog from "./pages/Blog";
import BlogPostPage from "./pages/BlogPost";
import ReviewsPage from "./pages/Reviews";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import TrackOrder from "./pages/TrackOrder";
import Admin from "./pages/Admin";
import { CartProvider } from "./hooks/useCart";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/machines" element={<Machines />} />
          <Route path="/machines/:slug" element={<MachineDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/legal/:page" element={<Legal />} />
          <Route path="/training-videos" element={<ResourcePage slug="training-videos" />} />
          <Route path="/technical-support" element={<ResourcePage slug="technical-support" />} />
          <Route path="/affiliates" element={<ResourcePage slug="affiliates" />} />
          <Route path="/parts-service" element={<ResourcePage slug="parts-service" />} />
          <Route path="/warranty-registration" element={<ResourcePage slug="warranty-registration" />} />
          <Route path="/manuals" element={<ResourcePage slug="manuals" />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
