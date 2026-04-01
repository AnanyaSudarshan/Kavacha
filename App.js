import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LanguageScreen from "./screens/LanguageScreen";
import HomeScreen from "./screens/HomeScreen";
import ResultScreen from "./screens/ResultScreen";
import EmergencyScreen from "./screens/EmergencyScreen";
import EmergencyButton from "./components/EmergencyButton";

const Stack = createNativeStackNavigator();

// Auto detect button — placeholder for now, later will read clipboard or scan image
function AutoDetectButton() {
  const onAutoDetect = () => {
    Alert.alert("Auto Detect", "Placeholder: later this will auto-read clipboard or scan image.");
  };

  return (
    <TouchableOpacity
      onPress={onAutoDetect}
      style={{
        backgroundColor: "#059669",
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 8,
        minWidth: 52,
        alignItems: "center",
        justifyContent: "center",
      }}
      accessibilityRole="button"
      accessibilityLabel="Auto detect"
    >
      <Text style={{ color: "#FFFFFF", fontWeight: "800", fontSize: 13 }}>Auto</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />

      <Stack.Navigator
        initialRouteName="Language"
        screenOptions={({ navigation }) => ({
          headerTitleAlign: "center",
          // Show SOS button on all screens by default
          headerRight: () => <EmergencyButton navigation={navigation} />,
        })}
      >
        <Stack.Screen
          name="Language"
          component={LanguageScreen}
          options={{ title: "Kavacha" }}
        />

        {/* Home screen — Auto + SOS both in header */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "Home",
            headerRight: () => (
              <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                {/* Auto detect — left of SOS */}
                <AutoDetectButton />
                {/* SOS — far right */}
                <EmergencyButton navigation={navigation} />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ title: "Result" }}
        />

        {/* Emergency screen — SOS hidden since we are already here */}
        <Stack.Screen
          name="Emergency"
          component={EmergencyScreen}
          options={{ title: "Emergency", headerRight: null }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}