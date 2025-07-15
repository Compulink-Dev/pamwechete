import { Redirect, Stack } from "expo-router";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

export default function OnboardingLayout() {
  const { hasCompletedOnboarding } = useAuth();

  if (hasCompletedOnboarding) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
