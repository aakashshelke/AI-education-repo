import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    // First set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          const userData = {
            id: session.user.id,
            name: session.user.user_metadata.full_name || session.user.user_metadata.name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            image: session.user.user_metadata.avatar_url || session.user.user_metadata.picture,
          };
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
        setIsLoading(false);
      }
    );

    // Then check for existing session
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const userName = session.user.user_metadata.full_name ||
                         session.user.user_metadata.name ||
                         session.user.email?.split('@')[0] ||
                         'User';
    
        try {
          await supabase.from("profiles").upsert({
            id: session.user.id,
            name: userName
          });
        } catch (e) {
          console.error("Error saving user to profiles table:", e);
        }
    
        const userData = {
          id: session.user.id,
          name: userName,
          email: session.user.email || '',
          image: session.user.user_metadata.avatar_url || session.user.user_metadata.picture,
        };
    
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }
      setIsLoading(false);
    })();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Google login function
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/home',
        }
      });

      if (error) {
        throw error;
      }

      // No need to setUser here as the onAuthStateChange listener will handle that
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Failed to log in with Google");
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      localStorage.removeItem("user");
      toast.success("Successfully logged out");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    loginWithGoogle,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

