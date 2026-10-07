import { ThemedText } from "@/components/themed-text";
import { styles } from "@/styles/styles";
import { Pressable, StyleSheet, Text, View } from "react-native";
/**
React Native uses Flexbox, but unlike the web, a container’s default flexDirection is column, not row.
Its children therefore normally appear from top to bottom. React Native Flexbox documentation

The direction changes what the alignment properties control:
- justifyContent works along the main axis.
- alignItems works across the main axis.

With flexDirection: "row":
- Main axis = horizontal.
- justifyContent controls left/right positioning.
- alignItems controls up/down positioning.

Here’s an album row building on our FlatList and Pressable lessons:
 */
const FlexBoxLesson = () => {
  return (
    <View style={styles.copyContainer}>
      <ThemedText type="title">FlexBoxLesson</ThemedText>
      <Pressable style={fileStyles.albumRow}>
        <Text style={fileStyles.title}>Purple Rain</Text>
        <Text style={fileStyles.year}>1984</Text>
        <Text style={fileStyles.badge}>Selected</Text>
      </Pressable>
    </View>
  );
};
const fileStyles = StyleSheet.create({
  albumRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#eeeeee",
    gap: 10,
  },
  badge: {
    backgroundColor: "#a8d8ff",
    padding: 6,
  },
  title: {
    flex: 1,
    fontSize: 18,
  },
  year: { fontSize: 18 },
});
export default FlexBoxLesson;
