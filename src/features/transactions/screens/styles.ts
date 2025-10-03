import { StyleSheet } from "react-native";
import { lightTheme } from "../../../shared/theme";

type ThemeColors = typeof lightTheme;

export const styles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    listContentContainer: {
      paddingBottom: 190,
    },
    emptyComponent: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 80,
    },
    fab: {
      position: "absolute",
      bottom: 116,
      right: 24,
      width: 56,
      height: 56,
      borderRadius: 28,
      alignItems: "center",
      justifyContent: "center",
      elevation: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      backgroundColor: colors.primary,
    },
    modalBackdrop: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
      padding: 16,
    },
    modalContent: {
      padding: 24,
      borderRadius: 8,
      width: "100%",
      maxWidth: 360,
      gap: 16,
      backgroundColor: colors.surface,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
    },
    typeSelectorContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    typeButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      borderWidth: 1,
      width: "45%",
      alignItems: "center",
    },
    formLabel: {
      fontSize: 14,
      fontWeight: "500",
      marginBottom: 4,
      color: colors.textSecondary,
    },
    textInput: {
      borderRadius: 6,
      padding: 12,
      fontSize: 16,
      backgroundColor: colors.background,
      color: colors.text,
    },
    categoryContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    categoryButton: {
      flexDirection: "row",
      alignItems: "center",
      padding: 8,
      borderRadius: 8,
      borderWidth: 1,
    },
    categoryColorDot: {
      width: 20,
      height: 20,
      borderRadius: 10,
      marginRight: 8,
    },
    categoryText: {
      fontWeight: "500",
    },
    formActions: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 16,
      marginTop: 16,
    },
    button: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 6,
    },
    cancelButton: {
      backgroundColor: colors.border,
    },
    saveButton: {
      backgroundColor: colors.primary,
    },
    fullItemContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
      marginVertical: 6,
      marginHorizontal: 16,
      backgroundColor: colors.surface,
    },
    itemIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    itemDetails: {
      marginLeft: 16,
      flex: 1,
    },
    itemDescription: {
      fontWeight: "600",
      color: colors.text,
    },
    itemCategory: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    itemAmountContainer: {
      alignItems: "flex-end",
    },
    itemAmount: {
      fontWeight: "bold",
    },
    itemActions: {
      marginLeft: 8,
      flexDirection: "column",
    },
    actionButton: {
      padding: 4,
    },
    actionText: {
      fontSize: 12,
    },
  });
