import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  "(tabs)": NavigatorScreenParams<TabsParamList>;
  "(auth)": NavigatorScreenParams<AuthStackParamList>;
  "(onboarding)": undefined;
};

export type TabsParamList = {
  index: undefined;
  explore: undefined;
  trades: undefined;
  profile: undefined;
};

export type AuthStackParamList = {
  login: undefined;
  register: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}