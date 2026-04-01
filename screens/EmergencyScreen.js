import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import contacts from "../data/contacts";

// Placeholder emergency screen (later: call, SMS, share live location, etc).
export default function EmergencyScreen({ navigation, riskLevel = "none" }) {
  // --- Risk-based content (data + UI) ---
  // Pick one contact per type from the static dataset.
  const policeContact = contacts.find((c) => c.type === "police");
  const consultancyContact = contacts.find((c) => c.type === "consultancy");

  const riskConfig = {
    high: {
      cardStyle: [styles.riskCard, styles.riskCardHigh],
      title: "High risk",
      subtitle: "Call for help and move to a safer place if you can.",
      contact: policeContact,
      steps: [
        "Call emergency now and speak clearly.",
        "Go to a well-lit/public area and stay with others.",
        "Share your location with a trusted person.",
      ],
    },
    moderate: {
      cardStyle: [styles.riskCard, styles.riskCardModerate],
      title: "Moderate risk",
      subtitle: "Get support and have a quick safety plan ready.",
      contact: consultancyContact,
      steps: [
        "Call a helpline for guidance and support.",
        "Tell a trusted person where you are.",
        "Keep your phone charged and stay alert.",
      ],
    },
    none: {
      cardStyle: [styles.riskCard, styles.riskCardNone],
      title: "No immediate risk",
      subtitle: "You’re currently marked as safe.",
      contact: null,
      steps: [],
    },
  };

  const currentRisk = riskConfig[riskLevel] ?? riskConfig.none;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Risk card section (changes based on `riskLevel` prop) */}
        <View style={currentRisk.cardStyle}>
          <Text style={styles.riskTitle}>{currentRisk.title}</Text>
          <Text style={styles.riskSubtitle}>{currentRisk.subtitle}</Text>

          {/* Contact section (shown only for high/moderate) */}
          {currentRisk.contact ? (
            <View style={styles.riskContactBox}>
              <Text style={styles.riskSectionLabel}>Suggested contact</Text>
              <Text style={styles.riskContactName}>{currentRisk.contact.name}</Text>
              <Text style={styles.riskContactPhone}>{currentRisk.contact.phone}</Text>
              <Text style={styles.riskContactDescription}>
                {currentRisk.contact.description}
              </Text>
            </View>
          ) : null}

          {/* Next steps section (numbered list, max 3) */}
          {currentRisk.steps.length > 0 ? (
            <View style={styles.riskStepsBox}>
              <Text style={styles.riskSectionLabel}>Next steps</Text>
              {currentRisk.steps.slice(0, 3).map((step, idx) => (
                <Text key={`${riskLevel}-step-${idx}`} style={styles.riskStepText}>
                  {idx + 1}. {step}
                </Text>
              ))}
            </View>
          ) : (
            <Text style={styles.riskSafeNote}>
              Keep your trusted contacts updated and stay aware of your surroundings.
            </Text>
          )}
        </View>

        {/* Bottom navigation button (existing) */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFF7F7",
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 16,
    justifyContent: "flex-start",
  },
  riskCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  riskCardHigh: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FCA5A5",
  },
  riskCardModerate: {
    backgroundColor: "#FFFBEB",
    borderColor: "#FCD34D",
  },
  riskCardNone: {
    backgroundColor: "#ECFDF5",
    borderColor: "#6EE7B7",
  },
  riskTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 6,
  },
  riskSubtitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    lineHeight: 22,
    marginBottom: 10,
  },
  riskSectionLabel: {
    fontSize: 14,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 6,
  },
  riskContactBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 10,
  },
  riskContactName: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 2,
  },
  riskContactPhone: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 4,
  },
  riskContactDescription: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4B5563",
    lineHeight: 18,
  },
  riskStepsBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  riskStepText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    lineHeight: 22,
    marginBottom: 6,
  },
  riskSafeNote: {
    fontSize: 14,
    fontWeight: "700",
    color: "#065F46",
    lineHeight: 20,
  },
  backButton: {
    backgroundColor: "#111827",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 4,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});

