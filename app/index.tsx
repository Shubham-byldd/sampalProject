import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "@/locales";

const LoadingScreen = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.loadingText}>{t("loading")}</Text>
    </View>
  );
};

const LanguageSwitcher = () => {
  const { t } = useTranslation();

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
    await AsyncStorage.setItem("user-language", lng);
  };

  return (
    <View style={styles.languageContainer}>
      <Button title={t("english")} onPress={() => changeLanguage("en")} />
      <Button title={t("spanish")} onPress={() => changeLanguage("es")} />
    </View>
  );
};

const AppContent = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>{t("welcome")}</Text>
      <Text style={styles.subtitle}>{t("change_language")}</Text>
      <LanguageSwitcher />
    </View>
  );
};

const OnboardScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      await i18n.init();
      setIsLoading(false);
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <AppContent />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  languageContainer: {
    flexDirection: "row",
    gap: 10,
  },
  loadingText: {
    marginTop: 10,
  },
});
//   return (
//     <View style={{ flex: 1, backgroundColor: "pink" }}>
//       <Pressable
//         onPress={() => {
//           router.push("/(auth)");
//         }}
//       >
//         <Text style={{ fontSize: 16, color: "black" }}>OnBorading Page</Text>
//       </Pressable>
//     </View>
//   );
// };

export default OnboardScreen;
