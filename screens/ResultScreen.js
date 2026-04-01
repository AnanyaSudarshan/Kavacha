import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Placeholder screen that will later show the "safety result" / recommendations.
export default function ResultScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Result</Text>
        <Text style={styles.subtitle}>Placeholder: your safety summary will appear here.</Text>

        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>Current Status</Text>
          <Text style={styles.resultValue}>SAFE (Demo)</Text>
          <Text style={styles.resultHint}>
            Later: show risk level, nearby help, and simple next steps.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Home")}
          accessibilityRole="button"
          accessibilityLabel="Back to home"
        >
          <Text style={styles.primaryButtonText}>Back to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("Emergency")}
          accessibilityRole="button"
          accessibilityLabel="Open emergency"
        >
          <Text style={styles.secondaryButtonText}>Need Help Now (Emergency)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#374151",
    textAlign: "center",
    marginBottom: 16,
  },
  resultBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 26,
    fontWeight: "900",
    color: "#2E7D32",
    marginBottom: 8,
  },
  resultHint: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: "#0B5FFF",
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#D32F2F",
  },
  secondaryButtonText: {
    color: "#B91C1C",
    fontSize: 16,
    fontWeight: "900",
  },
});

