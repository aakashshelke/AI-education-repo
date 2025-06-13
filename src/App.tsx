
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { NavbarProvider } from "@/components/navbar-provider";
import { AuthProvider } from "@/context/auth-context";
import LandingPage from "@/pages/LandingPage";
import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import CanvasPage from "@/pages/CanvasPage";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import LoginPage from "@/pages/LoginPage"; 

// Create a client
const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <ThemeProvider defaultTheme="light">
//       <AuthProvider>
//         <TooltipProvider>
//           <NavbarProvider>
//             <Toaster />
//             <Sonner position="top-center" />
//             <BrowserRouter>
//               <Routes>
//                 <Route path="/" element={<LandingPage />} />
//                 <Route path="/login" element={<LoginPage />} />
//                 <Route element={<Layout />}>
//                   <Route path="/home" element={<HomePage />} />
//                   <Route path="/profile" element={<ProfilePage />} />
//                   <Route path="/canvas/:id" element={<CanvasPage />} />
//                   <Route path="*" element={<NotFound />} />
//                 </Route>
//               </Routes>
//             </BrowserRouter>
//           </NavbarProvider>
//         </TooltipProvider>
//       </AuthProvider>
//     </ThemeProvider>
//   </QueryClientProvider>
// );

// export default App;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <TooltipProvider>
          <NavbarProvider>
            <Toaster />
            <Sonner position="top-center" />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route element={<Layout />}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/mycanvases" element={<ProfilePage />} />
                  <Route path="/canvas/:id" element={<CanvasPage />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </NavbarProvider>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;