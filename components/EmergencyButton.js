import React from "react";
import { Alert, Pressable, StyleSheet, Text } from "react-native";

/**
 * A small emergency button that sits in the top-right header area.
 * We keep it visible on every screen so users can quickly reach help.
 */
export default function EmergencyButton({ navigation }) {
  const goToEmergency = () => {
    // TODO: Remove test params when backend is ready
    navigation.navigate("Emergency");
  };

  const onLongPress = () => {
    // Beginner-friendly placeholder: show a message for long press.
    Alert.alert("Emergency", "Opening emergency screen...");
    goToEmergency();
  };

  return (
    <Pressable
      onPress={goToEmergency}
      onLongPress={onLongPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel="Emergency"
      accessibilityHint="Opens the emergency screen"
      hitSlop={10}
    >
      <Text style={styles.text}>SOS</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#D32F2F",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.85,
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});

