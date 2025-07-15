import { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  hasCompletedOnboarding: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  hasCompletedOnboarding: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  completeOnboarding: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  // In your AuthContext.tsx
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const [userData, onboardingCompleted] = await Promise.all([
          SecureStore.getItemAsync("user"),
          SecureStore.getItemAsync("onboarding_completed"),
        ]);

        // Important: Initialize hasCompletedOnboarding properly
        const completed = onboardingCompleted === "true";

        setUser(userData ? JSON.parse(userData) : null);
        setHasCompletedOnboarding(completed);

        // If onboarding not completed, ensure user is null
        if (!completed) {
          await SecureStore.deleteItemAsync("user");
          setUser(null);
        }
      } catch (error) {
        console.error("Error loading auth data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const login = async (email: string, password: string) => {
    const mockUser = { id: "1", email, name: "Test User" };
    await SecureStore.setItemAsync("user", JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const register = async (email: string, password: string, name: string) => {
    const newUser = { id: "2", email, name };
    await SecureStore.setItemAsync("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("user");
    setUser(null);
  };

  const completeOnboarding = async () => {
    await SecureStore.setItemAsync("onboarding_completed", "true");
    setHasCompletedOnboarding(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        hasCompletedOnboarding,
        login,
        register,
        logout,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
