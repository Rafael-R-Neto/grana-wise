import { StyleSheet } from "react-native";
import { lightTheme } from "../../../../shared/theme";

type ThemeColors = typeof lightTheme;

export const styles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 24,
    },
    header: {
      alignItems: "center",
      marginBottom: 48,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: colors.text,
    },
    subtitle: {
      fontSize: 16,
      marginTop: 8,
      color: colors.textSecondary,
    },
    form: {
      gap: 20,
    },
    label: {
      marginBottom: 8,
      fontSize: 14,
      color: colors.textSecondary,
    },
    input: {
      height: 50,
      borderRadius: 8,
      paddingHorizontal: 16,
      borderWidth: 1,
      backgroundColor: colors.surface,
      color: colors.text,
      borderColor: colors.border,
    },
    forgotPassword: {
      textAlign: "right",
      marginTop: 8,
      color: colors.primary,
    },
    button: {
      height: 50,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 12,
      backgroundColor: colors.primary,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.white,
    },
    socialContainer: {
      marginTop: 48,
      alignItems: "center",
      gap: 16,
    },
    socialText: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    socialButtons: {
      flexDirection: "row",
      gap: 16,
    },
    socialButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    footer: {
      position: "absolute",
      bottom: 32,
      alignSelf: "center",
    },
  });
