import React from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Placeholder emergency screen (later: call, SMS, share live location, etc).
export default function EmergencyScreen({ navigation }) {
  const onCall = () => {
    // Placeholder action: show an alert instead of placing a real call.
    Alert.alert("Emergency Call", "This is a placeholder. Later we can call 112/100.");
  };

  const onShareLocation = () => {
    Alert.alert("Share Location", "Placeholder: later we will share live location.");
  };

  const onTrustedContacts = () => {
    Alert.alert("Trusted Contacts", "Placeholder: later we will manage contacts.");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.headerBox}>
          <Text style={styles.title}>Emergency</Text>
          <Text style={styles.subtitle}>
            If you are in danger, use these options. (Placeholder screen)
          </Text>
        </View>

        <TouchableOpacity style={styles.dangerButton} onPress={onCall}>
          <Text style={styles.dangerButtonText}>CALL EMERGENCY</Text>
          <Text style={styles.dangerHint}>Example: 112 / police / ambulance</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onShareLocation}>
          <Text style={styles.actionButtonText}>Share My Location</Text>
          <Text style={styles.actionHint}>Send location to trusted contacts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onTrustedContacts}>
          <Text style={styles.actionButtonText}>Trusted Contacts</Text>
          <Text style={styles.actionHint}>Add or edit emergency contacts</Text>
        </TouchableOpacity>

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
    justifyContent: "center",
  },
  headerBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FECACA",
    marginBottom: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#7F1D1D",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#7F1D1D",
    textAlign: "center",
    lineHeight: 20,
  },
  dangerButton: {
    backgroundColor: "#D32F2F",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  dangerButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 6,
  },
  dangerHint: {
    color: "#FFE4E6",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },
  actionButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#FECACA",
    marginBottom: 12,
  },
  actionButtonText: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 6,
    textAlign: "center",
  },
  actionHint: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
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

