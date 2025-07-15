import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

export default function AuthLayout() {
  const { user, hasCompletedOnboarding } = useAuth();

  if (!hasCompletedOnboarding || user) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
