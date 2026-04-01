import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Language selection screen (simple + demo-ready).
export default function LanguageScreen({ navigation }) {
  const onSelectLanguage = (language) => {
    // Pass the chosen language to HomeScreen.
    navigation.replace("Home", { language });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Kavacha</Text>
        <Text style={styles.subtitle}>Select your language</Text>

        <View style={styles.list}>
          <LanguageButton number={1} label="Kannada" onPress={() => onSelectLanguage("Kannada")} />
          <LanguageButton number={2} label="Hindi" onPress={() => onSelectLanguage("Hindi")} />
          <LanguageButton number={3} label="Telugu" onPress={() => onSelectLanguage("Telugu")} />
          <LanguageButton number={4} label="Tamil" onPress={() => onSelectLanguage("Tamil")} />
          <LanguageButton number={5} label="English" onPress={() => onSelectLanguage("English")} />
        </View>

        <Text style={styles.note}>
          Tip: Tap a language to continue to the home screen.
        </Text>
      </View>
    </SafeAreaView>
  );
}

function LanguageButton({ number, label, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={`Select ${label}`}
    >
      <View style={styles.buttonRow}>
        <View style={styles.numberBadge}>
          <Text style={styles.numberText}>{number}</Text>
        </View>
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    </TouchableOpacity>
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
    fontSize: 32,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
    textAlign: "center",
    marginBottom: 18,
  },
  list: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  button: {
    backgroundColor: "#0B5FFF",
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  numberBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.22)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  numberText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  buttonText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
  },
  note: {
    marginTop: 14,
    textAlign: "center",
    color: "#6B7280",
    fontSize: 13,
  },
});

