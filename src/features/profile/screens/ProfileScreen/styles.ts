import { StyleSheet } from "react-native";
import { lightTheme } from "../../../../shared/theme";

type ThemeColors = typeof lightTheme;

export const styles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {
      padding: 16,
      paddingBottom: 120,
      gap: 24,
    },
    profileHeader: {
      alignItems: "center",
      gap: 8,
      padding: 16,
    },
    avatar: {
      width: 96,
      height: 96,
      borderRadius: 48,
      borderWidth: 4,
      borderColor: colors.primary,
    },
    userName: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
    },
    userEmail: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    settingsSection: {
      gap: 12,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      paddingHorizontal: 4,
      color: colors.text,
    },
    settingItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 16,
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
      backgroundColor: colors.surface,
    },
    settingText: {
      fontWeight: "500",
      fontSize: 16,
      color: colors.text,
    },
    logoutSection: {
      paddingTop: 16,
    },
    logoutButton: {
      width: "100%",
      padding: 16,
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
      backgroundColor: `${colors.error}1A`,
    },
    logoutText: {
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 16,
      color: colors.error,
    },
  });
