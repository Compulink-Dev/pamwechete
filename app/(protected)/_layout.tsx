import { AuthProvider, useAuth } from "../../contexts/AuthContext";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import ErrorBoundary from "../ErrorBoundary";

SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const { isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return <View style={{ flex: 1, backgroundColor: "#FFFFFF" }} />;
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <InitialLayout />
      </AuthProvider>
    </ErrorBoundary>
  );
}
