import { ThemedText } from "@/components/themed-text";
import { styles } from "@/styles/styles";
import { useState } from "react";
import { FlatList, Pressable, View } from "react-native";

const topics = [
  { id: "react", title: "React" },
  { id: "native", title: "React Native" },
  { id: "next", title: "Next.js" },
];

export default function PressableLesson() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return (
    <FlatList
      data={topics}
      ListHeaderComponent={
        <View style={styles.copyContainer}>
          <ThemedText type="title">
            React Native lesson: Pressable and onPress
          </ThemedText>
        </View>
      }
      keyExtractor={(topics) => topics.id}
      renderItem={({ item }) => {
        // Remember this is a loop
        const isSelected = item.id === selectedId; // Item isSelected is set when item.id is equal to selectedId
        return (
          <Pressable
            style={({ pressed }) => [
              styles.row,
              isSelected && styles.selected,
              pressed && styles.pressed,
            ]}
            onPress={() =>
              // If selected do nothing, else set selectedId to item.id
              setSelectedId(item.id === selectedId ? null : item.id)
            }
          >
            <ThemedText
              style={[
                styles.copy,
                styles.defaultColour,
                { fontWeight: "bold" },
              ]}
            >
              {item.title}
            </ThemedText>
          </Pressable>
        );
      }}
    ></FlatList>
  );
}
