import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Linking, Alert } from "react-native";
import contacts from "../data/contacts";

// MOCK TEST (paste into navigation call to test):
// navigation.navigate("Emergency", {
//   risk_level: "high",
//   contact_details: { name: "Police Control Room", phone: "100", description: "24/7 emergency" },
//   next_steps: ["Call 112 immediately and stay on the line.", "Move to a crowded or well-lit place nearby.", "Tell someone you trust where you are right now.", "Do not share any money or OTP with anyone."]
// })

export default function EmergencyScreen({ navigation, route }) {

  // Read risk data from route.params (mock for now, real API later)
  const {
    risk_level = "none",
    contact_details = null,
    next_steps = [],
  } = route?.params ?? {};

  // TODO: Replace above with real API call when backend is ready.
  // Example:
  // const response = await fetch("https://your-api.com/risk?user_id=123");
  // const { risk_level, contact_details, next_steps } = await response.json();

  // Fallback contacts from local data if no contact_details passed via params
  const policeContact = contact_details ?? contacts.find((c) => c.type === "police");
  const consultancyContact = contact_details ?? contacts.find((c) => c.type === "consultancy");

  // Call handler — opens phone dialer with the contact's number
  const onCall = (phone) => {
    const phoneUrl = `tel:${phone}`;
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phoneUrl);
        } else {
          Alert.alert("Error", "Phone calls are not supported on this device.");
        }
      })
      .catch(() => {
        Alert.alert("Error", "Something went wrong. Please try again.");
      });
  };

  // Risk configuration — defines card style, title, subtitle, contact, steps
  const riskConfig = {
    high: {
      cardStyle: [styles.riskCard, styles.riskCardHigh],
      callButtonStyle: styles.callButtonHigh,
      title: "⚠️ High Risk",
      subtitle: "You may be in danger. Act immediately.",
      contact: policeContact,
      steps: next_steps.length > 0 ? next_steps : [
        "Call 112 immediately and stay on the line.",
        "Move to a crowded or well-lit place nearby.",
        "Tell someone you trust where you are right now.",
        "Do not share any money or OTP with anyone.",
      ],
    },
    moderate: {
      cardStyle: [styles.riskCard, styles.riskCardModerate],
      callButtonStyle: styles.callButtonModerate,
      title: "⚡ Moderate Risk",
      subtitle: "Something suspicious was detected. Stay alert.",
      contact: consultancyContact,
      steps: next_steps.length > 0 ? next_steps : [
        "Call helpline 181 and explain what happened.",
        "Stop all calls or messages from unknown numbers.",
        "Tell a family member or friend about the situation.",
        "Save all proof — screenshots, call logs, messages.",
      ],
    },
    none: {
      cardStyle: [styles.riskCard, styles.riskCardNone],
      callButtonStyle: null,
      title: "✅ No Immediate Risk",
      subtitle: "Your phone and data are safe right now.",
      contact: null,
      steps: [],
    },
  };

  // Pick the right config, fallback to "none" if unknown value
  const currentRisk = riskConfig[risk_level] ?? riskConfig.none;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        {/* Risk card — changes color and content based on risk_level */}
        <View style={currentRisk.cardStyle}>
          <Text style={styles.riskTitle}>{currentRisk.title}</Text>
          <Text style={styles.riskSubtitle}>{currentRisk.subtitle}</Text>

          {/* Contact box — shown only for high and moderate risk */}
          {currentRisk.contact ? (
            <View style={styles.riskContactBox}>
              <Text style={styles.riskSectionLabel}>Suggested contact</Text>
              <Text style={styles.riskContactName}>{currentRisk.contact.name}</Text>
              <Text style={styles.riskContactPhone}>{currentRisk.contact.phone}</Text>
              <Text style={styles.riskContactDescription}>
                {currentRisk.contact.description}
              </Text>

              {/* Call button — dials the contact number directly */}
              <TouchableOpacity
                style={[styles.callButton, currentRisk.callButtonStyle]}
                onPress={() => onCall(currentRisk.contact.phone)}
                accessibilityRole="button"
                accessibilityLabel={`Call ${currentRisk.contact.name}`}
              >
                <Text style={styles.callButtonText}>
                  📞 Call {currentRisk.contact.phone}
                </Text>
              </TouchableOpacity>

            </View>
          ) : null}

          {/* Next steps — numbered list, max 4 */}
          {currentRisk.steps.length > 0 ? (
            <View style={styles.riskStepsBox}>
              <Text style={styles.riskSectionLabel}>Next steps</Text>
              {currentRisk.steps.slice(0, 4).map((step, idx) => (
                <Text key={`${risk_level}-step-${idx}`} style={styles.riskStepText}>
                  {idx + 1}. {step}
                </Text>
              ))}
            </View>
          ) : (
            // Shown only for "none" risk
            <Text style={styles.riskSafeNote}>
              Never share OTP or bank details with anyone. If something feels wrong, press SOS immediately.
            </Text>
          )}
        </View>

        {/* Back to Home button */}
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
    marginBottom: 10,
  },
  // Call button — red for high risk
  callButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 4,
  },
  callButtonHigh: {
    backgroundColor: "#D32F2F",
  },
  // Call button — yellow/dark for moderate risk
  callButtonModerate: {
    backgroundColor: "#B45309",
  },
  callButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
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