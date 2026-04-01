import React, { useEffect, useMemo, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useLanguage } from "../src/context/LanguageContext";
import { playVoiceForLanguage } from "../src/utils/playAudio";

// Home screen: simple input + big buttons (demo-ready).
export default function HomeScreen({ navigation, route }) {
  const { selectedLanguage, languageLabels } = useLanguage();
  const [inputText, setInputText] = useState("");

  const canAnalyze = useMemo(() => inputText.trim().length > 0, [inputText]);

  const onUploadPlaceholder = () => {
    // Placeholder: later you can connect Expo DocumentPicker / ImagePicker here.
    Alert.alert("Upload", "File upload is a placeholder for now.");
  };

  const onAnalyze = () => {
    // Pass the typed text forward for later API integration.
    navigation.navigate("Result", { language: languageLabels[selectedLanguage], inputText: inputText.trim() });
  };

  const onRepeatInstructions = () => {
    Alert.alert(
      "Instructions",
      "Demo: this would play audio instructions.\n\nStep 1: Paste message/OTP/link.\nStep 2: Press Analyze."
    );
  };

  const onChangeLanguage = () => {
    // Go back to LanguageScreen so the user can pick again.
    navigation.navigate("Language");
  };

  useEffect(() => {
    const cancelRef = { cancelled: false };
    playVoiceForLanguage(selectedLanguage, cancelRef);
    return () => {
      cancelRef.cancelled = true;
    };
  }, [selectedLanguage]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Kavacha</Text>
        <Text style={styles.subtitle}>Selected language: {languageLabels[selectedLanguage]}</Text>

        <TouchableOpacity
          style={styles.changeLanguageButton}
          onPress={onChangeLanguage}
          accessibilityRole="button"
          accessibilityLabel="Change language"
        >
          <Text style={styles.changeLanguageButtonText}>Change Language</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>What to do</Text>
          <Text style={styles.cardSubtitle}>
            Paste or type the suspicious message, OTP, or link below. Then press Analyze.
          </Text>
        </View>

        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>Suspicious text / OTP / link</Text>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Example: Your OTP is 123456 / http://unknown-link ..."
            placeholderTextColor="#6B7280"
            multiline
            textAlignVertical="top"
            style={styles.textInput}
            accessibilityLabel="Suspicious message input"
          />
        </View>

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={onUploadPlaceholder}
          accessibilityRole="button"
          accessibilityLabel="Upload file placeholder"
        >
          <Text style={styles.uploadButtonText}>Upload File (Placeholder)</Text>
          <Text style={styles.uploadButtonHint}>Later: upload screenshot / PDF / image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.primaryButton, !canAnalyze && styles.primaryButtonDisabled]}
          onPress={onAnalyze}
          disabled={!canAnalyze}
          accessibilityRole="button"
          accessibilityLabel="Analyze text"
        >
          <Text style={styles.primaryButtonText}>Analyze</Text>
          <Text style={styles.buttonHint}>Demo: send input to API later</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.repeatButton}
          onPress={onRepeatInstructions}
          accessibilityRole="button"
          accessibilityLabel="Repeat instructions"
        >
          <Text style={styles.repeatButtonText}>Press 0 to hear instructions again</Text>
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
    fontSize: 30,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#374151",
    textAlign: "center",
    marginBottom: 14,
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
    marginBottom: 12,
  },
  changeLanguageButtonText: {
    color: "#0B5FFF",
    fontSize: 14,
    fontWeight: "900",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  inputCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },
  textInput: {
    minHeight: 140,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
    lineHeight: 22,
  },
  uploadButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: "#111827",
    marginTop: 4,
  },
  uploadButtonText: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 6,
  },
  uploadButtonHint: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "600",
  },
  primaryButton: {
    backgroundColor: "#0B5FFF",
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  primaryButtonDisabled: {
    opacity: 0.55,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 6,
  },
  buttonHint: {
    color: "#EAF2FF",
    fontSize: 13,
    fontWeight: "600",
  },
  repeatButton: {
    backgroundColor: "#111827",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 14,
  },
  repeatButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },
});

