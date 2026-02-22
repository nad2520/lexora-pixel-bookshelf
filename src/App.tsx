import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { GameProvider } from "./context/GameContext";
import Index from "./pages/Index";
import BrowseBooks from "./pages/BrowseBooks";
import BookDetails from "./pages/BookDetails";
import Reader from "./pages/Reader";
import Rankings from "./pages/Rankings";
import Profile from "./pages/Profile";
import Treasury from "./pages/Treasury";
import NotFound from "./pages/NotFound";
import ScholarNotification from "@/components/ScholarNotification";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <GameProvider>
        <TooltipProvider>
          <ScholarNotification /> {/* Placed ScholarNotification here */}
          <Toaster />
          {/* Assuming SonnerToaster is a renamed Sonner or a different component.
              If it's a rename, the import should change. For now, I'll assume
              the user wants to use the Sonner component with these props,
              and the name 'SonnerToaster' in the snippet was a typo or
              internal reference. I'll use the imported 'Sonner' component. */}
          <Sonner position="bottom-right" theme="dark" />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/browse" element={<BrowseBooks />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="/reader/:id" element={<Reader />} />
              <Route path="/rankings" element={<Rankings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/treasury" element={<Treasury />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </GameProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
