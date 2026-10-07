import { ThemedText } from "@/components/themed-text";
import { styles } from "@/styles/styles";
import React from "react";
import { FlatList, Text, View } from "react-native";
/**
 React Native lesson: FlatList vs .map()

In React on the web, you might display items like this:

{albums.map((album) => (
  <AlbumCard key={album.id} album={album} />
))}

React Native allows the same pattern inside a ScrollView, but that creates every item immediately. With a large list, this can consume memory and make scrolling sluggish.

FlatList is designed for long, scrollable lists. It renders only the items currently visible—or close to becoming visible. This is called virtualisation.
 */

const albums = [
  { id: "1", title: "Thriller" },
  { id: "2", title: "Purple Rain" },
  { id: "3", title: "Back to Black" },
  { id: "4", title: "Thriller2" },
  { id: "5", title: "Purple Rain2" },
  { id: "6", title: "Back to Black2" },
  { id: "7", title: "Thriller" },
  { id: "8", title: "Purple Rain" },
  { id: "9", title: "Back to Black" },
  { id: "10", title: "Thriller2" },
  { id: "11", title: "Purple Rain2" },
  { id: "12", title: "Back to Black2" },
];
const FlatListLesson = () => {
  return (
    <FlatList
      data={albums}
      contentContainerStyle={styles.listContent}
      keyExtractor={(album) => album.id}
      ListHeaderComponent={
        <ThemedText type="title">
          React Native lesson: FlatList vs .map
        </ThemedText>
      }
      renderItem={({ item }) => {
        return (
          <View style={{ padding: 10 }}>
            <Text style={styles.copy}>{item.title}</Text>
          </View>
        );
      }}
      ListFooterComponent={
        <View style={styles.copyContainer}>
          <Text style={styles.copy}>
            In React on the web, you might display items like this:
          </Text>
          <View style={styles.codeBlock}>
            <Text style={styles.code}>
              {`{albums.map((album) => ( <AlbumCard key={album.id} album={album} /> ))}`}
            </Text>
          </View>
          <Text style={styles.copy}>
            React Native allows the same pattern inside a ScrollView, but that
            creates every item immediately. With a large list, this can consume
            memory and make scrolling sluggish. FlatList is designed for long,
            scrollable lists. It renders only the items currently visible—or
            close to becoming visible. This is called virtualisation.
          </Text>
        </View>
      }
    />
  );
};

export default FlatListLesson;
