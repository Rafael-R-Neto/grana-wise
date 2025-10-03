import { StyleSheet } from "react-native";
import { lightTheme } from "../../../shared/theme";

type ThemeColors = typeof lightTheme;

export const styles = (colors: ThemeColors) =>
  StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentPadding: {
      paddingHorizontal: 16,
    },
    monthNavContainer: {
      paddingVertical: 8,
    },
    monthNavScroll: {
      paddingHorizontal: 16,
      alignItems: "center",
    },
    monthButton: {
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    monthText: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    monthTextSelected: {
      color: colors.primary,
      fontWeight: "bold",
    },
    categoryFilterContainer: {
      marginTop: 24,
      marginBottom: 8,
    },
    categoryFilterScroll: {
      paddingHorizontal: 4,
      alignItems: "flex-start",
    },
    categoryFilterButton: {
      alignItems: "center",
      width: 80,
      paddingHorizontal: 4,
    },
    categoryFilterIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 8,
    },
    categoryFilterText: {
      fontSize: 12,
      textAlign: "center",
      color: colors.textSecondary,
    },
    categoryFilterTextSelected: {
      color: colors.primary,
      fontWeight: "bold",
    },
    chartContainer: {
      borderRadius: 16,
      padding: 24,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
      backgroundColor: colors.surface,
    },
    chartSvgContainer: {
      position: "relative",
      width: 192,
      height: 192,
    },
    chartTextContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
    },
    chartLabel: {
      fontSize: 14,
      textTransform: "uppercase",
      color: colors.textSecondary,
    },
    chartBalance: {
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 4,
      color: colors.text,
    },
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
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
    itemDate: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    transactionsListContainer: {
      marginTop: 24,
      paddingBottom: 120,
    },
    transactionsListTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
      color: colors.text,
    },
    emptyListContainer: {
      alignItems: "center",
      justifyContent: "center",
      padding: 32,
    },
  });
