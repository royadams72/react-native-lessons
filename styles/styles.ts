import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  albumRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#eeeeee",
  },
  badge: {
    padding: 6,
    backgroundColor: "#a8d8ff",
  },
  code: {
    color: "#e4e4e7",
    fontFamily: "monospace",
    fontSize: 14,
    lineHeight: 21,
  },
  codeBlock: {
    backgroundColor: "#18181b",
    borderColor: "#3f3f46",
    borderRadius: 10,
    borderWidth: 1,
    padding: 16,
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  copy: {
    fontSize: 17,
    color: "#ffffff",
    lineHeight: 27,
  },

  copyContainer: {
    gap: 16,
  },
  defaultColour: {
    color: "#aaaaaa",
  },
  listContent: {
    padding: 20,
    gap: 20,
  },
  pressed: {
    opacity: 0.6,
  },
  row: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#eeeeee",
  },
  selected: {
    backgroundColor: "#a8d8ff",
  },
  title: {
    flex: 1,
    fontSize: 18,
  },
});
