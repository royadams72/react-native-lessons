import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <ThemedView style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 50 }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">React Practice App</ThemedText>
      </ThemedView>
      <ThemedText type="subtitle">Lessons:</ThemedText>
      <ThemedView style={styles.stepContainer}>
        <Link href="/lessons/FlatList">
          <ThemedText type="link">FlatMap</ThemedText>
        </Link>
        <Link href="/lessons/Pressable">
          <ThemedText type="link">Pressable</ThemedText>
        </Link>
        <Link href="/lessons/FlexBox">
          <ThemedText type="link">FlexBox</ThemedText>
        </Link>
        <Link href="/lessons/ControlledTextInput">
          <ThemedText type="link">ControlledTextInput</ThemedText>
        </Link>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
