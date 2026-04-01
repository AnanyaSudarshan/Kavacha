import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LanguageScreen from "./screens/LanguageScreen";
import HomeScreen from "./screens/HomeScreen";
import ResultScreen from "./screens/ResultScreen";
import EmergencyScreen from "./screens/EmergencyScreen";
import EmergencyButton from "./components/EmergencyButton";

// Simple stack navigation for a beginner-friendly starter app.
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />

      <Stack.Navigator
        initialRouteName="Language"
        screenOptions={({ navigation }) => ({
          headerTitleAlign: "center",
          // Show the emergency button on the top-right for quick access.
          headerRight: () => <EmergencyButton navigation={navigation} />,
        })}
      >
        <Stack.Screen
          name="Language"
          component={LanguageScreen}
          options={{ title: "Kavacha" }}
        />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ title: "Result" }}
        />
        <Stack.Screen
          name="Emergency"
          component={EmergencyScreen}
          options={{ title: "Emergency" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

