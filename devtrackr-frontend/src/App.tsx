import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/ThemeProvider";
import { LandingPage } from "./components/LandingPage";
import { AuthForm } from "./components/AuthForm";
import { Dashboard } from "./components/Dashboard";
import { getCurrentUser, signOut } from "./lib/auth";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
};

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState<
    "landing" | "auth" | "dashboard"
  >("landing");
  const [user, setUser] = useState<{
    name?: string;
    email: string;
    githubUsername?: string;
  } | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Check authentication state on initial load
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setCurrentPage("dashboard");
    } else if (location.pathname === "/dashboard") {
      setCurrentPage("auth");
    }
  }, [location.pathname]);

  const handleAuth = (userData: {
    name?: string;
    email: string;
    githubUsername?: string;
  }) => {
    setUser(userData);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    signOut();
    setUser(null);
    setCurrentPage("landing");
  };

  const handleGetStarted = () => {
    setCurrentPage("auth");
  };

  const handleBackToLanding = () => {
    setCurrentPage("landing");
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onGetStarted={handleGetStarted} />;
      case "auth":
        return (
          <AuthForm onAuth={handleAuth} onBackToLanding={handleBackToLanding} />
        );
      case "dashboard":
        return <Dashboard user={user!} onLogout={handleLogout} />;
      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  return renderCurrentPage();
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Router>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<AppContent />} />
              <Route path="/auth" element={<AppContent />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <AppContent />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
