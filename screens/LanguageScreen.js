import React, { useEffect } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLanguage } from "../src/context/LanguageContext";
import { playLanguageSelection } from "../src/utils/playAudio";

// Language selection screen (simple + demo-ready).
export default function LanguageScreen({ navigation }) {
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const onSelectLanguage = (language) => {
    setSelectedLanguage(language);
    navigation.navigate("Home");
  };

  const onRepeatInstructions = () => {
    Alert.alert(
      "Instructions",
      "Step 1: Select your language.\nStep 2: On Home, paste message/OTP/link.\nStep 3: Press Analyze."
    );
  };

  useEffect(() => {
    const cancelRef = { cancelled: false };
    const startPlayback = async () => {
      // Small delay helps ensure screen is mounted before playback starts.
      await new Promise((resolve) => setTimeout(resolve, 150));
      await playLanguageSelection(cancelRef);
    };
    startPlayback();
    return () => {
      cancelRef.cancelled = true;
    };
  }, []);

  const changeLanguageLabel = {
    kannada: "ಭಾಷೆ ಬದಲಿಸಿ",
    hindi: "भाषा बदलें",
    telugu: "భాష మార్చండి",
    tamil: "மொழி மாற்று",
    english: "Change Language",
  };

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity
        style={styles.repeatButtonTopLeft}
        onPress={onRepeatInstructions}
        accessibilityRole="button"
        accessibilityLabel="Repeat instructions"
      >
        <Text style={styles.repeatButtonTopLeftText}>Press 0</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.title}>Kavacha</Text>
        <Text style={styles.subtitle}>Select your language</Text>

        <View style={styles.list}>
          <LanguageButton number={1} label="Kannada" onPress={() => onSelectLanguage("kannada")} />
          <LanguageButton number={2} label="Hindi" onPress={() => onSelectLanguage("hindi")} />
          <LanguageButton number={3} label="Telugu" onPress={() => onSelectLanguage("telugu")} />
          <LanguageButton number={4} label="Tamil" onPress={() => onSelectLanguage("tamil")} />
          <LanguageButton number={5} label="English" onPress={() => onSelectLanguage("english")} />
        </View>

        <Text style={styles.note}>
          Tip: Tap a language to continue to the home screen.
        </Text>
        <TouchableOpacity
          style={styles.changeLanguageButton}
          onPress={() => {
            const cancelRef = { cancelled: false };
            playLanguageSelection(cancelRef);
          }}
          accessibilityRole="button"
          accessibilityLabel="Change language"
        >
          <Text style={styles.changeLanguageButtonText}>
            {changeLanguageLabel[selectedLanguage]}
          </Text>
        </TouchableOpacity>
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
  changeLanguageButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#0B5FFF",
    marginTop: 12,
  },
  changeLanguageButtonText: {
    color: "#0B5FFF",
    fontSize: 14,
    fontWeight: "900",
  },
  repeatButtonTopLeft: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
    backgroundColor: "#111827",
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  repeatButtonTopLeftText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },
});

