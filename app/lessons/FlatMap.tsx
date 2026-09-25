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
];
const FlatMapComp = () => {
  return (
    <View style={styles.container}>
      <ThemedText type="title">
        React Native lesson: FlatList vs .map
      </ThemedText>
      <FlatList
        data={albums}
        keyExtractor={(album) => album.id}
        renderItem={({ item }) => {
          return (
            <View style={{ padding: 10 }}>
              <Text style={styles.copy}>{item.title}</Text>
            </View>
          );
        }}
      />
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
          scrollable lists. It renders only the items currently visible—or close
          to becoming visible. This is called virtualisation.
        </Text>
      </View>
    </View>
  );
};

export default FlatMapComp;
